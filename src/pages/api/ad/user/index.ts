import ActiveDirectoryService from "@/services/ActiveDirectory/activedirectory.service";
import User from "@/services/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await ActiveDirectoryService.getUsers();
    res.status(200).send(users);
  } catch (err: any) {
    res.status(500).send({ error: { field: "message", message: err.message } });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
  } catch (err: any) {
    res.status(500).send({ error: { field: "message", message: err.message } });
  }
}
