// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Protected Route Example
app.get("/dashboard", authenticateJWT, (req, res) => {
    res.json({ message: "Welcome to your dashboard", user: req.user });
});

app.listen(3000, () => console.log("Server running on port 3000"));
