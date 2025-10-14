"use client";
import { useState } from "react";

export default function AskUAARN() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setAnswer("✨ This is a sample AI-generated response preview.");
      setLoading(false);
    }, 1200);
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

        {answer && (
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-left">
            <p className="text-slate-700 leading-relaxed">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
