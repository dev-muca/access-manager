import { ResultSetHeader } from "mysql2/promise";

import pool from "../model/pool";
import { IRequest } from "@/interfaces/request";

const RequestController = {
  createRequest: async ({ idAccess, idRequester, justification, approverOwner, requestDate, approver }: IRequest) => {
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

      const requestNumber = result.insertId;

      let approvalIds: Number[] = [];

      approver?.forEach(async (approver) => {
        const approvalQuery = `INSERT INTO approval (id_user) VALUES (?)`;
        const [result] = await conn.query<ResultSetHeader>(approvalQuery, [approver.id]);

        const idApproval = result.insertId;

        const approvalRequestQuery = `INSERT INTO approval_request (id_request, id_approval) VALUES (?, ?)`;
        await conn.query(approvalRequestQuery, [requestNumber, idApproval]);
      });

      conn.release();

      return requestNumber;
    } catch (err: any) {
      return err.message;
    }
  },
};

export default RequestController;
