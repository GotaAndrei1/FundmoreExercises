import express from "express";
import {
    bulkInsertUsers,
    bulkUpdateUsers,
    bulkDeleteUsers,
} from "./controllers/userController";

const app = express();

app.post("/bulk-insert", bulkInsertUsers);
app.post("/bulk-update", bulkUpdateUsers);
app.post("/bulk-delete", bulkDeleteUsers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
