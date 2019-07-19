/**
 * This file establishes a connection between our client-user and the database
 */
import { Pool } from 'pg'; // import the "Pool" code from 'pg'

/**
 * A Pool is a collection of client connections to the database, holding a connection open for the user
 * so that they don't have to constantly re-enter information.
 * Anything not defined will be given a default value.
 */
const db = new Pool({
    database: 'postgres', // The database we want to access
    host: 'localhost', // The server hosting said databse
    password: 'password', // The password needed to access that database
    port: 5432, // The port that this connection should exist on (determined by database)
    user: 'postgres', // The user information we are logging into the database with
});

export default db; // export all information here for other files to use
