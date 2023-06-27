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
      console.log(`PROFILE: Erro ao obter dados do perfil (ID ${id}): ${JSON.stringify(err.message)}`);
      return null;
    }
  },

  getProfileInfoByUsername: async (username) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT
                        users.id,
                        email,
                        username,
                        fullname,
                        departament,
                        roles.name AS role,
                        roles.id as id_role,
                        avatar,
                        status
                     FROM users
                        LEFT JOIN profile ON profile.id_user = users.id
                        LEFT JOIN roles ON roles.id = profile.id_role
                     WHERE 
                        username = ?`;

      const [result] = await conn.query(query, [username]);
      conn.release();

      return result;
    } catch (err) {
      console.log(`PROFILE: Erro ao obter dados do perfil de ${username}: ${JSON.stringify(err.message)}`);
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
      console.log(
        `PROFILE: Erro ao obter dados dos perfils vinculados ao departamento ${departament}: ${JSON.stringify(
          err.message
        )}`
      );
      return null;
    }
  },

  updateProfileInfoByUsername: async (data, username) => {
    try {
      const conn = await pool.getConnection();
      const query = `UPDATE profile SET id_role = ?, avatar = ? WHERE id_user = (SELECT id FROM users WHERE username = ?)`;
      const [result] = await conn.query(query, [data.role, data.avatar, username]);
      conn.release();

      return result.affectedRows;
    } catch (err) {
      console.log(`PROFILE: Erro ao atualizar os dados do perfil de ${username}: ${JSON.stringify(err.message)}`);
      return null;
    }
  },
};

export default Profile;
