"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export default function QuizPage() {
  type Quiz = {
    question: string;
    options: string[];
    answer: string;
  };

  type Message =
    | { role: "user"; content: string }
    | { role: "ai"; content: Quiz[] | string };

  const [messages, setMessages] = useState<Message[]>([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "http://127.0.0.1:8000"; // ✅ backend running locally

  const handleSend = async () => {
    if (!topic.trim()) return;

    const userMsg = { role: "user" as const, content: topic };
    setMessages((prev) => [...prev, userMsg]);
    setTopic("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`Backend error: ${res.status}`);
      }

      // Create a reader to process the stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Generating quiz..." },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Update live text in the UI
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last.role === "ai") {
            return [...prev.slice(0, -1), { ...last, content: buffer }];
          }
          return prev;
        });
      }

      // Try parsing JSON once full text received
      try {
        const jsonStart = buffer.indexOf("[");
        const jsonEnd = buffer.lastIndexOf("]");
        const jsonString = buffer.slice(jsonStart, jsonEnd + 1);
        const quizData: Quiz[] = JSON.parse(jsonString);

        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "ai", content: quizData },
        ]);
      } catch (err) {
        console.error("Parsing error:", err);
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "ai", content: "⚠️ Could not parse quiz JSON properly." },
        ]);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      alert("❌ Error generating quiz. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-[80vh]">
        {/* Header */}
        <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Quiz Generator 🧠
          </h2>
          <span className="text-sm text-slate-500">AI Learning Assistant</span>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <p className="text-center text-slate-400 mt-10">
              Type a topic to generate an AI quiz ✨
            </p>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none px-4 py-3"
                    : "bg-slate-100 text-slate-800 rounded-bl-none p-4"
                }`}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : Array.isArray(msg.content) ? (
                  <div className="space-y-4">
                    {msg.content.map((q, idx) => (
                      <div
                        key={idx}
                        className="border border-slate-200 rounded-xl p-4 bg-white"
                      >
                        <h3 className="font-medium text-slate-800 mb-2">
                          {idx + 1}. {q.question}
                        </h3>
                        <ul className="space-y-1">
                          {q.options.map((opt, i) => (
                            <li
                              key={i}
                              className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-blue-50 cursor-pointer text-slate-700 text-sm"
                            >
                              {opt}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-slate-500 mt-2">
                          ✅ Correct Answer: <b>{q.answer}</b>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-slate-500">
                    {msg.content}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 px-4 py-3 rounded-2xl rounded-bl-none text-sm animate-pulse">
                Generating quiz...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 px-6 py-4 flex items-center gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter a topic (e.g., Photosynthesis, JavaScript Basics)"
            className="flex-1 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
