import { Controller, Post, Body, BadRequestError, Res, UnauthorizedError } from 'routing-controllers';
import { AuthService } from '../service/AuthService';
import { Response } from 'koa';
import { UserService } from '../service/UserService';

@Controller()
export class AuthController {
    private authService: AuthService;
    private userService: UserService;

    constructor() {
        this.authService = new AuthService();
        this.userService = new UserService();
    }

    @Post('/auth')
    async signInOrRegister(@Body() body: { email: string; password: string }, @Res() response: Response) {
        const { email, password } = body;

        try {
            const userExists = await this.userService.checkIfUserExists(email);

            if (userExists) {
                const token = await this.authService.login(email, password);
                return { token };
            } else {
                await this.userService.createUser(email, password);
                return { message: 'User created successfully' };
            }
        } catch (error: any) {
            if (error instanceof UnauthorizedError) {
                response.status = 401;
                return { error: error.message };
            } else {
                throw new BadRequestError(error.message);
            }
        }
    }

    @Post('/auth/confirm-user')
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
