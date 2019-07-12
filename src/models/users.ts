export default class User {
    public userID: number;
    public userName: string;
    public passWord: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: string;
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.userID = obj.userId;
        this.userName = obj.userName;
        this.passWord = obj.passWord;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.role = obj.role;
    }
}
