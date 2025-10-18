"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 border border-slate-200 rounded-2xl shadow-lg p-6 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">
              Welcome, {user.firstName || "Student"} 👋
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your learning, take quizzes, and access your notes.
            </p>
          </div>
          <button
            onClick={() => router.push("/quiz")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 cursor-pointer transition-all"
          >
            Generate Quiz
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Courses */}
          <div className="bg-white/90 border border-slate-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              View Courses
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              Browse and enroll in courses tailored for you.
            </p>
            <button
              onClick={() => router.push("/courses")}
              className="bg-blue-600 text-white w-full py-2 rounded-xl hover:bg-blue-700 cursor-pointer transition-all"
            >
              Go to Courses
            </button>
          </div>

          {/* Uploaded Notes */}
          <div className="bg-white/90 border border-slate-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">
              Uploaded Notes
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              View and download notes uploaded by teachers.
            </p>
            <button
              onClick={() => router.push("/student-dashboard/uploaded-notes")}
              className="bg-purple-600 text-white w-full py-2 rounded-xl hover:bg-purple-700 cursor-pointer transition-all"
            >
              View Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
