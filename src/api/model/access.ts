import { RowDataPacket } from "mysql2";

import pool from "./pool";

class Access {
  // Obtem todos os dados de acessos disponiveis
  async getInfo(id?: number, orderBy: string = "name") {
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
                    ORDER BY A.${orderBy}`;
      const [result] = await conn.query<RowDataPacket[]>(query, [id]);
      conn.release();

      return { result };
    } catch (err: any) {
      return { error: err.message };
    }
  }
}

export default Access;
