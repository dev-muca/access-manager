import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import pool from "../model/pool";
import { Request } from "@/interfaces/request";
import * as Response from "@/interfaces/responses";

const RequestController = {
  createRequest: async ({
    idAccess,
    idRequester,
    justification,
    approverOwner,
    requestDate,
    approver,
  }: Request): Promise<Response.RequestNumberOrError> => {
    try {
      const conn = await pool.getConnection();
      const requestQuery = `INSERT INTO request (id_access, id_requester, justification, approver_owner, request_date) VALUES (?, ?, ?, ?, ?)`;
      const [result] = await conn.query<ResultSetHeader>(requestQuery, [
        idAccess,
        idRequester,
        justification,
        approverOwner,
        requestDate,
      ]);
      conn.release();

      const requestNumber = result.insertId;

      approver?.forEach(async (approver) => {
        const approvalQuery = `INSERT INTO approval (id_user) VALUES (?)`;
        const [result] = await conn.query<ResultSetHeader>(approvalQuery, [approver.id]);
        conn.release();

        const idApproval = result.insertId;

        const approvalRequestQuery = `INSERT INTO approval_request (id_request, id_approval) VALUES (?, ?)`;
        await conn.query(approvalRequestQuery, [requestNumber, idApproval]);
        conn.release();
      });

      return { requestNumber };
    } catch (err: any) {
      return { error: { code: 500, field: "message", message: err.message } };
    }
  },

  getRequests: async (id: number) => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT
                        R.id,
                        A.name,
                        R.approver_owner AS approverOwner,
                        R.justification,
                        U.username,
                        U.fullname,
                        DATE_FORMAT(R.request_date, '%Y-%m-%d %H:%i:%s') AS requestDate,
                        S.status
                     FROM request R
                        LEFT JOIN user U ON R.id_requester = U.id
                        LEFT JOIN access A ON R.id_access = A.id
                        LEFT JOIN status S ON R.id_status = S.id
                     WHERE U.id = ?`;
      const [result] = await conn.query<RowDataPacket[]>(query, [id]);
      conn.release();

      return result;
    } catch (err: any) {
      return err.message;
    }
  },
};

export default RequestController;
