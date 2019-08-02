/**
 * When a users comes in through the reimbursements path, they will have access to some functions
 * given certain HTTP commands.
 */
import express, { Request, Response } from 'express';
import Reimbursement from '../models/reimbursements';
import { verifyToken } from '../routers/loginRouter'; // We need Logger to verify the user
import * as reimbursementService from '../services/reimbursementService'; // call service file

const reimRouter = express.Router(); // This creates a new instance of express unique to this path
const jwt = require('jsonwebtoken');

/**
 * This function should give the user a list of reimbursements according to a given status.
 * Can only be done by finance managers (role 2)
 */
// verify Token is called in as a first function to call before the callback function, it will check the user's token
// and see if they're valid
reimRouter.get('/status/:statusId', verifyToken, async (req: any, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => { // authData is data from token
        if (err) { // err is in case an error is passed from verifyToken
            res.status(401).send('Please login to access this information!');
            return;
        } else {
            if (authData.user.role !== 2) { // user object is nested in AuthData
                res.status(402).send('You are not authorized for this operation!');
            } else {
                try {
                    const statusId = req.params && parseInt(req.params.statusId, 10);
                    // if request.params doesn't work, use parseInt, pass the value to the next method
                    const refunds = await reimbursementService.getReimbursementByStatus(statusId);
                    res.status(200).send(refunds);
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
 * As above, but by userId. And a user can access their own reimbursement history
 */
reimRouter.get('/author/userId/:userId', verifyToken, async (req: any, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(401).send('Please login to access this information!');
            return;
        } else {
            if (authData.user.role !== 2 && authData.user.iD !== parseInt(req.params.userId, 10)) {
                res.status(402).send('You are not authorized for this operation!');
            } else {
                try {
                    const userId = req.params && parseInt(req.params.userId, 10);
                    const refunds = await reimbursementService.getReimbursementByUserId(userId);
                    res.status(200).send(refunds);
                } catch {
                    res.status(400).send('Bad inputs');
                    return;
                }
            }
        }
    });
});

/**
 * Add a reimbursement
 */
reimRouter.post('', verifyToken, async (req: any, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(401).send('Please login to access this information!');
            return;
        } else {
            try {
                const newReim: Reimbursement = await reimbursementService.addReimbursement(req.body);
                res.status(202).json(newReim); // SO! use json when it's good, you can read the object easy
            } catch (error) {
                res.status(400).send('Bad inputs'); /* use .send when stuffs bad, it'll be a tooth pull to
             get it out using fetch, but it's nice to have separate*/
                return;
            }
        }
    });
});

/**
 * Update a reimbursement
 */
reimRouter.patch('', verifyToken, async (req: any, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.status(401).send('Please login to access this information!');
            return;
        } else {
            if (authData.user.role !== 2) {
                res.status(402).send('You are not authorized for this operation!');
            } else {
                try {
                    const patch: Reimbursement = req.body;

                    const patchedReimbursement: Reimbursement = await reimbursementService.editReimbursement(patch);

                    res.json(patchedReimbursement);
                } catch {
                    res.status(400).send('Bad inputs');
                    return;
                }
            }
        }
    });
});

export default reimRouter;
