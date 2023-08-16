import { RowDataPacket } from "mysql2/promise";

import pool from "../model/pool";

const AccessController = {
  GetAll: async () => {
    try {
      const conn = await pool.getConnection();
      const query = "SELECT * FROM access";
      const [result] = await conn.query<RowDataPacket[]>(query);
      conn.release();

      return result;
    } catch (err: any) {
      return err.message;
    }
  },
};

export default AccessController;
