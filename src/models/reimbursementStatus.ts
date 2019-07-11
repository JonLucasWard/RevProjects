import { stat } from "fs";

export default class reimbursementStatus{
    statusId: number;
    status: string;
    constructor(statusId, status){
        this.statusId = statusId;
        this.status = status;
    }
}