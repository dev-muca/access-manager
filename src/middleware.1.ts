import type { NextRequest } from "next/server";
import { useContext } from "react";

export function middleware(request: NextRequest) {
  //   if (request.nextUrl.pathname.startsWith("/about")) {
  //     return NextResponse.rewrite(new URL("/about-2", request.url));
  //   }
  //   if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //     return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  //   }
  const { session } = useContext();
  console.log("Middleware!!!");
}
