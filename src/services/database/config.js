import { createPool } from "mysql2/promise";

const pool = createPool({
  database: process.env.MYSQL_DB,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
});

export default pool;
