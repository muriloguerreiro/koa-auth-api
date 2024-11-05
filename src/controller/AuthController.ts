import { Controller, Post, Body, BadRequestError, Res, UnauthorizedError } from 'routing-controllers';
import { AuthService } from '../service/AuthService';
import { Response } from 'koa';

@Controller('/auth')
export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    @Post('/register')
    async register(@Body() body: { email: string; password: string }) {
        const { email, password } = body;

        try {
            await this.authService.register(email, password);
            return { message: 'User registered successfully' };
        } catch (error:any) {
            throw new BadRequestError(error.message);
        }
    }

    @Post('/login')
    async login(@Body() body: { email: string; password: string }, @Res() response: Response) {
        const { email, password } = body;

        try {
            const token = await this.authService.login(email, password);
            return {token};
        } catch (error:any) {
            response.status = 401;
            return { error: error.message };
        }
    }

    @Post('/confirm-user')
    async confirm(@Body() body: { email: string; confirmationCode: string }) {
        const { email, confirmationCode } = body;

        try {
            await this.authService.confirmUser(email, confirmationCode);
            return { message: 'User confirmed successfully.' };
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }
}
