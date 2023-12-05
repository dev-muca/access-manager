import pool from "@/utils/pool";
import { readFileSync } from "fs";
import { ResultSetHeader, RowDataPacket } from "mysql2";

import IUser from "@/@types/IUser";

const UserService = {
  async createUser(user: IUser) {
    try {
      const {
        internalCode,
        firstName,
        lastName,
        fullname,
        email,
        username,
        password,
        streetAddress,
        city,
        state,
        postalCode,
        title,
        office,
        department,
        company,
        telephoneNumber,
        homeNumber,
        description,
      } = user;
      const conn = await pool.getConnection();
      const sql = readFileSync("./sql/create-user.sql").toString();
      const [result] = await conn.query<ResultSetHeader>(sql, [
        internalCode,
        firstName,
        lastName,
        fullname,
        email,
        username,
        password,
        streetAddress,
        city,
        state,
        postalCode,
        title,
        office,
        department,
        company,
        telephoneNumber,
        homeNumber,
        description,
      ]);
      conn.release();

      return result.insertId;
    } catch (err: any) {
      // console.log("ERROR | User Service | Create User | more:", err.message);
      console.log(err.message);
      return null;
    }
  },

  async updateUser(user: IUser) {
    try {
      const {
        id,
        internalCode,
        firstName,
        lastName,
        fullname,
        email,
        username,
        password,
        streetAddress,
        city,
        state,
        postalCode,
        title,
        office,
        department,
        company,
        telephoneNumber,
        homeNumber,
        description,
      } = user;
      const conn = await pool.getConnection();
      const sql = readFileSync("./sql/update-user.sql").toString();
      const [result] = await conn.query<ResultSetHeader>(sql, [
        internalCode,
        firstName,
        lastName,
        fullname,
        email,
        username,
        password,
        streetAddress,
        city,
        state,
        postalCode,
        title,
        office,
        department,
        company,
        telephoneNumber,
        homeNumber,
        description,
        id,
      ]);
      conn.release();

      return result.affectedRows;
    } catch (err: any) {
      // console.log("ERROR | User Service | Create User | more:", err.message);
      console.log(err.message);
      return null;
    }
  },

  async getUsers(order: string) {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./sql/get-all-users.sql").toString();
      const [result] = await conn.query<RowDataPacket[]>(sql, [order]);
      conn.release();

      if (!result.length) return null;

      return result;
    } catch (err: any) {
      console.log("ERROR | User Service | Get Users | more:", err.message);
      return null;
    }
  },

  async getUser(username: string) {
    try {
      const conn = await pool.getConnection();
      const sql = readFileSync("./sql/get-user.sql").toString();
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
      const sql = readFileSync("./sql/get-approvals.sql").toString();
      const [result] = await conn.query<RowDataPacket[]>(sql, [userId, status]);
      conn.release();

      return result;
    } catch (err: any) {
      console.log("ERROR | User Service | Get Approvals | more:", err.message);
      return null;
    }
  },
};

export default UserService;
