import Reimbursement from '../models/reimbursements';
import db from '../util/pg-connector';

export function createReimbursement(reimbursement: Reimbursement):
    Promise<Reimbursement[]> {
        if (!reimbursement.author) {
            console.warn('Author name required');
        }
        return db.query(`INSERT INTO reimbursements (author, amount, datesubmitted, dateresolved,
            description, resolver, status, type)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, author, amount, datesubmitted, dateresolved,
            description, resolver, status, type`,
            [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted,
                reimbursement.dateResolved, reimbursement.description, reimbursement.resolver, reimbursement.type])
            .then((data) => {
                return data.rows;
            }).catch((err) => {
                return [];
        });
}

export async function editReimbursement(patch: Reimbursement) {
        if (!patch.reimbursementId) {
            return 0; // error
        }
        const currentState = await getReimbursementById(patch.reimbursementId);
        const newState = {
            ...currentState, ...patch,
        };

        const result = await db.query(`UPDATE reimbursements SET dateresolved = current.Time,
        resolver = $1, status = $2 WHERE id = $3`,
            [newState.resolver, newState.status, newState.reimbursementId]);
        if (result.rowCount === 0) {
            // throw error, 404
        } else {
            return result.rows[0];
        }
}

export async function getReimbursementById(id: number): Promise<Reimbursement> {
    const result = await db.query(`SELECT id, author, amount, datesubmitted, dateresolved, description, status, type
        FROM reimbursements WHERE id = $1`, [id]);
    return new Reimbursement(result.rows[0]);
}
