"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Upload, BookOpen } from "lucide-react";

export default function AddCourse() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      Swal.fire({
        title: "⚠️ No Image Selected",
        text: "Please upload an image before submitting.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    setLoading(true);

    try {
      // ✅ 1. Upload image to Sanity
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.url) {
        throw new Error(uploadData.error || "Failed to upload image");
      }

      // ✅ 2. Save course to Sanity using image URL
      const response = await fetch("/api/add-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          platform,
          image: uploadData.url,
          link,
          teacherEmail: user?.primaryEmailAddress?.emailAddress || "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        await Swal.fire({
          title: "✅ Course Added!",
          text: "Your course has been added successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        router.push("/teacher-dashboard");
      } else {
        throw new Error(result.error || "Failed to add course");
      }
    } catch (error: unknown) {
      console.error("Error adding course:", error);
      Swal.fire({
        title: "❌ Failed to Add Course",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-indigo-500" />
          <h1 className="text-2xl font-bold text-slate-800">
            Add a New Course
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Course Title
            </label>
            <input
              type="text"
              placeholder="e.g. Advanced JavaScript"
              className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Platform */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Platform
            </label>
            <input
              type="text"
              placeholder="e.g. YouTube, Coursera"
              className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Course Thumbnail
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-400 transition">
              <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-slate-500 mb-2 text-sm">
                Drag & drop or click to upload an image
              </p>
              <input
                type="file"
                accept="image/*"
                className="w-full border-none outline-none text-sm text-slate-600"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                required
              />
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Course Link
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 ${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white py-3 rounded-lg transition font-semibold`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : (
              "Add Course"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
