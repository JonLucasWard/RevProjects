export default class User {
    public iD;
    public userName;
    public passWord;
    public firstName;
    public lastName;
    public email;
    public role;
    constructor(userId: number = null, userName: string = null, passWord: string = null,
                firstName: string = null, lastName: string = null, email: string = null, role: number = null) {
        this.iD = userId;
        this.userName = userName;
        this.passWord = passWord;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
}
