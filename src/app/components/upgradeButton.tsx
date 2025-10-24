"use client";

import { useState } from "react";
import PlansModal from "./PlansModal";

export default function UpgradeButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="border bg-gradient-to-r from-blue-500 via-purple-700 to-pink-700 p-2 text-white font-sans text-xl rounded-3xl border-white shadow-2xl shadow-slate-300 hover:cursor-pointer hover:bg-gradient-to-r hover:from-blue-300 hover:via-purple-500 hover:to-pink-500"
      >
        Upgrade
      </button>

      {showModal && <PlansModal onCloseAction={() => setShowModal(false)} />}
    </>
  );
}
