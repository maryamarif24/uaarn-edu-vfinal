"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // send data to backend API route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message");
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left side (info) */}
          <div className="bg-blue-700 text-white p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-10">Get in Touch</h2>
            <p className="text-blue-100 mb-8 text-xl">
              Have questions or feedback? We’d love to hear from you.  
              Just fill out the form and our team will get back to you soon.
            </p>
            <div className="space-y-3 text-blue-50">
              <p>📧 support@uaarn.com</p>
              <p>🌐 www.uaarn.com</p>
              <p>📍 Karachi, Pakistan</p>
            </div>
          </div>

          {/* Right side (form) */}
          <div className="p-10">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {success && (
              <div className="mt-3 text-green-600 text-sm">
                ✅ Message sent successfully!
              </div>
            )}
            {error && (
              <div className="mt-3 text-red-600 text-sm">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
