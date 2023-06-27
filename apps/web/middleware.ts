import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePages = ["/", "/bots", "/chats", "/settings", "/contents"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // ignore API & static files
  if (pathname.includes("/api/auth") || pathname.includes("/_next")) {
    return NextResponse.next();
  }

  // redirect to Homepage
  if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // require login
  if (!token && privatePages.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
};
