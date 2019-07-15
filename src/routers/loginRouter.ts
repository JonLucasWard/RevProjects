import express, {Request, Response} from 'express';
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
        response.json(`Welcome ${Logger.Username}!
        your role is ${Logger.Role} and ID is ${Logger.UserID}`);
    } else {
        response.json(`Incorrect login!`);
    }
});

export default loginRouter;
