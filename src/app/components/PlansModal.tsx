"use client";

import Link from "next/link";

export default function PlansModal({ onCloseAction }: { onCloseAction: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl px-18 py-8 w-[80%] justify-between items-center relative">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800 font-sans my-4">Choose Your Plan</h2>

        <div className="space-x-4 flex mb-10">
          <div className="w-[35%] border-2 px-6 py-8 rounded-lg hover:shadow-md hover:bg-slate-100 transition hover-lift">
            <h3 className="font-bold text-3xl font-serif mb-4 text-center">Free Plan</h3>
            <p className="mb-5 text-[1.1rem] text-green-500 text-center">$0/month – Ideal for individuals</p>
            <p>
              ✔️ Access to basic AI tutoring <br/>
              ✔️ Up to 5 lessons per week <br/>
              ✔️ Basic progress tracking <br/>
              ✔️ Community support
              <br/>
              <Link href="/sign-in">
                <button className="hover:cursor-pointer mt-5 border bg-blue-600 text-white p-2 text-center rounded-2xl w-[50%]">Get Started</button>
              </Link>
            </p>
          </div>
          <div className="w-[35%] border-2 px-6 py-8 rounded-lg hover:shadow-md hover:bg-slate-100 transition hover-lift">
            <h3 className="font-bold text-3xl font-serif mb-4 text-center">Pro Plan</h3>
            <p className="mb-5 text-[1.1rem] text-green-500 text-center">$10/month – For Students & Teachers</p>
            <p>
              ✔️ Unlimited AI tutoring sessions <br/>
              ✔️ Advanced progress analytics <br/>
              ✔️ Custom learning paths <br/>
              ✔️ Priority email support <br/>
              ✔️ Export reports <br/>
              ✔️ Ad-free experience <br/>
              ✔️ Offline lesson access <br/>
              ✔️ Personalized recommendations <br/>
              <br/>
              <button className="hover:cursor-pointer mt-5 border bg-blue-600 text-white p-2 text-center rounded-2xl w-[50%]">Start Free Trial</button>
            </p>
          </div>
          <div className="w-[35%] border-2 px-6 py-8 rounded-lg hover:shadow-md hover:bg-slate-100 transition hover-lift">
            <h3 className="font-bold text-3xl font-serif mb-4 text-center">Enterprise</h3>
            <p className="mb-5 text-[1.1rem] text-green-500 text-center">Custom solutions for large organizations</p>
            <p>
              ✔️ Unlimited everything <br/>
              ✔️ Dedicated account manager <br/>
              ✔️ Custom integrations <br/>
              ✔️ Advanced analytics dashboard <br/>
              ✔️ SSO & SAML support <br/>
              ✔️ 24/7 phone support <br/>
              ✔️ Custom branding <br/>
              ✔️ API access <br/>
              <br/>
              <button className="hover:cursor-pointer mt-5 border bg-blue-600 text-white p-2 text-center rounded-2xl w-[50%]">Contact Sales</button>
            </p>
          </div>
        </div>

        <button
          onClick={onCloseAction}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-2xl m-4 hover:cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
