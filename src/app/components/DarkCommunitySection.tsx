import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DarkCommunitySection: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 text-blue-600">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-sans font-bold text-slate-900 mb-4">
            Join the <span className="text-blue-600">Community</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-7">
            <Link href="/">
              <span className="font-semibold hover:text-blue-600">UAARN </span>
            </Link>
            is the trusted website for learners.
          </p>
        </header>

        {/* Stats Boxes */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
          {/* Box 1 */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-2xl border border-slate-200 p-8 w-full md:w-1/3">
            <p className="font-sans text-lg sm:text-xl font-bold">
              Among 1% of Top Developers
            </p>
            <p className="text-4xl sm:text-5xl mt-5 font-extrabold text-black">
              487
            </p>
            <p>Stars on GitHub</p>
            <div className="flex items-center justify-center gap-4 mt-5">
              <a href="https://github.com/maryamarif24">
                <Image
                  src="/mrym.jpeg"
                  alt="Maryam"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </a>
              <a href="https://github.com/TahirahWebDev">
                <Image
                  src="/tahira.jpg"
                  alt="Tahirah"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </a>
              <a href="https://github.com/Mehak-Akram">
                <Image
                  src="/mehak.jpg"
                  alt="Mehak"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </a>
            </div>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-2xl border border-slate-200 p-8 w-full md:w-1/3">
            <p className="font-sans text-lg sm:text-xl font-bold">
              +50 Satisfied Users
            </p>
            <p className="text-4xl sm:text-5xl mt-5 font-extrabold text-black">
              50+
            </p>
            <p>Registered Users</p>
            <div className="bg-blue-600 px-5 py-2 mt-5 text-[1rem] font-sans rounded-2xl text-white hover:bg-blue-700 transition">
              <a href="/contact">Register Yourself</a>
            </div>
          </div>

          {/* Box 3 */}
          <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-2xl border border-slate-200 p-8 w-full md:w-1/3">
            <p className="font-sans text-lg sm:text-xl font-bold">
              500+ LinkedIn Followers
            </p>
            <p className="text-4xl sm:text-5xl mt-5 font-extrabold text-black">
              500+
            </p>
            <p>LinkedIn Followers</p>
            <div className="bg-blue-600 px-5 py-2 mt-5 text-[1rem] font-sans rounded-2xl text-white hover:bg-blue-700 transition">
              <a
                href="https://www.linkedin.com/company/nexa-agent/"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkCommunitySection;
