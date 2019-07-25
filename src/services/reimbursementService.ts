/**
 * This file contains all the methods needed when a user wants to interact with reimbursement data.
 * Most functions here will call and return reimbursement information.
 */
import Reimbursement from '../models/reimbursements'; // To make copies of reimbursement data
import db from '../util/pg-connector'; // To access the database at all

/**
 * The following function is meant to allow any user (who has logged in) to create a new reimbursement
 * and add it to the database. Essential information must be put in, and some default information is
 * automatically assumed with the query.
 * @param body the body of the JSON request, I like this name, it should be used for my other functions
 */
export async function addReimbursement(body) {
    const result = await db.query(`INSERT INTO reimbursements (author, amount, datesubmitted, description, status, type)
    VALUES ($1, $2, NOW(), $3, 1, $4) RETURNING *`,
        [body.author, body.amount, body.description, body.type]);
    // Comments about the structure of query and response data is addressed in the usersService file, this
    // is just more of the same.
    const reimData = result.rows[0];
    const reimbursement = new Reimbursement();

    for (let key of Object.keys(reimbursement)) {
        reimbursement[key] = reimData[key.toLowerCase()];
    }
    return reimbursement;
}

/**
 * The following function gets a single reimbursement according to its ID number.
 * The code is repetitive of what was done in getUserId in userService, so go look at that
 * if something doesn't make sense here. It's just a matter of different names for variables.
 * @param reimID - calls for a reimbursement ID passed in by the user
 */
async function getReimbursementId(reimID): Promise<Reimbursement> {
    const queryString = `select * from reimbursements where id = $1`;
    const result = await db.query(queryString, [reimID]); // gives a LOT of information
    const reimData = result.rows[0]; // The info we want is in the first "object" the above makes
    const matchedReim = new Reimbursement();
    for (let key of Object.keys(matchedReim)) {
        matchedReim[key] = reimData[key.toLowerCase()];
    }
    return matchedReim;
}

/**
 * The following function will allow a user to edit data in the database and return the new data object.
 * It is functionally and structurally identical to what was done in userService with editUser. Go view
 * that function code if somethere here confuses you. It is the same structure and ideas, just with 
 * different names.
 * @param patch - Passed information from the user will be matched to the reimbursement data structure and used
 */
export async function editReimbursement(patch: Reimbursement) {
    console.log(patch);
    const currentState = await getReimbursementId(patch.id);
    const newState = {
        ...currentState, ...patch,
    };

    const result = await db.query(`UPDATE reimbursements SET dateresolved = NOW(), description = $1, resolver = $2,
    status = $3 WHERE id = $4 RETURNING *;`,
        [newState.description, newState.resolver, newState.status, patch.id]);

    return result.rows[0];
}

/**
 * The following function will call all reimbursements made by a given user/author.
 * Similar to the getAllusers from usersService, go to there if the syntax confuses you
 * @param author - userID number that the user wants to see
 */
export async function getReimbursementByUserId(author) {
    /* note teh "order by datesubmitted" in the SQL code, this ensures that the data given will
     always be earliest data first. */
    const queryString = `select * from reimbursements where author = $1 order by datesubmitted`;
    const result = await db.query(queryString, [parseInt(author, 10)]);
    const reimbursements = [];
    for (let value of result.rows) { reimbursements.push(value); }
    return reimbursements;
}

/**
 * As per the previous function, but it is organized by the status of each reimbursement
 * @param status - number value of a given status type, so it can pull all statuses of that type
 */
export async function getReimbursementByStatus(status) {
    const queryString = `select * from reimbursements where status = $1 order by datesubmitted`;
    const result = await db.query(queryString, [parseInt(status, 10)]);
    const reimbursements = [];
    for (let value of result.rows) { reimbursements.push(value); }
    return reimbursements;
}
