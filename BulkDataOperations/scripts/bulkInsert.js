import { bulkInsertUsers } from "../services/userService";

bulkInsertUsers()
    .then(() => console.log("Bulk insert completed"))
    .catch((error) => console.error("Bulk insert failed:", error));
