// middleware.js

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getUser } from "./service/authService";
import { TUserData } from "./types/TUser";

const AuthRoutes = ["/login", "/login/reset-password", "/register"];

const roleBasedRoutes: any = {
  user: [/^\/profile/],
  admin: [/^\/admin/]
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log(request);

  const { pathname } = request.nextUrl;

  // Fetch user data
  const user = await getUser();

  // Check if the user is authenticated
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  // Role-based access control
  const userRole = user?.role; // Ensure this is correctly derived from the decoded token

  if (userRole && roleBasedRoutes[userRole]) {
    const routes = roleBasedRoutes[userRole];

    // Check if the current pathname matches any routes for the user's role
    if (routes.some((route: any) => pathname.match(route))) {
      console.log("test", user);
      return NextResponse.next();
    }
  }

  
  
  // If role doesn't match, redirect to the home page or an error page
  return NextResponse.redirect(new URL("/", request.url));
}

// Configuration for the matcher
export const config = {
  matcher: [
    "/profile",
    "/profile/:page*",
    "/admin",
    "/login",
    "/login/reset-password",
    "/register",
    "/about"
  ]
};
