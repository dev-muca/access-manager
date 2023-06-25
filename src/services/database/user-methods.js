import pool from "./config";

const User = {
  getUserByUsername: async (username) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT * FROM users WHERE username = ?`;
      const [result] = await conn.query(query, [username]);
      conn.release();

      const row = result[0];

      const data = {
        id: row.id,
        email: row.email,
        password: row.password,
        username: row.username,
        fullname: row.fullname,
        departament: row.departament,
      };

      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  createUser: async (user) => {
    try {
      const conn = await pool.getConnection();
      const query = `INSERT INTO users (email, username, fullname, password, departament) VALUES (?, ?, ?, ?, ?)`;
      const [result] = await conn.query(query, [
        user.email,
        user.username,
        user.fullname,
        user.password,
        user.departament,
      ]);
      conn.release();

      return result.insertId;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export default User;
