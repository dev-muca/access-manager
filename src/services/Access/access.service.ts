import pool from "@/utils/pool";
import { readFileSync } from "fs";
import { RowDataPacket } from "mysql2";

const AccessService = {
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
};

export default AccessService;
