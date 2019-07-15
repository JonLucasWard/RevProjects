import express, {Request, Response} from 'express';
import User from '../models/users';
import * as usersService from '../services/usersService';

const loginRouter = express.Router();

export let Logger = {
    Password: '',
    Role: 0,
    UserID: 0,
    Username: '',
};

loginRouter.post('', async (request: Request, response: Response) => {
    const valid: boolean = await usersService.userLogin(request.body.UserName, request.body.Password);
    if (valid) {
        Logger.Username = request.body.UserName;
        Logger.Password = request.body.Password;
        const user: User = await usersService.getUserId(Logger.UserID);
        console.log(user);
        response.json(user);
    } else {
        response.status(400).json('Invalid Credentials');
    }
});

export default loginRouter;
