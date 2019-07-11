import express, {Request, Response} from 'express';
import * as reimbursementService from '../services/reimbursementService'; //call service file
import * as reimStatusService from '../services/reimStatusService';
import * as reimTypeService from '../services/reimTypeService';
import Reimbursement from '../models/reimbursements'; 
import reimbursementStatus from '../models/reimbursementStatus';
import reimbursementType from '../models/reimbursementType';
//* will grab all exported functions and values from the desired file

const reimRouter = express.Router();

 reimRouter.post('', (request: Request, response: Response) => {
    const reimbursement = reimbursementService.createReimbursement(request.body);
    reimStatusService.createReimStatus(request.body);
    reimTypeService.createrType(request.body);
    if(reimbursement){
        response.status(201).json(reimbursement);
    }
    else {
        response.sendStatus(500);
    }
 });

 //UNSURE HOW TO CHANGE INFO IN TEMPORARY OBJECT
reimRouter.patch('/author/userId/:userId', (request: Request, response: Response) =>{
    console.log('Patching for user update');
    const id = parseInt(request.params.id);
    const reimbursement: Reimbursement = reimbursementService.getReimbursementById(id);
    if (reimbursement){
        response.json(reimbursement);
    }
    else{
        response.sendStatus(404);
    }
})
//STATUS FOLDER
 reimRouter.get('/status/:statusId', (request: Request, response: Response) =>{ //id will define that it should look for an id value to be passed in
    console.log('Handling request for reimbursement status ID');
    const id = parseInt(request.params.id); //can get ID of cat that user wants
    const ReimbursementStatus: reimbursementStatus = reimStatusService.getReimsById(id);
    if (ReimbursementStatus){
        response.json(ReimbursementStatus); //give user if it exists
    }
    else {
        response.sendStatus(404); //user doesn't exist
    }
 });

 reimRouter.get('', (request: Request, response: Response) =>{
     console.log('Handling request for getting all Users');
     response.json(reimbursementService.getAllReimbursements());
 });

export default reimRouter;