import Role from "../models/roles";

let roleCounter: number = 1; //be careful of starting things with 0, some tools or databases

const roleMap: Map<Number, Role> = new Map();

export function createRole(role): Role{
    role.id = roleCounter++;
    roleMap.set(role.id, role);
    return role;
}

export function getAllRoles(){
    return roleMap;
}

export function getRoleById(id: number){
    return roleMap.get(id);
}