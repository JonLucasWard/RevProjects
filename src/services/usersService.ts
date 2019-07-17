/**
 * This file contains all the methods needed when a user wants to interact with user data.
 * Most functions here will call and return user information.
 */
import User from '../models/users'; // We want to have data conform to the user object model
import {Logger} from '../routers/loginRouter'; /* Allow access to the Logger global
variable. More information in the loginRouter */
import db from '../util/pg-connector'; // To allow access to the database at all

/**
 * The following function is meant to allow the user of the app to login. This is done by
 * checking their inputted information against the database, if it comes up positive, then the
 * Logger global variable is updated with the users information and the function returns true.
 * Otherwise, the login is ignored and the function returns false.
 * @param usrnam The username passed in from a user's JSON
 * @param passy The password given by a user's JSON
 */
export async function userLogin(usrnam, passy) {
    const queryString = `select * from users where username = $1 and password = $2`; /* Select all from users
    where a passed in username and password are BOTH true of the same row */
    let answer = false; // Probably excess code now, to be safe the function assumes a failure to start
    const result = await db.query(queryString, [usrnam, passy]); // send a query and its inputs to SQL
    /**
     * The following checks for a failed login, if there was a failure, nothing is returned to the result object
     * HOWEVER! result is, an object, result itself is defined but its stored variables may not be
     * result will take in the same data STRUCTURE that the database gives it, which is why we call rows.
     * @result - is a new object/array that receives all the information from the database's query
     * .rows[] - this is the datastructure given by PostGresSQL, each row has information that defines each
     * row of data. But the FIRST row (.rows[0]) has the data we're actually interested in. The values 
     * actually ON the table. Everything else is dressing.
     */
    if (result.rows[0] === undefined) {
        answer = false;
    } else {
    answer = true;
    Logger.UserID = result.rows[0].id; // result object -> row array [0] (first one) 
    // -> .id is a property on that array object
    Logger.Role = result.rows[0].role; // and again for the role
    }
    return answer; // ends the function
}

/**
 * The following function should return a User object matching the ID of the desired user.
 * @param userID passed in from the app user's Json, should equal a user's ID in the database
 */
export async function getUserId(userID): Promise<User> {
    const queryString = `select * from users where id = $1`;
    const result = await db.query(queryString, [userID]);
    const userData = result.rows[0]; // userData now contains only the relevant information we want, however
    // it still isn't matched properly
    const matchedUser = new User(); // We will pass userData into this
    /**
     * this for loop will go over each key of the matchedUser object
     * Then it grabs the value matching each key of the User object, to an equivalent index value from userData
     */
    for (let key of Object.keys(matchedUser)) { // Object.keys(objectName) treats the passed object's keys as an array
        matchedUser[key] = userData[key.toLowerCase()]; // toLowerCase just in case there are differences in field names
    }
    return matchedUser; // return the completed User object to be read
}

/**
 * The following function simply returns a list of all users from the database
 * @async asynchronous function, whenever you see this, it is the code sending a function to an outside
 * source (usually the database) and the code continues to run, then waits for a response by this function
 * sometimes when you call to an outside source, there can be a significant time delay. We want our code
 * to know this may be the case.
 * @await the code will not continue until the function after await comes back with a response
 */
export async function getAllUsers() {
    const queryString = `select * from users`; // SQL code to be sent to the database
    const usersResults = await db.query(queryString); // send the code.
    const usersData = usersResults.rows; // making a copy of the desired structure from the database
    // the DB will give more information than we actually need, what we want is in .rows
    const users = []; // an empty array, it'll be cleaner than trying to actually prune the results
    for (let user of usersData) { // user is just an iterator, ideally every block of data belongs to a user
        users.push(new User()); // If there is a user block in the database, make one in our copy
        let currentUser = users[users.length - 1]; // Set a counter equal to the number of fields in the object
        for (let key of Object.keys(currentUser)) {currentUser[key] = user[key.toLowerCase()]; }
        // the above for loop will fill in the values of each field to the related user
    } // the code now repeats until there are no more users left

    return users;
}

/**
 * The following function is meant to pass in user-like data into the database, so that it can update
 * a user's information to reflect the new data, but not change ANYTHING else.
 * @param patch is passed in information, meant to have the data structure of a User
 */
export async function updateUser(patch: User) {
    const currentState = await getUserId(patch.iD); // The passed in data will have the ID of the desired user
    // it also calls the previously defined getUserId function, which returns a full user.
    /** 
     * The next object will create a new object with BOTH the original user, and our updates.
     * @currentState - old user information
     * @patch - new user information, will override old versions of the information.
     */
    const newState = {
        ...currentState, ...patch,
    };

    const result = await db.query(`UPDATE users SET username = $1, password = $2, firstname = $3, lastname = $4,
     email = $5 WHERE id = $6 RETURNING username, firstname, lastname, email;`,
            [newState.userName, newState.passWord, newState.firstName, newState.lastName, newState.email, patch.iD]);
    // The above, MASSIVE query, basically tries to update everything that is reasonable to update using 
    // the newState object
    return result.rows[0];
}
