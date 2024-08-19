const { body, validationResult } = require("express-validator");

app.post(
    "/submit",
    [
        body("name").trim().escape(), // Sanitize input
        body("email").isEmail().normalizeEmail(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.send("Data submitted safely");
    }
);
