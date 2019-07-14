export default class Reimbursement {
    public id;
    public author;
    public amount;
    public dateSubmitted;
    public dateResolved;
    public type;
    public description;
    public resolver;
    public status;
    constructor(reimId: number = null, author: number = null, amount: number = null,
                dateSubmitted: Date = null, dateResolved: Date = null, type: number = null,
                description: string = null, resolver: number = null, status: number = null) {
        this.id = reimId;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.type = type;
        this.description = description;
        this.resolver = resolver;
        this.status = status;
    }
}
