"use client";
import { useState, useEffect, useRef } from "react";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

export default function SummarizePage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledLink = (searchParams?.get("link") ?? "") as string;

  const [source, setSource] = useState<"youtube" | "text" | "upload">("youtube");
  const [link, setLink] = useState(prefilledLink);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const BACKEND_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (prefilledLink) {
      setSource("youtube");
      setLink(prefilledLink);
    }
  }, [prefilledLink]);

  if (!isLoaded) return <div className="text-center mt-20 text-slate-500">Loading...</div>;
  if (!isSignedIn) return <RedirectToSignIn />;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setFileName(f.name);
  }

  async function handleSummarize() {
    setError(null);
    setSummary(null);

    try {
      setLoading(true);
      let response;

      if (source === "youtube" || source === "text") {
        const payload = {
          source: source,
          link: source === "youtube" ? link : null,
          text: source === "text" ? text : null,
        };
        response = await fetch(`${BACKEND_URL}/api/agent/summarize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (source === "upload" && file) {
        const formData = new FormData();
        formData.append("file", file);
        response = await fetch(`${BACKEND_URL}/api/agent/upload`, {
          method: "POST",
          body: formData,
        });
      }

      if (!response) throw new Error("No response from server");
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Summarization failed");
      }

      const data = await response.json();
      setSummary(data.output);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(format: "txt" | "pdf") {
    if (!summary) return;
    const response = await fetch(`${BACKEND_URL}/api/agent/download/${format}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: summary }),
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `summary.${format}`;
    a.click();
  }

  async function handleTTS() {
    if (!summary) return;
    const response = await fetch(`${BACKEND_URL}/api/agent/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: summary }),
    });
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setIsPlaying(true);
    audio.play();

    audio.onended = () => {
      setIsPlaying(false);
      audioRef.current = null;
    };
  }

  function handleStopTTS() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setIsPlaying(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            🎯 Summarize Your Lecture or Notes
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Upload a transcript, paste notes, or share a YouTube lecture link — let AI generate a concise and clear summary for you.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <OptionButton active={source === "youtube"} onClick={() => setSource("youtube")}>
            🎥 YouTube Link
          </OptionButton>
          <OptionButton active={source === "upload"} onClick={() => setSource("upload")}>
            📄 Upload File
          </OptionButton>
          <OptionButton active={source === "text"} onClick={() => setSource("text")}>
            ✏️ Paste Text
          </OptionButton>
        </div>

        <div className="mb-6 flex justify-center">
          {source === "upload" ? (
            <label className="block w-full max-w-3xl">
              <input
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <div
                onClick={() => document.getElementById("file-input")?.click()}
                className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 px-4 py-3 rounded-lg text-slate-700 transition text-center"
              >
                {fileName
                  ? `✅ Selected: ${fileName}`
                  : "📂 Click to upload transcript (PDF, DOCX, or TXT)"}
              </div>
            </label>
          ) : source === "text" ? (
            <textarea
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your lecture transcript or notes here..."
              className="w-full max-w-3xl mx-auto block p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 placeholder:text-slate-400"
            />
          ) : (
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste your YouTube video link here..."
              className="w-full max-w-3xl mx-auto block p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 placeholder:text-slate-400"
            />
          )}
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 transition"
          >
            {loading ? "Summarizing..." : "✨ Summarize"}
          </button>

          {summary && (
            <>
              {!isPlaying && (
                <button
                  onClick={handleTTS}
                  className="px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-medium"
                >
                  🔊 Listen
                </button>
              )}
              {isPlaying && (
                <button
                  onClick={handleStopTTS}
                  className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium"
                >
                  🛑 Stop
                </button>
              )}
              <button
                onClick={() => handleDownload("txt")}
                className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 transition text-slate-700 font-medium"
              >
                📥 TXT
              </button>
              <button
                onClick={() => handleDownload("pdf")}
                className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 transition text-slate-700 font-medium"
              >
                📄 PDF
              </button>
            </>
          )}

          <button
            onClick={() => {
              setLink("");
              setText("");
              setSummary(null);
              setError(null);
              setFile(null);
              setFileName(null);
              handleStopTTS(); 
            }}
            className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 transition text-slate-700 font-medium"
          >
            Reset
          </button>
        </div>

        {summary && (
          <div className="mt-8 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 shadow-inner">
            <h3 className="font-semibold text-lg mb-3 text-slate-800">🧠 AI Summary</h3>
            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {summary}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OptionButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition font-medium ${
        active
          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}
