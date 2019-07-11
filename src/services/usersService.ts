import User from '../models/users'
const userMap: Map<Number, User> = new Map();

// similiar filter operation to matchUserAndPassword but with userId
export function getUserId(id: number){
    if(id != 0){
        return userMap.get(id);
    }
    else {
        return 'You are getting a userId!';
    }

}

export function getAllUsers() {
    return 'I should be a full array';
}

export function updateUser() {
    return 'I should change the user data in the database!';
}

