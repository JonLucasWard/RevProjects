import express, { Request, Response } from 'express';
import User from '../models/users';
import * as usersService from '../services/usersService';

const usersRouter = express.Router();

usersRouter.get('/:userId',
    async (request: Request, response: Response) => {
    const id = parseInt(request.params.id, 10);

    const user: User = await usersService.getUserId(id);

    if (user.userID) {
        response.status(200).json(user);
    } else {
        response.sendStatus(404);
    }
});

usersRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: User = request.body;

        const patchedUser: User = await usersService.updateUser(patch);

        if (patchedUser.userID) {
            response.json(patchedUser);
        } else {
            response.json(404);
        }

        response.sendStatus(200);
});

usersRouter.get('', (request: Request, response: Response) => {
    response.status(201).json(usersService.getAllUsers());
});

export default usersRouter;
