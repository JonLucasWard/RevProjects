import express, { Request, Response } from 'express';
import User from '../models/users';
import {Logger} from '../routers/loginRouter';
import * as usersService from '../services/usersService';

const usersRouter = express.Router();

usersRouter.get('/:userId',
    async (request: Request, response: Response) => {
    if (!Logger.Username) {
        response.json('Please login to access this information!');
        return;
    } else if (Logger.Role !== 2 && Logger.UserID !== parseInt(request.params.userId, 10)) {
        response.status(401).json('You are not authorized for this operation!');
        return;
    } else {
    const id = parseInt(request.params.userId, 10);
    const user: User = await usersService.getUserId(id);

    response.json(user);
    }
});

usersRouter.patch('',
async (request: Request, response: Response) => {
    if (!Logger.Username) {
        response.json('Please login to access this information!');
        return;
    } else if (Logger.Role !== 1) {
        response.status(401).json('You are not authorized for this operation!');
        return;
    } else {
    const patch: User = request.body;

    // const patchedInv: Inventory = await inventoryService.patchInventory(patch);
    const patchedInv: User = await usersService.updateUser(patch);

    response.json(patchedInv);
    }
});

usersRouter.get('', async (request: Request, response: Response) => {
    if (!Logger.Username) {
        response.json('Please login to access this information!');
        return;
    } else if (Logger.Role !== 2) {
        response.status(401).json('You are not authorized for this operation!');
        return;
    } else {
    const users = await usersService.getAllUsers();
    response.send(users);
    }
});

export default usersRouter;
