import jwt from 'jsonwebtoken';
import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';
import jwkToPem from 'jwk-to-pem';
import axios from 'axios';

@Middleware({ type: 'before' })
export class CognitoAuthMiddleware implements KoaMiddlewareInterface {
    private async getCognitoJWK(): Promise<any> {
        const region = process.env.COGNITO_REGION;
        const userPoolId = process.env.COGNITO_USER_POOL_ID;
    
        try {
            const jwks = await axios.get(`https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`);
            return jwks.data;
        } catch (error:any) {
            throw new Error("Failed to fetch JWKs from Cognito.");
        }
    }

    async use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        if (context.path === '/auth' || context.path === '/auth/confirm-user') {
            return next();
        }

        const token = context.headers['authorization']?.split(' ')[1];
        if (!token) {
            context.status = 401;
            context.body = { message: 'Authorization token missing' };
            return;
        }

        try {
            const jwks = await this.getCognitoJWK();
            const decodedHeader: any = jwt.decode(token, { complete: true })?.header;
            const jwk = jwks.keys.find((key: any) => key.kid === decodedHeader.kid);
            const pem = jwkToPem(jwk);

            const decoded = jwt.verify(token, pem);
            context.state.user = decoded;

            await next();
        } catch (error) {
            context.status = 401;
            context.body = { message: 'Invalid token' };
        }
    }
}
