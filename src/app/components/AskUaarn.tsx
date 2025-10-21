"use client";
import { useState } from "react";

export default function AskUAARN() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "mehak-demo-user", // 🔐 demo header — production me Clerk/Auth use karo
        },
        body: JSON.stringify({ message: question }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Something went wrong");
      } else {
        const data = await res.json();
        // redirect_to => agar paid agent trigger ho to
        if (data.redirected_to) {
          setAnswer(
            `⚠️ This question requires a Pro Agent. Visit: ${data.redirected_to}`
          );
        } else {
          setAnswer(data.reply);
        }
      }
    } catch (err: any) {
      setError("❌ Network error. Please check your server.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center py-8">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 text-center">
          Ask UAARN
        </h2>
        <textarea
          className="w-full p-3 border border-slate-300 rounded-lg text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Ask any study question..."
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2 rounded-lg text-white font-medium transition w-full sm:w-auto"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {answer && !error && (
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-left">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
