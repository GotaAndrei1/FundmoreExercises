import { bulkDeleteUsers } from '../services/userService';

bulkDeleteUsers()
  .then(() => console.log('Bulk delete completed'))
  .catch((error) => console.error('Bulk delete failed:', error));
