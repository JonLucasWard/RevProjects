import User from '../models/users';
import db from '../util/pg-connector';

// similiar filter operation to matchUserAndPassword but with userId
export async function getUserId(userID): Promise<User> {
    const queryString = `select * from users where id = $1`;
    const result = await db.query(queryString, [userID]); // gives a LOT of information
    const userData = result.rows[0]; // The info we want is in the first "object" the above makes
    const matchedUser = new User();
    for (let key of Object.keys(matchedUser)) {
        matchedUser[key] = userData[key.toLowerCase()];
    }
    return matchedUser;
}

export async function getAllUsers() {
    const queryString = `select * from users`;
    const usersResults = await db.query(queryString);
    const usersData = usersResults.rows;
    const users = [];
    for (let user of usersData) {
        users.push(new User());
        let currentUser = users[users.length - 1];
        for (let key of Object.keys(currentUser)) {currentUser[key] = user[key.toLowerCase()]; }
    }

    return users;
}

export async function updateUser(patch: User) {
    const currentState = await getUserId(patch.iD);
    const newState = {
        ...currentState, ...patch,
    };

    const result = await db.query(`UPDATE users SET username = $1, password = $2, firstname = $3, lastname = $4,
     email = $5 WHERE id = $6 RETURNING username, password, firstname, lastname, email;`,
            [newState.userName, newState.passWord, newState.firstName, newState.lastName, newState.email, patch.iD]);

    return result.rows[0];
}
