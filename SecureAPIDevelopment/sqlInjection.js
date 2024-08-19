const { Pool } = require('pg');
const pool = new Pool();

// Example of a parameterized query
const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};
