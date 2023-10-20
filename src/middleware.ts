import { userAgent, type NextRequest } from "next/server";
import fs from "fs";
import BASE_URL from "./utils/host";

export function middleware(req: NextRequest) {
  const time = Date.now();
  const timeStr = new Date(time).toLocaleString();

  const { device } = userAgent(req);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  const logData = { time: timeStr, httpMethod: req.method, url: req.url, device: viewport, ip: req.ip };

  fetch(`${BASE_URL}/api/logger`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(logData),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err.message));
}
