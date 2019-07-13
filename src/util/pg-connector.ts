import { Pool } from 'pg';

const db = new Pool({
    database: 'Project0',
    host: process.env.PROJECT0_URL || 'localhost',
    password: process.env.PROJECT0_PASSWORD || 'P@ssw0rd',
    port: 5432,
    user: process.env.PROJECT0_USER || 'postgres',
});

export function closePool() {
    db.end();
}

export default db;
