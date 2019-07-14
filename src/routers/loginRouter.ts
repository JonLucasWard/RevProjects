import express, {Request, Response} from 'express';
import * as userService from '../services/usersService';

const loginRouter = express.Router();

loginRouter.post('', (request: Request, response: Response) => {
    response.status(201).json('You are logging in!' + userService.getUserId(0));
});

export default loginRouter;
