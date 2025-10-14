"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 p-6">
      <div className="bg-white/90 border border-slate-200 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <SignIn
          path="/sign-in"
          fallbackRedirectUrl="/"   // ✅ new prop
          forceRedirectUrl="/"      // ✅ new prop
        />
      </div>
    </div>
  );
}
