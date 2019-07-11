import reimbursementType from "../models/reimbursementType";

let reimTypeCounter: number = 1; //be careful of starting things with 0, some tools or databases

const rTypeMap: Map<Number, reimbursementType> = new Map();

export function createrType(reimbursementType): reimbursementType{
    reimbursementType.id = reimTypeCounter++;
    rTypeMap.set(reimbursementType.id, reimbursementType);
    return reimbursementType;
}

export function getAllrTypes(){
    return rTypeMap;
}

export function getrTypeById(id: number){
    return rTypeMap.get(id);
}