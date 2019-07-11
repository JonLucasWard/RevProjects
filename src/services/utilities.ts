import User from 'models/users'
import db from '../models/db'
let users = db.users
let financeManagerUser = users[1];
let adminUser = users[0];

// check username: password combination against lookup table
let authenticateUser = function(req) {
    let usn: string = req.body.userName;
    let pass: string = req.body.passWord;
    console.log('authenticating user', req.body); // DEBUG
    // return true if usn and password match the pair values from DB
    let matchUserAndPassword = (user) => (usn===user.userName && pass===user.passWord)
    // filter array for elements that make function true - i.e. the user with matching usn/pass (only 0 or 1 match possible)
    let matchedUser: User = users.filter(matchUserAndPassword)[0]
    console.log('found users:', matchedUser) // DEBUG
    return matchedUser
}


// useful for checking credentials
// these two functions could be combined, but will decrease readability
let trueIfFinanceManger = function(userCookie): boolean {
    let fm = financeManagerUser; // quick alias for readability
    return (userCookie.userId == fm.userID && userCookie.password == fm.passWord) 
}
let trueIfAdmin = function(userCookie): boolean {
    return (userCookie.userId == adminUser.userID && userCookie.password == adminUser.passWord)
}

export default {authenticateUser, trueIfAdmin, trueIfFinanceManger}