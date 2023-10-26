import IRequest from "@/@types/IRequest";
import IUser from "@/@types/IUser";
import pool from "@/utils/pool";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const RequestService = {
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

      if (approver && approver.length > 0) {
        const approvals = approver.map(async (approver: IUser) => {
          const approvalQuery = `INSERT INTO approval (id_user) VALUES (?)`;
          const [approvalResult] = await conn.query<ResultSetHeader>(approvalQuery, [approver.id]);
          const idApproval = approvalResult.insertId;

          const approvalRequestQuery = `INSERT INTO approval_request (id_request, id_approval) VALUES (?, ?)`;
          await conn.query(approvalRequestQuery, [requestNumber, idApproval]);
        });

        await Promise.all(approvals);
      }

      conn.release();
      return { requestNumber };
    } catch (err: any) {
      console.error("ERROR | Request Service | Create Request | more:", err.message);
      return null;
    }
  },

  getRequests: async (id: number, status: string = "pendente") => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT R.id,
                            A.name,
                            R.approver_owner AS approverOwner,
                            R.justification,
                            U.username,
                            U.fullname,
                            DATE_FORMAT(R.request_date, '%Y-%m-%d %H:%i:%s') AS requestDate,
                            S.status
                     FROM request R
                            LEFT JOIN user U
                                  ON R.id_requester = U.id
                            LEFT JOIN access A
                                  ON R.id_access = A.id
                            LEFT JOIN status S
                                  ON R.id_status = S.id
                     WHERE U.id = ?
                     AND R.id_status = (SELECT id FROM status WHERE status = ?)
                     ORDER BY requestDate DESC`;
      const [result] = await conn.query<RowDataPacket[]>(query, [id, status]);
      conn.release();

      return result;
    } catch (err: any) {
      console.log("ERROR | Request Service | Get Request | more:", err.message);
      return null;
    }
  },

  getApproval: async (id: number) => {
    try {
      const conn = await pool.getConnection();
      const sql = `SELECT AP.id,
                          U.fullname,
                          S.status,
                          AP.id approvalId,
                          DATE_FORMAT (AP.approval_date, '%Y-%m-%d %H:%i:%s') approvalDate,
                          AP.comment
                   FROM approval_request AR
                   INNER JOIN request R ON R.id = AR.id_request
                   INNER JOIN approval AP ON AP.id = AR.id_approval
                   INNER JOIN user U ON U.id = AP.id_user
                   INNER JOIN status S ON S.id = AP.id_status
                   WHERE R.id = ?`;
      const [result] = await conn.query(sql, [id]);
      conn.release();

      return result;
    } catch (err: any) {
      console.log("ERROR | Request Service | Get Approvals | more:", err.message);
      return null;
    }
  },

  setApproval: async ({
    approvalId,
    approvalDate,
    status,
    comment,
  }: {
    status: string;
    approvalDate: string;
    approvalId: number;
    comment?: string;
  }) => {
    try {
      const conn = await pool.getConnection();
      const sql = `UPDATE approval SET id_status = (SELECT id FROM status WHERE status = ?), 
                                       approval_date = ?, 
                                       comment = ? 
                                       WHERE id = ?`;
      const [result] = await conn.query<ResultSetHeader>(sql, [status, approvalDate, comment, approvalId]);
      conn.release();

      return result.affectedRows;
    } catch (err: any) {
      console.log("ERROR | Request Service | Set Approve | more:", err.message);
      return null;
    }
  },
};

export default RequestService;
