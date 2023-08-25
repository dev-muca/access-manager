import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import pool from "../model/pool";
import { IRequest } from "@/interfaces/IRequest";

const RequestController = {
  createRequest: async ({
    id,
    idAccess,
    idRequester,
    justification,
    approverOwner,
    requestDate,
    approvalDate,
    idStatus,
  }: IRequest) => {
    try {
      const conn = await pool.getConnection();
      const query = `INSERT INTO access (id_access, id_requester, justification, approver_owner, request_date, id_status) VALUES (?, ?, ?, ?, ?, ?)`;
      const [result] = await conn.query<ResultSetHeader>(query, [
        idAccess,
        idRequester,
        justification,
        approverOwner,
        requestDate,
        idStatus,
      ]);
      conn.release();

      return result.insertId;
    } catch (err: any) {
      return err.message;
    }
  },
};

export default RequestController;
