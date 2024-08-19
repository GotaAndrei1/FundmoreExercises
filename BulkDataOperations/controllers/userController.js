import { bulkInsertUsers as _bulkInsertUsers, bulkUpdateUsers as _bulkUpdateUsers, bulkDeleteUsers as _bulkDeleteUsers } from "../services/userService";
import { error as _error } from "../utils/logger";

const bulkInsertUsers = async (_req, res) => {
    try {
        await _bulkInsertUsers();
        res.status(200).send("Bulk insert completed successfully");
    } catch (error) {
        _error("Error in bulkInsertUsers:", error);
        res.status(500).send("Bulk insert failed");
    }
};

const bulkUpdateUsers = async (_req, res) => {
    try {
        await _bulkUpdateUsers();
        res.status(200).send("Bulk update completed successfully");
    } catch (error) {
        _error("Error in bulkUpdateUsers:", error);
        res.status(500).send("Bulk update failed");
    }
};

const bulkDeleteUsers = async (_req, res) => {
    try {
        await _bulkDeleteUsers();
        res.status(200).send("Bulk delete completed successfully");
    } catch (error) {
        _error("Error in bulkDeleteUsers:", error);
        res.status(500).send("Bulk delete failed");
    }
};

export default { bulkInsertUsers, bulkUpdateUsers, bulkDeleteUsers };
