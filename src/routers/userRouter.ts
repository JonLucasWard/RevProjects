/**
 * When a users comes in through the users path, they will have access to some functions
 * given certain HTTP commands.
 */
import express, { Request, Response } from 'express';
import User from '../models/users';
import { Logger, verifyToken } from '../routers/loginRouter';
import * as usersService from '../services/usersService';

const { sha256 } = require("crypto-hash");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

/**
 * allow a user to get another user's info. A user is allowed to get their own information
 */
usersRouter.get('/:userId', verifyToken, async (req: any, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(401).send('Please login to access this information!');
            return;
        } else {
            if (authData.user.role !== 2 && authData.user.iD !== parseInt(req.params.userId, 10)) {
                res.status(402).send('You are not authorized for this operation!');
            } else {
                try {
                    const id = parseInt(req.params.userId, 10);
                    const user: User = await usersService.getUserId(id);
                    res.json(user);
                    console.log(authData);
                    return;
                } catch (error) {
                    res.status(400).send('Bad inputs');
                    return;
                }
            }
        }
    });
});

/**
 * Change a user's information in the database and return it. Should only be possible to admins (role 1)
 */
usersRouter.patch('', verifyToken, async (req: any, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(401).send('Please login to access this information!');
            return;
        } else {
            if (authData.user.role !== 1) {
                res.status(402).send('You are not authorized for this operation!');
            } else {
                try {
                    if (req.body.passWord) {
                        req.body.passWord = await sha256(
                            req.body.passWord,
                        );
                    }
                    const patch: User = req.body;
                    const patchedInv: User = await usersService.updateUser(patch);
                    res.json(patchedInv);
                    return;
                } catch {
                    res.status(400).send('Bad inputs');
                }
            }
        }
    });
});

/**
 * Get a list of all users, should only be done by finance managers
 */

usersRouter.get('', verifyToken, async (req: any, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(401).send('Please login to access this information!');
            return;
        } else {
            if (authData.user.role !== 2) {
                res.status(402).send('You are not authorized for this operation!');
            } else {
                try {
                    const users = await usersService.getAllUsers();
                    res.send(users);
                } catch (error) {
                    res.status(400).send('Bad inputs');
                }
            }
        }
    });
});

export default usersRouter;
