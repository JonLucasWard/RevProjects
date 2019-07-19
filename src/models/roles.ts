/**
 * Excess code, not actually used.
 */
export default class Role {
    public roleId: number;
    public role: string;
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.roleId = obj.roleId;
        this.role = obj.role;
    }
}
