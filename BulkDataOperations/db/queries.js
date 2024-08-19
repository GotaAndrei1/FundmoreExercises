import pool from "../config/database";

const getUsers = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
};

export default { getUsers };
