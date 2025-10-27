import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/courses",
  "/contact",
  "/sign-in(.*)",  // 👈 Allow all sign-in related routes
  "/sign-up(.*)",  // 👈 Allow all sign-up related routes
  "/role-selection",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // ✅ Allow public routes without redirecting
  if (isPublicRoute(req)) return NextResponse.next();

  // ✅ If user not signed in → redirect to sign-in (once)
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url); // optional: send back after login
    return NextResponse.redirect(signInUrl);
  }

  // ✅ Role-based access control
  const role = (sessionClaims?.unsafeMetadata as { role?: string })?.role;

  if (req.nextUrl.pathname.startsWith("/teacher-dashboard") && role !== "Teacher") {
    return NextResponse.redirect(new URL("/student-dashboard", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/student-dashboard") && role !== "Student") {
    return NextResponse.redirect(new URL("/teacher-dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
