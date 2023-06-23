import pool from "./config";

const Profile = {
  getProfileInfoByUserId: async (id) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT 
                        username, fullname, email, departament, name AS role, avatar
                     FROM users
                        INNER JOIN profile ON profile.user_id = users.id
                        INNER JOIN roles ON roles.id = profile.role_id
                     WHERE users.id = ?`;

      const [result] = await conn.query(query, [id]);
      conn.release();

      return result;
    } catch (error) {
      return null;
    }
  },

  getProfileInfoByUsername: async (username) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT 
                        users.id, username, fullname, email, departament, name AS role, avatar
                     FROM users
                        INNER JOIN profile ON profile.user_id = users.id
                        INNER JOIN roles ON roles.id = profile.role_id
                     WHERE username = ?`;

      const [result] = await conn.query(query, [username]);
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
      const query = `UPDATE profile SET role_id = ?, avatar = ? WHERE user_id = ?`;
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
