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
    } catch (error) {
      return null;
    }
  },

  getUserWithProfileByUsername: async (username) => {},

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
      return null;
    }
  },
};

export default User;

// export const getUserById = async (id: number): Promise<User | null> => {
//   try {
//     const conn = await pool.getConnection();
//     const query = `SELECT * FROM users WHERE id = ?`;
//     const [result] = await conn.query<RowDataPacket[]>(query, [id]);
//     conn.release();

//     const row = result[0];
//     const user: User = {
//       id: row.id as number,
//       email: row.email as string,
//       password: row.password as string,
//       username: row.username as string,
//       fullname: row.fullname as string,
//       departament: row.departament as string,
//     };

//     return user;
//   } catch (error) {
//     console.log("Erro ao obter usuário (id), info:", error);
//     return null;
//   }
// };

// export const createUser = async (user: User): Promise<number | null> => {

// };

// export const updatePasswordById = async (id: number, password: string): Promise<number | null> => {
//   try {
//     const conn = await pool.getConnection();
//     const query = `UPDATE users SET password = ? WHERE id = ?`;
//     const [result] = await conn.query<ResultSetHeader>(query, [password, id]);
//     conn.release();

//     return result.affectedRows;
//   } catch (error) {
//     console.log("Erro ao atualizar a senha do usuário (id), info:", error);
//     return null;
//   }
// };

// export const updatePasswordByUsername = async (username: string, password: string): Promise<number | null> => {
//   try {
//     const conn = await pool.getConnection();
//     const query = `UPDATE users SET password = ? WHERE username = ?`;
//     const [result] = await conn.query<ResultSetHeader>(query, [password, username]);
//     conn.release();

//     return result.affectedRows;
//   } catch (error) {
//     console.log("Erro ao atualizar a senha do usuário (username), info:", error);
//     return null;
//   }
// };
