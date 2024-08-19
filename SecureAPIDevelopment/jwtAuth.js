const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [];

const JWT_SECRET = "your_jwt_secret_key";

// Register Route
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).send("User Registered Successfully");
});

// Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
        expiresIn: "1h",
    });

    res.json({ token });
});
