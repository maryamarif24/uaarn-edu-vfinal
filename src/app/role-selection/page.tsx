// src/app/role-selection/page.tsx
"use client";

import { useUser, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SelectRolePage() {
  // Destructure isLoaded for safety checks
  const { isLoaded: isUserLoaded, user } = useUser();
  const { session, isLoaded: isSessionLoaded } = useSession(); 
  const router = useRouter();

  // Determine if the component is ready to handle clicks
  const isClerkReady = isUserLoaded && isSessionLoaded && user && session;

  const handleRoleSelect = async (role: string) => {
    
    // 🛑 SAFETY CHECK: This is essential to prevent the "button not working" error
    if (!isClerkReady) {
        console.error("Clerk data not ready. Click ignored.");
        return;
    }
    
    try {
      // 1. Update the metadata
      await user.update({
        unsafeMetadata: { role },
      });

      // 2. 🔥 CRITICAL FIX: Force the session token to reload
      await session.reload(); 

      // 3. Navigate
      if (role === "Teacher") {
          router.push("/teacher-dashboard");
      } else if (role === "Student") {
          router.push("/student-dashboard");
      }
      
    } catch (error) {
      console.error("Error during role selection/token refresh:", error);
      alert("Failed to set role. Please log out and log back in, then try again.");
    }
  };

  // Show a loading state if data is not ready
  if (!isUserLoaded || !isSessionLoaded) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Loading account details...</p>
      </section>
    );
  }

  // The rest of your JSX
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50 px-6 text-center">
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
        Choose Your <span className="text-blue-600">Role</span>
      </h1>
      <p className="text-slate-600 max-w-md mb-12 text-lg">
        Select your account type to get started. Your dashboard experience will be personalized based on your role.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        {/* Teacher Card */}
        <button
          onClick={() => handleRoleSelect("Teacher")}
          // ✅ ADD disabled state to prevent premature clicks
          disabled={!isClerkReady} 
          className="group relative overflow-hidden bg-white border border-slate-200 hover:border-blue-600 rounded-2xl shadow-md hover:shadow-xl px-10 py-8 w-72 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* ... UI content ... */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="relative z-10">
            <div className="text-5xl mb-3">👩‍🏫</div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              I&apos;m a Teacher
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              Manage courses, create quizzes, and guide your students.
            </p>
            <span className="inline-block bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Continue as Teacher
            </span>
          </div>
        </button>

        {/* Student Card */}
        <button
          onClick={() => handleRoleSelect("Student")}
          // ✅ ADD disabled state to prevent premature clicks
          disabled={!isClerkReady}
          className="group relative overflow-hidden bg-white border border-slate-200 hover:border-green-600 rounded-2xl shadow-md hover:shadow-xl px-10 py-8 w-72 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* ... UI content ... */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="relative z-10">
            <div className="text-5xl mb-3">🎓</div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              I&apos;m a Student
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              Access courses, take quizzes, and track your progress.
            </p>
            <span className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg cursor-pointer font-medium hover:bg-green-700 transition">
              Continue as Student
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}