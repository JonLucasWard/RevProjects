/**
 * When a users comes in through the users path, they will have access to some functions
 * given certain HTTP commands.
 */
import express, { Request, Response } from 'express';
import User from '../models/users';
import { Logger } from '../routers/loginRouter';
import * as usersService from '../services/usersService';

const {
    sha256
} = require("crypto-hash");
const usersRouter = express.Router();

/**
 * allow a user to get another user's info. A user is allowed to get their own information
 */
usersRouter.get('/:userId',
    async (request: Request, response: Response) => {
        if (!Logger.Username) {
            response.status(402).send('Please login to access this information!');
            return;
        } else if (Logger.Role !== 2 && Logger.UserID !== parseInt(request.params.userId, 10)) {
            response.status(401).send('You are not authorized for this operation!');
            return;
        } else {
            try {
                const id = parseInt(request.params.userId, 10);
                const user: User = await usersService.getUserId(id);
                response.json(user);
                return;
            } catch (error) {
                response.status(400).send('Bad inputs');
                return;
            }
        }
    });

/**
 * Change a user's information in the database and return it. Should only be possible to admins (role 1)
 */
usersRouter.patch('',
    async (request: Request, response: Response) => {
        if (!Logger.Username) {
            response.status(402).send('Please login to access this information!');
            return;
        } else if (Logger.Role !== 1) {
            response.status(401).send('You are not authorized for this operation!');
            return;
        } else {
            try {
                request.body.passWord = await sha256(
                    request.body.passWord,
                );
                const patch: User = request.body;
                const patchedInv: User = await usersService.updateUser(patch);
                response.json(patchedInv);
                return;
            } catch {
                response.status(400).send('Bad inputs');
            }
        }
    });

/**
 * Get a list of all users, should only be done by finance managers
 */
usersRouter.get('', async (request: Request, response: Response) => {
    if (!Logger.Username) {
        response.status(402).send('Please login to access this information!');
        return;
    } else if (Logger.Role !== 2) {
        response.status(401).send('You are not authorized for this operation!');
        return;
    } else {
        try {
            const users = await usersService.getAllUsers();
            response.send(users);
        } catch (error) {
            response.status(400).send('Bad inputs');
        }
    }
});

export default usersRouter;
