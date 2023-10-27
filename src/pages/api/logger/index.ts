import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send({ logger_active: true });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const time = Date.now();
  const timeStr = new Date(time).toLocaleDateString();
  const currentDate = timeStr.replaceAll("/", "-");

  try {
    fs.access(`./logs/log__${currentDate}.txt`, fs.constants.F_OK, (err) => {
      if (err?.code === "ENOENT") {
        fs.appendFileSync(`./logs/log__${currentDate}.txt`, JSON.stringify(req.body));
        fs.appendFileSync(`./logs/log__${currentDate}.txt`, "\n");
        return res.end();
      }

      fs.appendFileSync(`./logs/log__${currentDate}.txt`, JSON.stringify(req.body));
      fs.appendFileSync(`./logs/log__${currentDate}.txt`, "\n");
      return res.end();
    });
  } catch (err: any) {
    fs.appendFileSync(`./logs/log__${currentDate}.txt`, JSON.stringify(req.body));
    fs.appendFileSync(`./logs/log__${currentDate}.txt`, "\n");
    console.log("Log gravado!");
    return res.end();
  }
}