import pool from "@/utils/pool";
import { RowDataPacket } from "mysql2";

const UserService = {
  async getUser(username: string) {
    try {
      const conn = await pool.getConnection();
      const sql = "SELECT * FROM user WHERE username = ?";
      const [result] = await conn.query<RowDataPacket[]>(sql, [username]);
      conn.release();

      if (!result.length) return null;

      return result;
    } catch (err: any) {
      console.log("ERROR | User Service | Get User | more:", err.message);
      return err.message;
    }
  },

  async getApprovals(userId: number, status: string = "Pendente") {
    try {
      const conn = await pool.getConnection();
      const sql = `SELECT AR.id approvalId,
                          R.id requestId,
                          A.name accessName,
                          A.description accessDescription,
                          DATE_FORMAT(R.request_date, '%Y-%m-%d %H:%i:%s') AS requestDate,
                          U.id requesterId,
                          U.fullname requesterName,
                          S.status
                    FROM approval_request AR
                        INNER JOIN approval AP ON AP.id = AR.id_approval
                        INNER JOIN request R ON R.id = AR.id_request
                        INNER JOIN access A ON A.id = R.id_access
                        INNER JOIN user U ON U.id = R.id_requester
                        INNER JOIN status S ON S.id = AP.id_status
                    WHERE AP.id_user = ?
                        AND AP.id_status = (SELECT id FROM STATUS WHERE STATUS = ?)
                    ORDER BY requestDate DESC`;
      const [result] = await conn.query<RowDataPacket[]>(sql, [userId, status]);

      return result;
    } catch (err: any) {
      console.log("ERROR | User Service | Get Approvals | more:", err.message);
      return null;
    }
  },
};

export default UserService;
