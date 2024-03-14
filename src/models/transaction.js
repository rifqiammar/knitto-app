const db = require("../config/Database.js");

const getUserBalance = async (email) => {
  try {
    const query = {
      name: "fetch-users-balance",
      text: `select * 
      from transactions.user_accounts
      JOIN users.users ON transactions.user_accounts.user_id = users.users.user_id WHERE email = $1
      `,
      values: [email],
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

const getUserOneTransaction = async (email) => {
  try {
    const query = {
      name: "fetch-OneTransaction-users-balance",
      text: `SELECT * FROM transactions.transaction
      JOIN users.users ON transactions.transaction.user_id = users.users.user_id WHERE users.users.email = $1;`,
      values: [email],
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

const createUserAccount = async (...data) => {
  try {
    const query = {
      name: "create-user_account",
      text: "INSERT INTO transactions.user_accounts (user_id, balance) VALUES ($1, $2)",
      values: [...data],
    };

    await db.query(query);
  } catch (error) {
    return error;
  }
};

const topUp = async (email, balance) => {
  try {
    const query = {
      name: "update-user_account",
      text: `UPDATE transactions.user_accounts AS ua
      SET balance = balance + $2  
      WHERE user_id = (
          SELECT user_id
          FROM users.users
          WHERE email = $1
      ) RETURNING *`,
      values: [email, balance],
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

const setTransaction = async (invoice, amount, email) => {
  try {
    const query = {
      name: "setTransaction",
      text: `INSERT INTO transactions.transaction (user_id, invoice_number, transaction_type, description,total_amount)
      SELECT users.user_id, $1, 'TOPUP', 'Top Up balance', $2
      FROM users.users
      WHERE users.email = $3`,
      values: [invoice, amount, email],
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

const paymentBalance = async (email, payment) => {
  try {
    const query = {
      name: "update-user_account",
      text: `UPDATE transactions.user_accounts AS ua
      SET balance = balance - $2  
      WHERE user_id = (
          SELECT user_id
          FROM users.users
          WHERE email = $1
      ) RETURNING *`,
      values: [email, payment],
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

const setTransactionPayment = async (invoice, amount, email) => {
  try {
    const query = {
      name: "setTransaction",
      text: `INSERT INTO transactions.transaction (user_id, invoice_number,service_code,service_name, transaction_type,total_amount)
      SELECT users.user_id, $1,$2, $3 ,'PAYMENT', $4
      FROM users.users
      WHERE users.email = $5`,
      values: [invoice, service_code, service_name, amount, email],
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

getHistory = async (email, limit, offset) => {
  try {
    const query = {
      name: `SELECT * FROM transactions.transaction
      JOIN users.users ON transactions.transaction.user_id = users.users.user_id
      OFFSET $1 ROWS
      LIMIT $2;`,
      values: [limit, offset],
    };

    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return error;
  }
};

module.exports = { getUserBalance, createUserAccount, topUp, setTransaction, setTransactionPayment, paymentBalance, getUserOneTransaction, getHistory };
