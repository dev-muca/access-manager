import { RowDataPacket } from "mysql2/promise";

import pool from "../model/pool";
import { IAccess } from "@/interfaces/access";
import { IApprover } from "@/interfaces/approver";

const AccessController = {
  GetInfo: async (id?: number) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT * FROM access`;
      const [result] = await conn.query<RowDataPacket[]>(query, [id]);
      conn.release();

      const access = id ? result.filter((access) => access.id == id) : result;
      return access;
    } catch (err: any) {
      return err.message;
    }
  },

  GetApprover: async (id: number) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT
                        A.id,
                        A.name,
                        A.description,
                        GROUP_CONCAT(
                            CONCAT(U.id, '-', u.fullname)
                            ORDER BY
                                U.id ASC SEPARATOR ';'
                        ) AS approver
                    FROM
                        approver AP
                        LEFT JOIN access A ON A.id = AP.id_access
                        LEFT JOIN user U ON U.id = AP.id_user
                    WHERE
                        A.id = ?`;
      const [result] = await conn.query<RowDataPacket[]>(query, [id]);

      if (!result.length) throw new Error(`${id} NOAPPROVER`);

      const row = result[0];

      const parseApprover = (approver: string): IApprover => {
        const [id, fullname] = approver.split("-");
        return { id, fullname };
      };

      const access: any = {
        access: {
          id: row.id,
          name: row.name,
          description: row.description,
        },
        approver: row.approver ? row.approver.split(";").map(parseApprover) : false,
      };

      return access;
    } catch (err: any) {
      return err.message;
    }
  },
};

export default AccessController;
