import Koa from 'koa';
import { AppDataSource } from './data-source';
import { createKoaServer } from 'routing-controllers';
import { AuthController } from './controller/AuthController';
import { CognitoAuthMiddleware } from './middleware/CognitoAuthMiddleware';
import { UserController } from './controller/UserController';

const app = createKoaServer({
    controllers: [AuthController,UserController],
    middlewares: [CognitoAuthMiddleware]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");

        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch((error) => console.log("Fail connecting to database!", error));