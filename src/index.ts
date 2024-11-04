import Koa from 'koa';
import { AppDataSource } from './data-source';

const app = new Koa();

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");

        app.use(async (ctx) => {
            ctx.body = 'Hello, Koa!';
        });

        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch((error) => console.log("Fail connecting to database!", error));