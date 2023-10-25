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

  async getApprovals(id: number, status: string = "pendente") {
    try {
      const conn = await pool.getConnection();
      const sql = `SELECT R.id requestNumber,
                        A.name access,
                        A.description,
                        U.id requesterId,
                        U.fullname requesterName,
                        U.username requesterUsername,
                        DATE_FORMAT(R.request_date, '%Y-%m-%d %H:%i:%s') AS requestDate,
                        R.approver_owner approverOwner,
                        S.status
                   FROM request R
                      INNER JOIN access A ON A.id = R.id_access
                      INNER JOIN user U ON U.id = R.id_requester
                      INNER JOIN approver AP ON AP.id_access = R.id_access
                      INNER JOIN status S ON R.id_status = S.id
                   WHERE AP.id_user = ?
                   AND R.id_status = (SELECT id FROM status WHERE status = ?)
                   ORDER BY requestDate DESC`;
      const [result] = await conn.query<RowDataPacket[]>(sql, [id, status]);

      return result;
    } catch (err: any) {
      console.log("ERROR | User Service | Get Approvals | more:", err.message);
      return null;
    }
  },
};

export default UserService;
