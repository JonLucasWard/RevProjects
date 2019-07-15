import express, {Request, Response} from 'express';
import Reimbursement from '../models/reimbursements';
import {Logger} from '../routers/loginRouter';
import * as reimbursementService from '../services/reimbursementService'; // call service file

const reimRouter = express.Router();

reimRouter.get('/status/:statusId', async (request: Request, response: Response) => {
    if (!Logger.Username) {
        response.json('Please login to access this information!');
        return;
    } else if (Logger.Role !== 2) {
        response.json('You do not have authorization!');
        return;
    } else {
    const statusId = request.params && parseInt(request.params.statusId, 10);
    const refunds = await reimbursementService.getReimbursementByStatus(statusId);
    response.status(200).send(refunds);
    return;
    }
});

reimRouter.get('/author/userId/:userId', async (request: Request, response: Response) => {
    if (!Logger.Username) {
        response.json('Please login to access this information!');
        return;
    } else if (Logger.Role !== 2 && Logger.UserID !== parseInt(request.params.userId, 10)) {
        response.json('You do not have authorization!');
        return;
    } else {
    const userId = request.params && parseInt(request.params.userId, 10);
    const refunds = await reimbursementService.getReimbursementByUserId(userId);
    response.status(200).send(refunds);
    }
});

reimRouter.post('',
    async (request: Request, response: Response) => {
    if (!Logger.Username) {
        response.json('Please login to access this information!');
        return;
    }
    const newReim = await reimbursementService.addReimbursement(request.body);
    response.json(newReim);
});

reimRouter.patch('',
    async (request: Request, response: Response) => {
        if (!Logger.Username) {
            response.json('Please login to access this information!');
            return;
        } else if (Logger.Role !== 2) {
            response.json('You do not have authorization!');
            return;
        } else {
        const patch: Reimbursement = request.body;

        const patchedReimbursement: Reimbursement = await reimbursementService.editReimbursement(patch);

        response.json(patchedReimbursement);
    }
});

export default reimRouter;
