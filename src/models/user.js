const db = require("../config/Database.js");

const getAllUsers = async () => {
  try {
    const query = {
      name: "fetch-users",
      text: "SELECT * FROM users.users",
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

const getOneUser = async (email) => {
  try {
    const query = {
      name: "fetch-one-user",
      text: "SELECT * FROM users.users WHERE email = $1",
      values: [email],
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error.message;
  }
};

const createUser = async (...data) => {
  try {
    const query = {
      name: "create-user",
      text: "INSERT INTO users.users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [...data],
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

const updateUser = async (email, { userFirst_name, userLast_name }) => {
  try {
    let q;
    let values;

    if (userFirst_name !== undefined && userLast_name !== undefined) {
      q = "UPDATE users.users SET first_name = $1, last_name = $2 WHERE email = $3 RETURNING *";
      values = [userFirst_name, userLast_name, email];
    } else if (userFirst_name !== undefined) {
      q = "UPDATE users.users SET first_name = $1 WHERE email = $2 RETURNING *";
      values = [userFirst_name, email];
    } else if (userLast_name !== undefined) {
      q = "UPDATE users.users SET last_name = $1 WHERE email = $2 RETURNING *";
      values = [userLast_name, email];
    }

    const { rows } = await db.query(q, values);
    return rows;
  } catch (error) {
    return error;
  }
};

const updateImg = async (userImg_profile, email) => {
  try {
    const query = {
      text: "UPDATE users.users SET profile_image = $1 WHERE email = $2 RETURNING *",
      values: [userImg_profile, email],
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (email) => {
  try {
    const query = {
      name: "delete-user",
      text: "DELETE FROM users.users WHERE email = $1",
      values: [email],
    };

    await db.query(query);
    return `Delete user ${email} berhasil`;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllUsers, getOneUser, createUser, updateUser, updateImg, deleteUser };
