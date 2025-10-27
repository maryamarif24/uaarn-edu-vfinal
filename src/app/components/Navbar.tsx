"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import UpgradeButton from "./upgradeButton";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="text-3xl font-bold text-blue-600">
        UAARN
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 text-slate-700 text-lg">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <Link href="/about" className="hover:text-blue-600 transition">About</Link>
        <Link href="/courses" className="hover:text-blue-600 transition">Courses</Link>
        <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
        <Link href="/role-selection" className="hover:text-blue-600 transition">Dashboard</Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* ✅ UpgradeButton visible on all screens */}
        <UpgradeButton />

        {/* Auth buttons only for desktop */}
        <div className="hidden md:flex">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton
              mode="modal"
            >
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-slate-200 shadow-md flex flex-col items-center py-6 space-y-4 text-slate-700 font-medium md:hidden transition-all">
          <Link href="/" className="hover:text-blue-600" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" className="hover:text-blue-600" onClick={() => setOpen(false)}>About</Link>
          <Link href="/courses" className="hover:text-blue-600" onClick={() => setOpen(false)}>Courses</Link>
          <Link href="/contact" className="hover:text-blue-600" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/role-selection" className="hover:text-blue-600" onClick={() => setOpen(false)}>Dashboard</Link>

          {/* ✅ UpgradeButton visible inside mobile menu too (for consistent UX) */}
          <div className="pt-2">
            <UpgradeButton />
          </div>

          {/* Auth Section (Mobile only) */}
          <div className="pt-3 border-t border-slate-200 w-10/12 text-center">
            {isSignedIn ? (
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton
                mode="modal"
              >
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}