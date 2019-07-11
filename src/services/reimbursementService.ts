import Reimbursement from "../models/reimbursements";

let reimbursementCounter: number = 1; //be careful of starting things with 0, some tools or databases

const reimbursementMap: Map<Number, Reimbursement> = new Map();

export function createReimbursement(reimbursement): Reimbursement{
    reimbursement.id = reimbursementCounter++;
    reimbursementMap.set(reimbursement.id, reimbursement);
    return reimbursement;
}

export function getAllReimbursements(){
    return reimbursementMap;
}

export function getReimbursementById(id: number){
    return reimbursementMap.get(id);
}