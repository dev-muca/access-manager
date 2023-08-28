import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import pool from "../model/pool";
import { IRequest } from "@/interfaces/request";

const RequestController = {
  createRequest: async ({ idAccess, idRequester, justification, approverOwner, requestDate }: IRequest) => {
    try {
      const conn = await pool.getConnection();
      const query = `INSERT INTO request (id_access, id_requester, justification, approver_owner, request_date) VALUES (?, ?, ?, ?, ?)`;
      const [result] = await conn.query<ResultSetHeader>(query, [
        idAccess,
        idRequester,
        justification,
        approverOwner,
        requestDate,
      ]);
      conn.release();

      return result.insertId;
    } catch (err: any) {
      return err.message;
    }
  },
};

export default RequestController;
