/**
 * When a users comes in through the reimbursements path, they will have access to some functions
 * given certain HTTP commands.
 */
import express, { Request, Response } from 'express';
import Reimbursement from '../models/reimbursements';
import { Logger } from '../routers/loginRouter'; // We need Logger to verify the user
import * as reimbursementService from '../services/reimbursementService'; // call service file

const reimRouter = express.Router(); // This creates a new instance of express unique to this path

/**
 * This function should give the user a list of reimbursements according to a given status.
 * Can only be done by finance managers (role 2)
 */
reimRouter.get('/status/:statusId', async (request: Request, response: Response) => {
    if (!Logger.Username) { // check if Logger.Username is an empty string
        response.json('Please login to access this information!');
        return;
    } else if (Logger.Role !== 2) { // check if user is not a Finance Manager
        response.status(401).send('You are not authorized for this operation!');
        return;
    } else { // user is allow to use this function
        try {
            const statusId = request.params && parseInt(request.params.statusId, 10);
            // if request.params doesn't work, use parseInt, pass the value to the next method
            const refunds = await reimbursementService.getReimbursementByStatus(statusId);
            response.status(200).send(refunds);
            return;
        } catch (error) {
            response.status(400).send('Bad inputs');
            return;
        }
    }
});

/**
 * As above, but by userId. And a user can access their own reimbursement history
 */
reimRouter.get('/author/userId/:userId', async (request: Request, response: Response) => {
    if (!Logger.Username) {
        response.send('Please login to access this information!');
        return;
    } else if (Logger.Role !== 2 && Logger.UserID !== parseInt(request.params.userId, 10)) {
        response.status(401).send('You are not authorized for this operation!');
        return;
    } else {
        try {
            const userId = request.params && parseInt(request.params.userId, 10);
            const refunds = await reimbursementService.getReimbursementByUserId(userId);
            response.status(200).send(refunds);
        } catch {
            response.status(400).send('Bad inputs');
            return;
        }
    }
});

/**
 * Add a reimbursement
 */
reimRouter.post('',
    async (request: Request, response: Response) => {
        if (!Logger.Username) {
            response.send('Please login to access this information!');
            return;
        }
        try {
            const newReim: Reimbursement = await reimbursementService.addReimbursement(request.body);
            response.status(202).json(newReim); // SO! use json when it's good, you can read the object easy
        } catch (error) {
            response.status(400).send('Bad inputs'); /* use .send when stuffs bad, it'll be a tooth pull to
             get it out using fetch, but it's nice to have separate*/
            return;
        }
    });

/**
 * Update a reimbursement
 */
reimRouter.patch('',
    async (request: Request, response: Response) => {
        if (!Logger.Username) {
            response.send('Please login to access this information!');
            return;
        } else if (Logger.Role !== 2) {
            response.status(401).send('You are not authorized for this operation!');
            return;
        } else {
            try {
                const patch: Reimbursement = request.body;

                const patchedReimbursement: Reimbursement = await reimbursementService.editReimbursement(patch);

                response.json(patchedReimbursement);
            } catch {
                response.status(400).send('Bad inputs');
                return;
            }
        }
    });

export default reimRouter;
