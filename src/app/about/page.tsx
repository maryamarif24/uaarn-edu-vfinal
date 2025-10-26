import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";


export default function AboutPage() {
  return (
    <div className=" bg-slate-100 px-6 py-24 items-center flex flex-col w-full justify-between">
      <div className="max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-10">About <Link href="/"><span className="text-blue-600">UAARN</span></Link> </h2>
        <p className="text-slate-700 leading-relaxed text-lg">
          UAARN is an AI-powered educational platform designed to make learning
          faster, smarter, and more interactive. Whether you&apos;re preparing for
          exams or exploring new topics, UAARN provides instant, detailed
          explanations powered by advanced AI.
        </p>
        <p className="mt-6 text-slate-700 leading-relaxed">
          Our mission is to democratize education through technology — helping
          every learner access knowledge and clarity instantly.
        </p>
      </div>
      <div className="flex flex-col mt-10">
        <p className="text-3xl font-bold">Follow us on <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Social Media</span></p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <Link
          href="https://www.instagram.com/nexa_agent?igsh=MTEzN3czNTE5bGU1bg=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-600 text-5xl"
          >
            <FaInstagram/>
          </Link>
          <Link
          href="https://www.facebook.com/share/17H4xyDp2q/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 text-5xl"
          >
            <FaFacebook/>
          </Link>
          <Link
          href="https://x.com/nexa_agent25?t=tYNR4gXPgf46FWOUEI8FCA&s=09"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-700 hover:text-slate-900 text-5xl"
          >
            <FaTwitter/>
          </Link>
          <Link
          href="https://www.linkedin.com/company/nexa-agent/ "
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500 text-5xl"
          >
            <FaLinkedin/>
          </Link>
          </div>
      </div>
    </div>
  );
}
