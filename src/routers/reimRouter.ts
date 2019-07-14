import express, {Request, Response} from 'express';
import Reimbursement from '../models/reimbursements';
import * as reimbursementService from '../services/reimbursementService'; // call service file

const reimRouter = express.Router();

reimRouter.get('/status/:statusId', async (request: Request, response: Response) => {
    const statusId = request.params && parseInt(request.params.statusId, 10);
    const refunds = await reimbursementService.getReimbursementByStatus(statusId);
    response.status(200).send(refunds);
});

reimRouter.get('/author/userId/:userId', async (request: Request, response: Response) => {
    const userId = request.params && parseInt(request.params.userId, 10);
    const refunds = await reimbursementService.getReimbursementByStatus(userId);
    response.status(200).send(refunds);
});

reimRouter.post('',
    async (request: Request, response: Response) => {
        const newReim = await reimbursementService.addReimbursement(request.body);
        response.json(newReim);
});

reimRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: Reimbursement = request.body;

        const patchedReimbursement: Reimbursement = await reimbursementService.editReimbursement(patch);

        response.json(patchedReimbursement);
});

export default reimRouter;
