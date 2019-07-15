import express, {Request, Response} from 'express';

const loginRouter = express.Router();

loginRouter.get('/status/:statusId', async (request: Request, response: Response) => {
        let userName = request.body.UserName;
        let passWord = request.body.Password;
        // Below doesn't quite work as intended, still needs more jiggering
        document.cookie = `username = ${userName}, password = ${passWord}`;
});

export default loginRouter;
