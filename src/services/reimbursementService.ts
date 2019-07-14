import Reimbursement from '../models/reimbursements';
import db from '../util/pg-connector';

export async function addReimbursement(body) {
    return db.query(`INSERT INTO reimbursements (author, amount, datesubmitted, description, status, type)
    VALUES ($1, $2, NOW(), $3, 1, $4) RETURNING *`,
        [body.author, body.amount, body.description, body.type])
        .then((data) => {
            return data.rows;
        });
}

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

export async function editReimbursement(patch: Reimbursement) {
    const currentState = await getReimbursementId(patch.id);
    const newState = {
        ...currentState, ...patch,
    };

    const result = await db.query(`UPDATE reimbursements SET dateresolved = NOW(), description = $1, resolver = $2,
    status = $3 WHERE id = $4 RETURNING id, author, amount, datesubmitted, dateresolved, description,
    resolver, status, type;`,
            [newState.description, newState.resolver, newState.status, patch.id]);

    return result.rows[0];
}

export async function getReimbursementByUserId(author) {
    const queryString = `select * from reimbursements where author = $1 order by datesubmitted`;
    const result = await db.query(queryString, [parseInt(author, 10)]);
    const reimbursements = [];
    for (let value of result.rows) { reimbursements.push(value); }
    return reimbursements;
}

export async function getReimbursementByStatus(status) {
    const queryString = `select * from reimbursements where status = $1 order by datesubmitted`;
    const result = await db.query(queryString, [parseInt(status, 10)]);
    const reimbursements = [];
    for (let value of result.rows) { reimbursements.push(value); }
    return reimbursements;
}
