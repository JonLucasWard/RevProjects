import express, { Request, Response } from 'express';
import User from '../models/users';
import * as usersService from '../services/usersService';

const usersRouter = express.Router();

usersRouter.get('/:userId',
    async (request: Request, response: Response) => {
    const id = parseInt(request.params.userId, 10);
    const user: User = await usersService.getUserId(id);

    response.json(user);
});

usersRouter.patch('',
async (request: Request, response: Response) => {
    const patch: User = request.body;

    // const patchedInv: Inventory = await inventoryService.patchInventory(patch);
    const patchedInv: User = await usersService.updateUser(patch);

    response.json(patchedInv);
});

usersRouter.get('', async (request: Request, response: Response) => {
    const users = await usersService.getAllUsers();
    response.send(users);
});

export default usersRouter;
