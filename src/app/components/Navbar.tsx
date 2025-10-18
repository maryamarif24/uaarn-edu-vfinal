"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">UAARN</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 text-slate-700 font-medium">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <Link href="/about" className="hover:text-blue-600 transition">About</Link>
        <Link href="/courses" className="hover:text-blue-600 transition">Courses</Link>
        <Link href="/ask" className="hover:text-blue-600 transition">Ask AI</Link>
        <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>

        {isSignedIn ? (
          <div className="ml-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <SignInButton mode="modal" fallbackRedirectUrl="/role-selection" forceRedirectUrl="/role-selection">
            <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-slate-700"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-slate-200 shadow-md flex flex-col items-center py-5 space-y-4 text-slate-700 font-medium md:hidden transition-all">
          <Link href="/" className="hover:text-blue-600" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" className="hover:text-blue-600" onClick={() => setOpen(false)}>About</Link>
          <Link href="/courses" className="hover:text-blue-600" onClick={() => setOpen(false)}>Courses</Link>
          <Link href="/ask" className="hover:text-blue-600" onClick={() => setOpen(false)}>Ask AI</Link>
          <Link href="/contact" className="hover:text-blue-600" onClick={() => setOpen(false)}>Contact</Link>

          {/* Auth Section (Responsive) */}
          <div className="pt-3 border-t border-slate-200 w-10/12 text-center">
            {isSignedIn ? (
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal" fallbackRedirectUrl="/role-selection" forceRedirectUrl="/role-selection">
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
