import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BookOpen, FileUp, Brain } from "lucide-react";
import Link from "next/link";

export default async function TeacherDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect(`/sign-in?redirect_url=/teacher-dashboard`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-8 w-full max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome, {user.firstName}! 👋
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your courses, notes, and quizzes for your students.
            </p>
          </div>
          <Image
            src={user.imageUrl || "/default-avatar.png"}
            alt="Teacher avatar"
            width={56}
            height={56}
            className="w-14 h-14 rounded-full border border-slate-300 shadow-sm"
            priority
            unoptimized
          />
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Add Course Card */}
          <Link
            href="/teacher-dashboard/add-course"
            className="group bg-white border border-slate-200 rounded-xl p-6 shadow hover:shadow-lg transition block"
          >
            <BookOpen className="w-10 h-10 text-indigo-500 mb-3" />
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Add Course
            </h2>
            <p className="text-slate-500 mb-3">
              Create a new course and share it with your students.
            </p>
            <span className="text-indigo-600 font-medium group-hover:underline">
              Add New Course →
            </span>
          </Link>

          {/* Upload Notes Card */}
          <Link
            href="/teacher-dashboard/upload-notes"
            className="group bg-white border border-slate-200 rounded-xl p-6 shadow hover:shadow-lg transition block"
          >
            <FileUp className="w-10 h-10 text-indigo-500 mb-3" />
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Upload Notes
            </h2>
            <p className="text-slate-500 mb-3">
              Upload PDF, Word, or image notes for your classes.
            </p>
            <span className="text-indigo-600 font-medium group-hover:underline">
              Upload Notes →
            </span>
          </Link>

          {/* Generate Quiz Card */}
          <Link
            href="/quiz"
            className="group bg-white border border-slate-200 rounded-xl p-6 shadow hover:shadow-lg transition block"
          >
            <Brain className="w-10 h-10 text-indigo-500 mb-3" />
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Generate Quiz
            </h2>
            <p className="text-slate-500 mb-3">
              Automatically create quizzes for your courses using AI.
            </p>
            <span className="text-indigo-600 font-medium group-hover:underline">
              Generate Quiz →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
