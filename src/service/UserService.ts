import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { AuthService } from './AuthService';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async checkIfUserExists(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user !== null;
    }

    async createUser(email: string, password: string): Promise<void> {
        await AppDataSource.transaction(async (transactionalEntityManager) => {
            const user = new User(email);
            await transactionalEntityManager.save(user);

            await this.authService.register(email, password);
        })
    }
}