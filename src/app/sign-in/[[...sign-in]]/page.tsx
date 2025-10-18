"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      const role = user.unsafeMetadata.role;

      if (!role) {
        router.push("/select-role"); // go choose role if none yet
      } else if (role === "Teacher") {
        router.push("/teacher-dashboard");
      } else if (role === "Student") {
        router.push("/student-dashboard");
      } else {
        router.push("/");
      }
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div>
        <SignIn
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/role-selection" // ✅ ensure always goes here after signup
          forceRedirectUrl="/role-selection"  // ✅ ensure always goes here after signin
        />
      </div>
    </div>
  );
}
