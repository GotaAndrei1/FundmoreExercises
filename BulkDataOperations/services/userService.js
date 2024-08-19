import pool from "../config/database";
import { generateUsers } from "../utils/dataGenerator";
import { info, error as _error } from "../utils/logger";

const bulkInsertUsers = async () => {
    const totalRows = 2000000;
    const batchSize = 10000;

    try {
        const client = await pool.connect();
        for (let i = 0; i < totalRows; i += batchSize) {
            const users = generateUsers(batchSize);
            const query = `
        INSERT INTO users (first_name, last_name, email)
        VALUES ${users
            .map((u) => `('${u.firstName}', '${u.lastName}', '${u.email}')`)
            .join(", ")};
      `;
            await client.query(query);
            info(`Inserted ${i + batchSize} rows`);
        }
        client.release();
    } catch (error) {
        _error("Error during bulk insert:", error);
        throw error;
    }
};

const bulkUpdateUsers = async () => {
    const totalRows = 2000000;
    const batchSize = 10000;

    try {
        const client = await pool.connect();
        for (let i = 0; i < totalRows; i += batchSize) {
            const query = `
        UPDATE users
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id >= ${i + 1} AND id <= ${i + batchSize};
      `;
            await client.query(query);
            info(`Updated rows from ${i + 1} to ${i + batchSize}`);
        }
        client.release();
    } catch (error) {
        _error("Error during bulk update:", error);
        throw error;
    }
};

const bulkDeleteUsers = async () => {
    const batchSize = 10000;

    try {
        const client = await pool.connect();
        while (true) {
            const query = `
        DELETE FROM users
        WHERE email LIKE '%@example.com%'
        LIMIT ${batchSize};
      `;
            const result = await client.query(query);
            info(`Deleted ${result.rowCount} rows`);
            if (result.rowCount < batchSize) break;
        }
        client.release();
    } catch (error) {
        _error("Error during bulk delete:", error);
        throw error;
    }
};

export default { bulkInsertUsers, bulkUpdateUsers, bulkDeleteUsers };
