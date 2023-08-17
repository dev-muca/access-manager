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
};

export default AccessController;
