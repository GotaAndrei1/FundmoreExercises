const pool = require("../../config/database").default;
const { generateUsers } = require("../../utils/dataGenerator");

const seedUsers = async () => {
    const client = await pool.connect();
    const users = generateUsers(5000); // Seed with 5000 users

    const query = `
    INSERT INTO users (first_name, last_name, email)
    VALUES ${users
        .map((u) => `('${u.firstName}', '${u.lastName}', '${u.email}')`)
        .join(", ")};
  `;
    await client.query(query);

    console.log("Seeding completed");
    client.release();
};

seedUsers();
