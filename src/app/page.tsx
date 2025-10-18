"use client";
import Link from "next/link";
import FeatureCard from "./components/FeatureCard";
import ContactPage from "./contact/page";
import CoursesPage from "./courses/page";
import AboutPage from "./about/page";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-8 py-34 text-center bg-gradient-to-b from-white to-slate-50">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight max-w-3xl">
          Empower Your Learning with{" "}
          <span className="text-blue-600">AI Intelligence</span>
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl text-lg">
          UAARN is your personal AI-powered study companion — ask questions,
          explore topics, and understand concepts in seconds.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/ask"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            Ask UAARN
          </Link>
          <Link
            href="/about"
            className="border border-slate-300 hover:border-blue-600 hover:text-blue-600 px-6 py-3 rounded-lg transition font-medium"
          >
            Learn More
          </Link>
        </div>
      </section>

      <AboutPage />

      {/* Features Section */}
      <section className="bg-slate- py-16 px-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-semibold mb-10 text-slate-900">
            Why Choose <span className="text-blue-700">UAARN</span>?
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="AI-Powered Q&A"
              desc="Ask any question and get instant, detailed answers with explanations powered by Gemini AI."
              icon="🤖"
            />
            <FeatureCard
              title="Personalized Learning"
              desc="UAARN learns your study patterns and provides intelligent topic guidance and summaries."
              icon="🎯"
            />
            <FeatureCard
              title="Simple & Fast"
              desc="No complex setup — just ask, learn, and grow with a few clicks."
              icon="⚡"
            />
          </div>
        </div>
      </section>

      <CoursesPage />
      <ContactPage />

    </div>
  );
}
