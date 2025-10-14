export default function AboutPage() {
  return (
    <div className=" bg-slate-50 px-6 py-24 flex justify-center">
      <div className="max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-10">About <span className="text-blue-600">UAARN</span> </h2>
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
    </div>
  );
}
