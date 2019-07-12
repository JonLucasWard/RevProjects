export default class ReimbursementType {
    public typeId: number;
    public type: string;
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.typeId = obj.typeId;
        this.type = obj.type;
    }
}