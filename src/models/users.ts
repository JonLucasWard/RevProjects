export default class User{
    userID: number;
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    constructor(userId, userName, passWord, firstName, lastName, email, role){
        this.userID = userId;
        this.userName = userName;
        this.passWord = passWord;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
       this.role = role;
    }
}