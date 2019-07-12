export default class Reimbursement{
    public reimbursementId: number;
    public author: string;
    public amount: number;
    public dateSubmitted: Date;
    public dateResolved: Date;
    public type: string;
    public description: string;
    public resolver: string;
    public status: string;
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.reimbursementId = obj.reimbursementId;
        this.author = obj.author;
        this.amount = obj.amount;
        this.dateSubmitted = obj.dateSubmitted;
        this.dateResolved = obj.dateResolved;
        this.type = obj.type;
        this.description = obj.description;
        this.resolver = obj.resolver;
        this.status = obj.status;
    }
}
