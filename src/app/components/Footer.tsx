import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-center py-6 px-4 border-t border-slate-300 text-slate-600 text-sm sm:text-base">
      © {new Date().getFullYear()} <Link href="/"><span className="font-medium text-blue-600">UAARN</span></Link> — Empowering Education with AI.
    </footer>
  );
}
