import { name, internet } from 'faker';

const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const firstName = name.firstName();
    const lastName = name.lastName();
    const email = internet.email(firstName, lastName);
    users.push({ firstName, lastName, email });
  }
  return users;
};

export default { generateUsers };
