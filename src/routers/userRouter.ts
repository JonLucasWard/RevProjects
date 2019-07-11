import express, { Request, Response } from 'express';
import * as usersService from '../services/usersService';


const usersRouter = express.Router();

usersRouter.get('/:userId', (request: Request, response: Response) => {
    response.status(201).json(usersService.getUserId(0));
});

usersRouter.patch('', (request: Request, response: Response) => {
    response.status(201).json(usersService.updateUser());
});

usersRouter.get('', (request: Request, response: Response) =>{
    response.status(201).json(usersService.getAllUsers());
});

export default usersRouter;