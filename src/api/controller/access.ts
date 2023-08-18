import { RowDataPacket } from "mysql2/promise";

import pool from "../model/pool";
import { IAccess } from "@/interfaces/access";

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
      const query = `SELECT A.id,
                            A.name,
                            A.description,
                            U.id id_approver,
                            U.fullname approver
                      FROM approver AP
                            LEFT JOIN access A ON A.id = AP.id_access
                            LEFT JOIN user U ON U.id = AP.id_user
                      WHERE A.id = ?`;
      const [result] = await conn.query<RowDataPacket[]>(query, [id]);

      if (!result.length) throw new Error(`${id} NOAPPROVER`);

      // const row = result[0];

      // const access: IAccess = {
      //   id: row.id,
      //   name: row.name,
      //   description: row.description,
      //   approver: row.approver
      // };

      return result;
    } catch (err: any) {
      return err.message;
    }
  },
};

export default AccessController;
