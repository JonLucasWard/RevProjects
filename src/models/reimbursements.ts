export default class Reimbursement{
    reimbursementId: number;
    author: string;
    amount: number;
    dateSubmitted: Date;
    dateResolved: Date;
    type: string;
    description: string;
    resolver: string;
    status: string;
    constructor(reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type){
        this.reimbursementId = reimbursementId;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = this.dateResolved;
        this.type = type;
        this.description = description;
        this.resolver = resolver;
        this.status = status;
    }
}