import pool from "./config";

const Role = {
  getAllRoles: async () => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT * FROM roles`;
      const [result] = await conn.query(query);
      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  createRole: async (name) => {
    try {
      const conn = await pool.getConnection();
      const query = `INSERT INTO roles (name) VALUES (?)`;
      const [result] = await conn.query(query, [name]);
      conn.release();

      return result.insertId;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export default Role;
