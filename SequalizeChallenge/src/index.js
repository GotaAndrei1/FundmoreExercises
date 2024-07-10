import { User, sequelize } from "./User";
import Post, { create } from "./Post";

async function createUser(name, email) {
  try {
    const user = await User.create({ name, email });
    console.log("User created:", user.toJSON());
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function createPost(userId, title, content) {
  try {
    const post = await create({ userId, title, content });
    console.log("Post created:", post.toJSON());
    return post;
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

async function fetchUsersWithPosts() {
  try {
    const users = await User.findAll({
      include: {
        model: Post,
        as: "posts",
      },
    });
    console.log("Users with posts:", JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error fetching users with posts:", error);
  }
}

async function getAllUsers() {
  try {
    const users = await User.findAll();
    console.log("All users:", JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      console.log("User found:", user.toJSON());
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

async function updateUser(userId, updates) {
  try {
    const [updated] = await User.update(updates, {
      where: { id: userId },
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id: userId } });
      console.log("User updated:", updatedUser.toJSON());
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

async function deleteUser(userId) {
  try {
    const deleted = await User.destroy({
      where: { id: userId },
    });
    if (deleted) {
      console.log("User deleted");
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}


// CRUD operations on the User model.
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");

//     await sequelize.sync();
//     console.log("User model was synchronized successfully.");

//     // Create a new user
//     await createUser("Fred", "fred@example.com");

//     // Get all users
//     await getAllUsers();

//     // Get a user by ID
//     await getUserById(2);

//     // Update a user by ID
//     await updateUser(1, { name: "Jane Doe" });

//     // Delete a user by ID
//     await deleteUser(1);

//     // Get all users after deletion
//     await getAllUsers();
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();

// associations between models
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();
    console.log("Models were synchronized successfully.");

    // Create a new user
    const user = await createUser("uyiyiy", "ayuiuy@example.com");

    // Create posts for the user
    if (user) {
      await createPost(
        user.id,
        "First Post",
        "This is the content of the first post."
      );
      await createPost(
        user.id,
        "Second Post",
        "This is the content of the second post."
      );
    }

    // Fetch users with their posts
    await fetchUsersWithPosts();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
