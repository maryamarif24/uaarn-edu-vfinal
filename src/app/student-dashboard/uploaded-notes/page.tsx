"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getNotes } from "@/sanity/lib/client";

type Note = {
  _id: string;
  title: string;
  fileUrl?: string;
};

export default function UploadedNotesPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    async function fetchNotes() {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            📘 Uploaded Notes
          </h1>
          <button
            onClick={() => router.push("/student-dashboard")}
            className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-5 py-2.5 rounded-xl cursor-pointer shadow hover:shadow-md hover:from-slate-700 hover:to-slate-800 transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Notes Section */}
        {loading ? (
          <p className="text-slate-500 text-center mt-20 text-lg animate-pulse">
            Loading notes...
          </p>
        ) : notes.length === 0 ? (
          <p className="text-slate-500 text-center mt-20 text-lg">
            No notes available yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="group border border-slate-200 bg-white/80 rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="font-semibold text-xl text-slate-800 mb-7 group-hover:text-indigo-700 transition-colors">
                  {note.title}
                </h3>

                <div className="flex gap-3 mt-4">
                  {/* View Button */}
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    className="flex-1 text-center bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 rounded-xl shadow hover:from-indigo-600 hover:to-blue-700 transition-all"
                  >
                    View
                  </a>

                  {/* Download Button */}
                  <a
                    href={note.fileUrl}
                    download
                    className="flex-1 text-center bg-gradient-to-r from-sky-500 to-cyan-600 text-white py-2 rounded-xl shadow hover:from-sky-600 hover:to-cyan-700 transition-all"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
