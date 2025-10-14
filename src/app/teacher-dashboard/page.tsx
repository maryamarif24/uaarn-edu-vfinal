"use client";
import { useState } from "react";
import { BarChart2, BookOpen, ClipboardList, LogOut, Users } from "lucide-react";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">UAARN</h1>

        <nav className="flex flex-col gap-4 text-slate-700">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === "overview"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-slate-100"
            }`}
          >
            <BarChart2 size={18} /> Overview
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === "courses"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-slate-100"
            }`}
          >
            <BookOpen size={18} /> Courses
          </button>
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === "quizzes"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-slate-100"
            }`}
          >
            <ClipboardList size={18} /> Quizzes
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === "students"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-slate-100"
            }`}
          >
            <Users size={18} /> Students
          </button>
        </nav>

        <div className="mt-auto">
          <button className="flex items-center gap-2 text-slate-500 hover:text-red-600 mt-6 px-4 py-2">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "overview" && (
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Dashboard Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-slate-500 text-sm">Total Students</h3>
                <p className="text-2xl font-bold text-blue-600 mt-1">152</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-slate-500 text-sm">Active Courses</h3>
                <p className="text-2xl font-bold text-blue-600 mt-1">8</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-slate-500 text-sm">Quizzes Created</h3>
                <p className="text-2xl font-bold text-blue-600 mt-1">23</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-slate-500 text-sm">Average Score</h3>
                <p className="text-2xl font-bold text-blue-600 mt-1">84%</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "courses" && (
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Manage Courses
            </h2>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-slate-600">List of courses will appear here.</p>
            </div>
          </section>
        )}

        {activeTab === "quizzes" && (
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Manage Quizzes
            </h2>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-slate-600">Create or view quizzes here.</p>
            </div>
          </section>
        )}

        {activeTab === "students" && (
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Students List
            </h2>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-slate-600">Student details will appear here.</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
