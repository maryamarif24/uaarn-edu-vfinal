"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FileUp, UploadCloud } from "lucide-react";

export default function UploadNotes() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        title: "⚠️ No File Selected",
        text: "Please upload a file before submitting.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    setLoading(true);

    try {
      // ✅ Step 1: Upload file to Sanity
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.assetId) {
        throw new Error(uploadData.error || "Failed to upload file");
      }

      // ✅ Step 2: Save note to Sanity
      const response = await fetch("/api/add-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          fileAssetId: uploadData.assetId,
          teacher: user?.primaryEmailAddress?.emailAddress || "Unknown",
        }),
      });

      const result = await response.json();

      if (result.success) {
        await Swal.fire({
          title: "✅ Note Uploaded!",
          text: "Your note has been successfully uploaded.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        router.push("/teacher-dashboard");
      } else {
        throw new Error(result.error || "Failed to add note");
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      Swal.fire({
        title: "❌ Upload Failed",
        text: error.message || "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl rounded-3xl w-full max-w-2xl p-8 sm:p-10">
        <div className="flex items-center justify-center mb-6 text-blue-600">
          <FileUp className="w-10 h-10 mr-2" />
          <h2 className="text-3xl font-bold text-slate-800">
            Upload <span className="text-blue-600">Notes</span>
          </h2>
        </div>
        <p className="text-center text-slate-500 mb-8">
          Upload your lecture notes, PDFs, or study materials to share with
          students.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Chapter 2 - Thermodynamics"
              className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Short summary of the note..."
              className="w-full border border-slate-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Upload File
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-6 bg-slate-50 hover:border-blue-400 transition text-center">
              <UploadCloud className="w-10 h-10 text-blue-500 mb-2" />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
              <p className="text-slate-500 text-sm mt-2">
                Supported: PDF, DOCX, Images
              </p>
            </div>
            {file && (
              <p className="text-sm text-green-600 mt-2 font-medium">
                📄 {file.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-3 rounded-xl shadow-md transition`}
          >
            {loading ? "Uploading..." : "Upload Note"}
          </button>
        </form>
      </div>
    </div>
  );
}
