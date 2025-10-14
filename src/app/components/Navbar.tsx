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
      <h1 className="text-2xl font-bold text-blue-600">UAARN</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-slate-700 font-medium">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/about" className="hover:text-blue-600">About</Link>
        <Link href="/courses" className="hover:text-blue-600">Courses</Link>
        <Link href="/ask" className="hover:text-blue-600">Ask AI</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-slate-700"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-slate-200 shadow-md flex flex-col items-center py-4 space-y-3 text-slate-700 font-medium md:hidden">
          <Link href="/" className="hover:text-blue-600" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/ask" className="hover:text-blue-600" onClick={() => setOpen(false)}>Ask AI</Link>
          <Link href="/courses" className="hover:text-blue-600" onClick={() => setOpen(false)}>Courses</Link>
          <Link href="/about" className="hover:text-blue-600" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" className="hover:text-blue-600" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
      {isSignedIn ? <UserButton /> : <SignInButton />}
    </nav>
  );
}
