"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const courseData = {
  "graphics-designing": {
    title: "Graphics Designing",
    platform: "Youtube",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/038/940/906/small_2x/ai-generated-graphic-design-workspace-with-colorful-illustration-photo.jpeg",
    link: "https://www.youtube.com/playlist?list=PLK1_9VA534IhRtQJYOtvN92Kb6T6vim7I",
    description:
      "Learn the fundamentals of modern graphic design — including color theory, composition, typography, and professional design tools.",
  },
  "python-for-beginners": {
    title: "Python for Beginners",
    platform: "Youtube",
    image: "https://media.brightdata.com/2025/03/Data-Analysis-With-Python.svg",
    link: "https://youtu.be/UrsmFxEIp5k",
    description:
      "Master the basics of Python programming — from variables to loops — and start your coding journey with confidence.",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    platform: "Youtube",
    image:
      "https://media.istockphoto.com/id/1334591614/photo/man-using-digital-tablet-online-connect-to-internet-banking-currency-exchange-online-shopping.jpg?s=612x612&w=0&k=20&c=nejA5SuHcN2fAdO7Bkaf9pJrwzyLPBCyOLZgMaslGko=",
    link: "https://youtu.be/XuUbLHIRyuM",
    description:
      "Understand how to build, optimize, and grow digital marketing campaigns with SEO, content strategy, and social media marketing.",
  },
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const course =
  Object.entries(courseData).find(
    ([key]) => key.toLowerCase() === (id as string).toLowerCase()
  )?.[1];

  if (!course) {
    return (
      <div className="text-center py-20 text-slate-600">
        <h2 className="text-2xl font-semibold">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-20 px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
          unoptimized
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{course.title}</h1>
          <p className="text-slate-500 mb-4">{course.platform}</p>
          <p className="text-slate-600 mb-8 leading-relaxed">{course.description}</p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={course.link}
              target="_blank"
              className="bg-blue-100 text-blue-700 px-5 py-2 rounded-lg hover:bg-blue-200 transition"
            >
              View Course
            </a>
            <Link
              href={`/summarize?link=${encodeURIComponent(course.link)}`}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Summarize
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
