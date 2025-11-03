import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Debug logs
  console.log("🔐 Middleware path:", pathname);
  console.log("🎭 Token:", token);

  const publicPaths = ["/", "/signup"];
  const isPublic = publicPaths.includes(pathname);

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/student")) {
    if (token?.Role?.toLowerCase() !== "student") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (pathname.startsWith("/dashboard/teacher")) {
    if (token?.Role?.toLowerCase() !== "teacher") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (pathname.startsWith("/dashboard/admin")) {
    if (token?.Role?.toLowerCase() !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
