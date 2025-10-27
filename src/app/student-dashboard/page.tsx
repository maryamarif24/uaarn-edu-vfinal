import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BookOpen, FileText } from "lucide-react"; // FileText for notes, BookOpen for courses, Sparkles for quizzes/general
import Link from "next/link";

export default async function StudentDashboard() {
  const user = await currentUser();

  if (!user) {
    // Redirect unauthenticated users to sign-in page, specifying the return path
    redirect(`/sign-in?redirect_url=/student-dashboard`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-8 w-full max-w-5xl">
        
        {/* Header - Now consistent with TeacherDashboard */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome, {user.firstName || "Student"}! ✨
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your learning, view your notes, and take quizzes.
            </p>
          </div>
          <Image
            src={user.imageUrl || "/default-avatar.png"}
            alt="Student avatar"
            width={56}
            height={56}
            className="w-14 h-14 rounded-full border border-slate-300 shadow-sm"
            priority
            unoptimized
          />
        </div>

        {/* Dashboard Cards - Now using the teacher's grid and card styles */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* View Courses Card */}
          <Link
            href="/courses" // Assuming this is the main courses page
            className="group bg-white border border-slate-200 rounded-xl p-6 shadow hover:shadow-lg transition block"
          >
            <BookOpen className="w-10 h-10 text-indigo-500 mb-3" />
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              View Courses
            </h2>
            <p className="text-slate-500 mb-3">
              Browse, enroll, and continue your learning journey.
            </p>
            <span className="text-indigo-600 font-medium group-hover:underline">
              Go to Courses →
            </span>
          </Link>

          {/* View Uploaded Notes Card */}
          <Link
            href="/student-dashboard/uploaded-notes"
            className="group bg-white border border-slate-200 rounded-xl p-6 shadow hover:shadow-lg transition block"
          >
            <FileText className="w-10 h-10 text-indigo-500 mb-3" />
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              My Notes
            </h2>
            <p className="text-slate-500 mb-3">
              Access and download all materials shared by your teachers.
            </p>
            <span className="text-indigo-600 font-medium group-hover:underline">
              View Notes →
            </span>
          </Link>
          
        </div>
      </div>
    </main>
  );
}