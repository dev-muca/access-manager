import pool from "./config";

const Profile = {
  getProfileInfoByUserId: async (id) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT
                        username,
                        fullname,
                        email,
                        departament,
                        name AS role,
                        avatar,
                        status
                     FROM users
                        LEFT JOIN profile ON profile.id_user = users.id
                        LEFT JOIN roles ON roles.id = profile.id_role
                     WHERE users.id = ?`;

      const [result] = await conn.query(query, [id]);
      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getProfileInfoByUsername: async (username) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT
                        username,
                        fullname,
                        email,
                        departament,
                        name AS role,
                        avatar,
                        status
                     FROM users
                        LEFT JOIN profile ON profile.id_user = users.id
                        LEFT JOIN roles ON roles.id = profile.id_role
                     WHERE username = ?`;

      const [result] = await conn.query(query, [username]);
      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getProfilesByDepartament: async (departament) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT users.id, email, fullname, status
                     FROM users
                        LEFT JOIN profile ON profile.id_user = users.id
                        LEFT JOIN roles ON roles.id = profile.id_role
                     WHERE
                        departament = ?`;

      const [result] = await conn.query(query, [departament]);
      conn.release();

      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  updateProfileInfoByUserId: async (id, info) => {
    try {
      const conn = await pool.getConnection();
      const query = `UPDATE profile SET id_role = ?, avatar = ? WHERE user_id = ?`;
      const [result] = await conn.query(query, [info.role, info.avatar, id]);
      conn.release();

      return result.affectedRows;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export default Profile;
