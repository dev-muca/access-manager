import { RowDataPacket } from "mysql2/promise";

import pool from "../model/pool";

import { Access } from "@/interfaces/access";
import { Approver } from "@/interfaces/approver";
import * as Response from "@/interfaces/responses";

const AccessController = {
  getInfo: async (id?: number, orderBy: string = "name"): Promise<Response.AccessOrError> => {
    try {
      // const access: Access[] = [];
      const conn = await pool.getConnection();
      const query = `SELECT id, name, description FROM access ORDER BY ${orderBy}`;

      const [result] = await conn.query<RowDataPacket[]>(query);
      conn.release();

      const _mapData = result.map((row) => {
        const _id: number = row.id;
        const _name: string = row.name;
        const _description: string = row.description;

        return { id: _id, name: _name, description: _description };
      });

      const access = id ? _mapData.filter((access) => access.id === id) : _mapData;

      return { access };
    } catch (err: any) {
      return { error: err };
    }
  },

  getApprover: async (id: number): Promise<Response.AccessApproverOrError> => {
    try {
      const conn = await pool.getConnection();
      const query = `SELECT A.id,
                            A.name,
                            A.description,
                     GROUP_CONCAT(CONCAT(U.id, '-', u.fullname)
                     ORDER BY U.id ASC SEPARATOR ';') AS approver
                     FROM approver AP
                        LEFT JOIN access A ON A.id = AP.id_access
                        LEFT JOIN user U ON U.id = AP.id_user
                     WHERE A.id = ?
                     HAVING approver IS NOT NULL`;

      const [result] = await conn.query<RowDataPacket[]>(query, [id]);
      conn.release();

      if (!result.length) throw new Error(`${id} NOAPPROVER`);

      const row = result[0];

      const parseApprover = (approver: string): Approver => {
        const [_id, _fullname] = approver.split("-");
        const id = Number(_id);
        const fullname = String(_fullname);

        return { id, fullname };
      };

      const access: Access = {
        id: row.id,
        name: row.name,
        description: row.description,
        approver: row.approver ? row.approver.split(";").map(parseApprover) : [],
      };

      return { access };
    } catch (err: any) {
      return { error: err };
    }
  },
};

export default AccessController;
