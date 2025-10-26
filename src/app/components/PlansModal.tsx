"use client";

import Link from "next/link";
import { X } from "lucide-react";

export default function PlansModal({ onCloseAction }: { onCloseAction: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      {/* Scrollable container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-6xl max-h-[90vh] overflow-y-auto px-6 sm:px-8 md:px-10 py-8">
        {/* Close Button */}
        <X
          onClick={onCloseAction}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 w-7 h-7 cursor-pointer transition"
        />

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800 font-sans">
          Choose Your Plan
        </h2>

        {/* Plans Section */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          {/* Starter Plan */}
          <div className="flex flex-col justify-between border-2 border-slate-200 px-6 py-8 rounded-xl bg-white shadow-md hover:scale-105 hover:border-blue-400 hover:shadow-lg hover:bg-slate-50 transition-all duration-300 w-full md:w-1/3">
            <div>
              <h3 className="font-bold text-xl sm:text-2xl font-serif mb-4 text-center">Starter Plan</h3>
              <p className="mb-5 text-green-500 text-center">$99 one time – Ideal for individuals</p>
              <ul className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-1">
                <li>✔️ 1 prebuilt educational agent (Study Helper or Notes Summarizer)</li>
                <li>✔️ Basic customization (name, prompts, logo)</li>
                <li>✔️ Step-by-step setup guide</li>
                <li>✔️ 1-time setup assistance</li>
                <li>✔️ Simple API or iframe integration</li>
              </ul>
            </div>
            <Link href="/sign-in" className="flex justify-center mt-8">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2.5 px-6 rounded-xl font-medium shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300">
                Get Starter
              </button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col justify-between border-2 border-slate-200 px-6 py-8 rounded-xl bg-white shadow-md hover:scale-105 hover:border-purple-500 hover:shadow-lg hover:bg-slate-50 transition-all duration-300 w-full md:w-1/3">
            <div>
              <h3 className="font-bold text-xl sm:text-2xl font-serif mb-4 text-center">Pro Plan</h3>
              <p className="mb-5 text-green-500 text-center">$199 one-time – For schools</p>
              <ul className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-1">
                <li>✔️ Up to 2 custom-built AI agents</li>
                <li>✔️ Branded with your school’s theme</li>
                <li>✔️ Subject-focused customization</li>
                <li>✔️ Priority email support</li>
                <li>✔️ Integration & testing assistance</li>
                <li>✔️ Full documentation for maintenance</li>
                <li>✔️ 1 month post-delivery support</li>
              </ul>
            </div>
            <Link href="/contact" className="flex justify-center mt-8">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2.5 px-6 rounded-xl font-medium shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300">
                Get Professional
              </button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col justify-between border-2 border-slate-200 px-6 py-8 rounded-xl bg-white shadow-md hover:scale-105 hover:border-pink-500 hover:shadow-lg hover:bg-slate-50 transition-all duration-300 w-full md:w-1/3">
            <div>
              <h3 className="font-bold text-xl sm:text-2xl font-serif mb-4 text-center">Enterprise</h3>
              <p className="mb-5 text-green-500 text-center">Starts at $299 – For large institutions</p>
              <ul className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-1">
                <li>✔️ Fully custom multi-agent system</li>
                <li>✔️ Trained on your own materials (PDFs, docs, etc.)</li>
                <li>✔️ Advanced analytics dashboard</li>
                <li>✔️ Dedicated developer collaboration</li>
                <li>✔️ Custom branding + domain setup</li>
                <li>✔️ Complete code & API handover</li>
              </ul>
            </div>
            <Link href="/contact" className="flex justify-center mt-8">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2.5 px-6 rounded-xl font-medium shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
