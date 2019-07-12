export default class ReimbursementStatus {
    public statusId: number;
    public status: string;
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.statusId = obj.statusId;
        this.status = obj.status;
    }
}
