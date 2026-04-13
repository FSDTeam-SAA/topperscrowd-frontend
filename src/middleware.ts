import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin dashboard: only accessible by admin role
    if (pathname.startsWith("/admin-dashboard")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // User dashboard: only accessible by user role (not admin)
    if (pathname.startsWith("/dashboard")) {
      if (token?.role === "admin") {
        return NextResponse.redirect(new URL("/admin-dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};
