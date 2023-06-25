import pool from "./config";

const Dept = {
  getAllDepartaments: async () => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT * FROM departament`;
      const [result] = await conn.query(query);
      conn.release();

      return result;
    } catch (err) {
      return null;
    }
  },

  getDepartamentByName: async (name) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT * FROM departament WHERE name = ?`;
      const [result] = await conn.query(query, [name]);
      conn.release();

      return result[0];
    } catch (err) {
      return null;
    }
  },

  createDepartament: async (name) => {
    try {
      const conn = await pool.getConnection();
      const query = `INSERT INTO departament (name) VALUES (?)`;
      const [result] = await conn.query(query, [name]);
      conn.release();

      return result.insertId;
    } catch (err) {
      return null;
    }
  },
};

export default Dept;
