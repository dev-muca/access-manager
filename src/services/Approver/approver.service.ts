import pool from "@/utils/pool";
import { readFileSync } from "fs";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const Approver = {
  async setApprover(id_access: number, id_approver: number) {
    try {
      const conn = await pool.getConnection();
      const query = readFileSync("./sql/set-approver.sql").toString();
      const [result] = await conn.query<ResultSetHeader>(query, [id_approver, id_access]);
      conn.release();

      if (!result.insertId) return null;

      return result.insertId;
    } catch (err: any) {
      console.error("ERROR | Request Service | Set Approver | more:", err.message);
      return null;
    }
  },
};

export default Approver;
