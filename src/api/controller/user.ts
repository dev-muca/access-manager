import { RowDataPacket } from "mysql2/promise";
import pool from "../model/pool";
import { IUser } from "@/interfaces/user";
import { IError } from "@/interfaces/generics";

const UserController = {
  GetInfo: async (username: string): Promise<any> => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT * FROM user WHERE username = ?`;
      const [result] = await conn.query<RowDataPacket[]>(query, [username]);
      conn.release();

      if (!result.length) throw new Error(`${username} NOTFOUND`);

      const row = result[0];

      const user: IUser = {
        id: row.id,
        internalCode: row.internalCode,
        firstName: row.firstName,
        lastName: row.lastName,
        fullname: row.fullname,
        email: row.email,
        username: row.username,
        password: row.password,
        streetAddress: row.streetAddress,
        city: row.city,
        state: row.state,
        postalCode: row.postalCode,
        title: row.title,
        office: row.office,
        department: row.department,
        company: row.company,
        telephoneNumber: row.telephoneNumber,
        homeNumber: row.homeNumber,
        description: row.description,
        active: row.active ? true : false,
      };

      return user;
    } catch (err: any) {
      let error: IError = {
        field: "message",
        message: err.message,
      };

      if (err.message.includes("ETIMEDOUT")) error.message = "O Servidor não respondeu";

      if (err.message.includes("NOTFOUND")) {
        error.field = "username";
        error.message = "Usuário inválido";
      }

      return error;
    }
  },
};

export default UserController;
