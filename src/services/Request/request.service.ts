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
      conn.release();

      const requestNumber = result.insertId;

      approver?.forEach(async (approver: IUser) => {
        const approvalQuery = `INSERT INTO approval (id_user) VALUES (?)`;
        const [result] = await conn.query<ResultSetHeader>(approvalQuery, [approver.id]);
        conn.release();

        const idApproval = result.insertId;

        const approvalRequestQuery = `INSERT INTO approval_request (id_request, id_approval) VALUES (?, ?)`;
        await conn.query(approvalRequestQuery, [requestNumber, idApproval]);
        conn.release();
      });

      conn.release();

      return { requestNumber };
    } catch (err: any) {
      console.log("ERROR | Request Service | Create Request | more:", err.message);
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
};

export default RequestService;
