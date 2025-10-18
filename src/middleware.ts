import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // ✅ Allow public routes (these can be visited without signing in)
  const publicPaths = [
    "/",
    "/about",
    "/courses",
    "/contact",
    "/sign-in",
    "/sign-up",
    "/role-selection",
  ];

  if (publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ✅ If user not signed in → redirect to sign-in
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // ✅ Get the user's role from Clerk metadata
  const role = (sessionClaims?.unsafeMetadata as { role?: string } | undefined)?.role;

  // ✅ Role-based route protection
  if (req.nextUrl.pathname.startsWith("/teacher-dashboard") && role !== "Teacher") {
    return NextResponse.redirect(new URL("/student-dashboard", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/student-dashboard") && role !== "Student") {
    return NextResponse.redirect(new URL("/teacher-dashboard", req.url));
  }

  // ✅ Default: continue
  return NextResponse.next();
});

// ✅ Keep your existing config for static assets and APIs
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
