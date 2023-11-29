import pool from "@/utils/pool";
import { readFileSync } from "fs";
import { RowDataPacket } from "mysql2";

const UserService = {
  async getUser(username: string) {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./sql/get-user.sql").toString();
      const [result] = await conn.query<RowDataPacket[]>(sql, [username]);
      conn.release();

      if (!result.length) return null;

      return result;
    } catch (err: any) {
      console.log("ERROR | User Service | Get User | more:", err.message);
      return err.message;
    }
  },

  async getApprovals(userId: number, status: string = "Pendente") {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./sql/get-approvals.sql").toString();
      const [result] = await conn.query<RowDataPacket[]>(sql, [userId, status]);
      conn.release();

      return result;
    } catch (err: any) {
      console.log("ERROR | User Service | Get Approvals | more:", err.message);
      return null;
    }
  },
};

export default UserService;
