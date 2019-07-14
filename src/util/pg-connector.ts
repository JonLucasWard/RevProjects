import { Pool } from 'pg';

const db = new Pool({
    database: 'postgres',
    host: 'localhost',
    password: 'password',
    port: 5432,
    user: 'postgres',
});

export default db;
