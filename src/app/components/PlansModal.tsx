"use client";

import Link from "next/link";
import { X } from "lucide-react";

export default function PlansModal({ onCloseAction }: { onCloseAction: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl px-10 py-10 w-[85%] max-w-6xl relative">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 font-sans">
          Choose Your Plan
        </h2>

        {/* Plans */}
        <div className="flex justify-center gap-6 flex-wrap">
          {/* Free Plan */}
          <div className="w-[30%] min-w-[280px] flex flex-col justify-between border-2 border-slate-200 
                          px-6 py-8 rounded-xl hover:scale-105 hover:border-blue-400 
                          hover:shadow-lg hover:bg-slate-50 transition-all duration-300">
            <div>
              <h3 className="font-bold text-3xl font-serif mb-4 text-center">Starter Plan</h3>
              <p className="mb-5 text-[1.1rem] text-green-500 text-center">
                $99 one time – Ideal for individuals
              </p>
              <ul className="text-slate-700 text-sm leading-relaxed space-y-1">
                <li>✔️ 1 prebuilt educational agent (e.g. Study Helper or Notes Summarizer)</li>
                <li>✔️ Basic customization (name, prompts, logo)</li>
                <li>✔️ Step-by-step setup guide</li>
                <li>✔️ 1-time setup assistance</li>
                <li>✔️ Simple API or iframe integration</li>
              </ul>
            </div>
            <Link href="/sign-in" className="flex justify-center mt-8">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 
                                 text-white py-2.5 px-6 rounded-xl font-medium shadow-md 
                                 hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 
                                 transition-all duration-300">
                Get Starter
              </button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="w-[30%] min-w-[280px] flex flex-col justify-between border-2 border-slate-200 
                          px-6 py-8 rounded-xl hover:scale-105 hover:border-purple-500 
                          hover:shadow-lg hover:bg-slate-50 transition-all duration-300">
            <div>
              <h3 className="font-bold text-3xl font-serif mb-4 text-center">Pro Plan</h3>
              <p className="mb-5 text-[1.1rem] text-green-500 text-center">
                $199 one-time – For schools [portals/websites]
              </p>
              <ul className="text-slate-700 text-sm leading-relaxed space-y-1">
                <li>✔️ Up to 2 custom-built AI agents</li>
                <li>✔️ Branded with your school’s name & theme</li>
                <li>✔️ Subject-focused customization</li>
                <li>✔️ Priority email support</li>
                <li>✔️ Integration & testing assistance</li>
                <li>✔️ Full documentation for maintenance</li>
                <li>✔️ 1 month post-delivery support</li>
              </ul>
            </div>
            <Link href="/contact">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 
                                text-white py-2.5 px-6 rounded-xl font-medium shadow-md 
                                hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 
                                transition-all duration-300 mt-8 mx-auto">
                Get Professional
              </button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="w-[30%] min-w-[280px] flex flex-col justify-between border-2 border-slate-200 
                          px-6 py-8 rounded-xl hover:scale-105 hover:border-pink-500 
                          hover:shadow-lg hover:bg-slate-50 transition-all duration-300">
            <div>
              <h3 className="font-bold text-3xl font-serif mb-4 text-center">Enterprise</h3>
              <p className="mb-5 text-[1.1rem] text-green-500 text-center">
                Starts at $299 – For large institutions
              </p>
              <ul className="text-slate-700 text-sm leading-relaxed space-y-1">
                <li>✔️ Fully custom multi-agent system</li>
                <li>✔️ Trained on your own materials (PDFs, docs, etc.)</li>
                <li>✔️ Advanced analytics dashboard</li>
                <li>✔️ Dedicated developer collaboration</li>
                <li>✔️ Custom branding + domain setup</li>
                <li>✔️ Complete code & API handover</li>
              </ul>
            </div>
            <Link href="/contact">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 
                                text-white py-2.5 px-6 rounded-xl font-medium shadow-md 
                                hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 
                                transition-all duration-300 mt-8 mx-auto">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>

        {/* Close button */}
        <X
          onClick={onCloseAction}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 w-7 h-7 cursor-pointer transition"
        />
      </div>
    </div>
  );
}