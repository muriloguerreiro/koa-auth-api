import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

export class AuthService {
    private userPool: CognitoUserPool;

    constructor() {
        this.userPool = new CognitoUserPool({
            UserPoolId: process.env.COGNITO_USER_POOL_ID!,
            ClientId: process.env.COGNITO_CLIENT_ID!,
        });
    }

    async register(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.userPool.signUp(email, password, [], [], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (result && result.userSub) {
                    const userSub = result.userSub;
                    resolve(userSub);
                } else {
                    reject(new Error('User Sub not found.'));
                }
            });
        });
    }

    async login(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const authenticationDetails = new AuthenticationDetails({
                Username: email,
                Password: password,
            });

            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: this.userPool,
            });

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    resolve(result.getAccessToken().getJwtToken());
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    }

    async confirmUser(email: string, confirmationCode: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const userData = {
                Username: email,
                Pool: this.userPool,
            };

            const cognitoUser = new CognitoUser(userData);
            cognitoUser.confirmRegistration(confirmationCode, true, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
