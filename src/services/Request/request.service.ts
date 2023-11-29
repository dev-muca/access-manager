import IRequest from "@/@types/IRequest";
import IUser from "@/@types/IUser";
import pool from "@/utils/pool";
import { readFileSync } from "fs";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const RequestService = {
  createRequest: async ({ idAccess, idRequester, justification, approverOwner, requestDate, approver }: IRequest) => {
    try {
      const conn = await pool.getConnection();
      const requestQuery = readFileSync("./sql/create-request.sql").toString();
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
          const approvalQuery = readFileSync("./sql/create-approval").toString();
          const [approvalResult] = await conn.query<ResultSetHeader>(approvalQuery, [approver.id]);
          const idApproval = approvalResult.insertId;

          const approvalRequestQuery = readFileSync("./sql/create-approval-request.sql").toString();
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

  getRequest: async (id: number) => {
    try {
      const conn = await pool.getConnection();
      const query = readFileSync("./sql/get-request.sql").toString();
      const [result] = await conn.query<RowDataPacket[]>(query, [id]);
      conn.release();

      return result;
    } catch (err: any) {
      console.log("ERROR | Request Service | Get Request | more:", err.message);
      return null;
    }
  },

  getRequests: async (id: number, status: string = "pendente") => {
    try {
      const conn = await pool.getConnection();
      const query = readFileSync("./sql/get-requests.sql").toString();
      const [result] = await conn.query<RowDataPacket[]>(query, [id, status]);
      conn.release();

      return result;
    } catch (err: any) {
      console.log("ERROR | Request Service | Get Requests | more:", err.message);
      return null;
    }
  },

  getApproval: async (id: number) => {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./sql/get-approval.sql").toString();
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
      const sql = readFileSync("./sql/set-approval.sql").toString();
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
