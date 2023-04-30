const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', //127.0.0.1
    database: 'todolist',
    password: 'pass',
    port: 5432
});

module.exports = pool;