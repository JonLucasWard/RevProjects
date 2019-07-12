import express, {Request, Response} from 'express';
import Reimbursement from '../models/reimbursements';
import * as reimbursementService from '../services/reimbursementService'; // call service file

const reimRouter = express.Router();

reimRouter.get('/status/:statusId',
   async (request: Request, response: Response) => {
    const id = parseInt(request.params.id, 10);

    const ticket: Reimbursement = await reimbursementService.getReimbursementById(id);
    if (ticket.reimbursementId) {
        response.status(200).json(ticket);
    } else {
        response.sendStatus(404);
    }
});

reimRouter.get('/author/userId/:userId', (request: Request, response: Response) => {
    response.status(201).json('You are getting a reimbursement by user!');
});

reimRouter.post('',
    (request: Request, response: Response) => {
        const ticket = new Reimbursement(request.body);
        reimbursementService.createReimbursement(ticket)
            .then((rows) => {
                if (rows.length > 0) {
                    response.status(201).json(rows[0]);
                } else {
                    response.sendStatus(400);
                }
    });
});

reimRouter.patch('',
    async (request: Request, response: Response) => {
        const patch: Reimbursement = request.body;

        const patchedReimbursement: Reimbursement = await reimbursementService.editReimbursement(patch);

        if (patchedReimbursement.reimbursementId) {
            response.json(patchedReimbursement);
        } else {
            response.json(404);
        }

        response.sendStatus(200);
});

export default reimRouter;
