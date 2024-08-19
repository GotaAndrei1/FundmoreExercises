import { bulkUpdateUsers } from "../services/userService";

bulkUpdateUsers()
    .then(() => console.log("Bulk update completed"))
    .catch((error) => console.error("Bulk update failed:", error));
