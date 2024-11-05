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
            const cognitoUserId = await this.authService.register(email, password);

            const user = new User(cognitoUserId, email);
            await transactionalEntityManager.save(user);
        })
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ id });
    }

    async getAllUsers(): Promise<User[]> {
        return await AppDataSource.getRepository(User).find();
    }
}