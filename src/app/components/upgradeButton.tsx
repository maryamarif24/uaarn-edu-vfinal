"use client";

import { useState } from "react";
import PlansModal from "./PlansModal";
import { Crown } from "lucide-react";

export default function UpgradeButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="relative inline-flex items-center gap-2 px-5 py-2.5 
                   rounded-full border border-white bg-gradient-to-r 
                   from-blue-500 via-purple-700 to-pink-700 
                   text-white font-semibold text-base tracking-wide
                   shadow-lg shadow-slate-300 transition-all duration-300 
                   hover:shadow-xl hover:scale-105 
                   hover:from-blue-400 hover:via-purple-600 hover:to-pink-600 
                   focus:outline-none focus:ring-2 focus:ring-purple-300"
      >
        <Crown size={18} className="text-yellow-300 drop-shadow-sm" />
        <span>Pricing</span>

        {/* Glow effect */}
        <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
      </button>

      {showModal && <PlansModal onCloseAction={() => setShowModal(false)} />}
    </>
  );
}