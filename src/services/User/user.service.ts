import pool from "@/utils/pool";
import { RowDataPacket } from "mysql2";

const UserService = {
  async getUser(username: string) {
    try {
      const conn = await pool.getConnection();
      const sql = "SELECT * FROM user WHERE username = ?";
      const [result] = await conn.query<RowDataPacket[]>(sql, [username]);
      conn.release();

      if (!result.length) return null;

      return result;
    } catch (err: any) {
      console.log("ERROR | User Service | Get User | more:", err.message);
      return null;
    }
  },
};

export default UserService;
