/**
 * A definition of the User class, so that our javascript can make copies of what it pulls from the database
 * each equivalent field is present here, and a constructor with some default values (needed for updates)
 */
/**
 * @export - Allows other files to use the data
 * @default - means that, if given NO other information, THIS code block will be exported
 */
export default class User {
    public iD; // Each field is just generally declared here, they are public so that all routers can access them
    public userName; // Note that each field has slightly different names than what exists in the database
    public passWord; // such differences are unnecessary (as in the case of email and role), but it's nice
    public firstName; // to be able to visually tell the difference
    public lastName;
    public email;
    public role;
    constructor(userId: number = null, userName: string = null, passWord: string = null,
                firstName: string = null, lastName: string = null, email: string = null, role: number = null) {
        this.iD = userId;
        this.userName = userName; // sets the iD parameter of the object instance to
        this.passWord = passWord; // equal the value passed to the constructor
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
}
