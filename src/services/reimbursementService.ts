import Reimbursement from "../models/reimbursements";

const reimbursementMap: Map<Number, Reimbursement> = new Map();

export function createReimbursement(){
    return 'I should be able to make new Reimbursements to the database!';
}

export function editReimbursement(){
    return 'You are editing a Reimbursement!';
}

export function getReimbursementById(id: number){
    if(id != 0){
        return reimbursementMap.get(id);
    }
    else{
        return 'Getting Reimbursement by Id!';
    }
}