import { BadRequestError, Controller, Ctx, Get, UseBefore } from 'routing-controllers';
import { UserService } from '../service/UserService';
import { User } from '../entity/User';
import { CognitoAuthMiddleware } from '../middleware/CognitoAuthMiddleware';
import { Context } from 'koa';

@Controller()
export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    @Get('/me')
    @UseBefore(CognitoAuthMiddleware)
    async getProfile(@Ctx() context: Context): Promise<User> {
        const userId = context.state.user?.sub;
        if (!userId) {
            throw new BadRequestError('User ID not found in token');
        }
        const user = await this.userService.getUserById(userId);

        try {
            if (!user) {
                throw new BadRequestError(`User with id ${userId} not found`);
            }
            return user;
        } catch (error: any) {
            throw new BadRequestError(`Could not retrieve user: ${error.message}`);
        }
    }

    @Get('/users')
    @UseBefore(CognitoAuthMiddleware)
    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.userService.getAllUsers();
            return users;
        } catch (error: any) {
            throw new BadRequestError(`Could not retrieve users: ${error.message}`);
        }
    }
}
