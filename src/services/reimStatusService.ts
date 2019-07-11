import reimbursementStatus from "../models/reimbursementStatus";

let reimsCounter: number = 1; //be careful of starting things with 0, some tools or databases

const reimsMap: Map<Number, reimbursementStatus> = new Map();

export function createReimStatus(reims): reimbursementStatus{
    reims.id = reimsCounter++;
    reimsMap.set(reims.id, reims);
    return reims;
}

export function getAllReims(){
    return reimsMap;
}

export function getReimsById(id: number){
    return reimsMap.get(id);
}