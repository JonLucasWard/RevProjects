import User from '../models/users';
import db from '../util/pg-connector';

// similiar filter operation to matchUserAndPassword but with userId
export async function getUserId(id: number): Promise<User> {
    const result = await db.query(`SELECT id, username, password, firstname, lastname, email
    FROM users WHERE id = $1`, [id]);
    return new User(result.rows[0]);
}

export function getAllUsers() {
    return 'I should be a full array';
}

export async function updateUser(patch: User) {
        if (!patch.userID) {
            // throw an error
        }
        const currentState = await getUserId(patch.userID);
        const newState = {
            ...currentState, ...patch,
        };

        const result = await db.query(`UPDATE users SET username = $1, password = $2,
            firstname = $3, lastname = $4, email = $5, role = $6 WHERE id = $7`,
            [newState.userName, newState.passWord, newState.firstName, newState.lastName, 
                newState.email, newState.role, newState.userID]);
        if (result.rowCount === 0) {
            // throw error, 404
        } else {
            return result.rows[0];
        }
}
