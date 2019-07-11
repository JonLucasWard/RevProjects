import express, {Request, Response} from 'express';
import * as reimbursementService from '../services/reimbursementService'; //call service file
import Reimbursement from '../models/reimbursements'; 

const reimRouter = express.Router();

reimRouter.get('/status/:statusId', (request: Request, response: Response) =>{
    response.status(201).json('You are getting a reimbursement by status!' + reimbursementService.getReimbursementById(0));
});

reimRouter.get('/author/userId/:userId', (reimRouter: Request, response: Response) =>{
    response.status(201).json('You are getting a reimbursement by user!' + reimbursementService.getReimbursementById(0));
});

reimRouter.post('', (reimRouter: Request, response: Response) =>{
    response.status(201).json('You are making a reimbursement!' + reimbursementService.createReimbursement());
});

reimRouter.patch('', (reimRouter: Request, response: Response) =>{
    response.status(201).json('You are updating a reimbursement!' + reimbursementService.editReimbursement());
});

export default reimRouter;