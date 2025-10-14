"use client";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  platform: string;
  image: string;
  link: string;
}

export default function CourseCard({
  title,
  platform,
  image,
  link,
}: CourseCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={800}
        height={400}
        className="w-full h-48 object-cover"
        unoptimized
      />
      <div className="p-6 text-left">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 mb-4">{platform}</p>
        <div className="flex justify-between">
          <a
            href={link}
            target="_blank"
            className="text-blue-600 font-medium hover:underline"
          >
            View Course
          </a>
          <Link
            href={`/summarize?link=${encodeURIComponent(link)}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
            Summarize
        </Link>
        </div>
      </div>
    </div>
  );
}
