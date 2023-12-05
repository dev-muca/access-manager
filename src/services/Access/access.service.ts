import pool from "@/utils/pool";
import { readFileSync } from "fs";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const AccessService = {
  async createAccess(name: string, description: string = "") {
    try {
      const conn = await pool.getConnection();
      const query = readFileSync("./sql/create-access.sql").toString();
      const [result] = await conn.query<ResultSetHeader>(query, [name, description]);
      conn.release();

      if (!result.insertId) return null;

      return result.insertId;
    } catch (err: any) {
      console.log("ERROR | Access Service | Create Access | more:", err.message);
      return null;
    }
  },

  async getAccess(id: number, order: string = "name") {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT A.id,
                            A.name,
                            A.description,
                            GROUP_CONCAT(CONCAT(U.id, '-', u.fullname) ORDER BY U.id ASC SEPARATOR ';') AS approver
                      FROM access A
                        INNER JOIN approver AP ON AP.id_access = A.id
                        INNER JOIN user U ON U.id = AP.id_user
                      ${id ? "WHERE A.id = ?" : ""} 
                      GROUP BY A.name
                      ORDER BY A.${order}`;
      const [result] = await conn.query<RowDataPacket[]>(query, [id]);
      conn.release();

      if (!result.length) return null;

      return result;
    } catch (err: any) {
      console.log("ERROR | Access Service | Get Access | more:", err.message);
      return null;
    }
  },

  async getAccesses() {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./sql/get-accesses.sql").toString();
      const [result] = await conn.query<RowDataPacket[]>(sql);
      conn.release();

      if (!result.length) return null;

      return result;
    } catch (err: any) {
      console.log("ERROR | Access Service | Get Access | more:", err.message);
      return null;
    }
  },
};

export default AccessService;
