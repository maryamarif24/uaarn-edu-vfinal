"use client";
import CourseCard from "../components/CourseCard";

export default function CoursesPage() {
  const courses = [
    {
      id: "graphics-designing",
      title: "Graphics Designing",
      platform: "Youtube",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/038/940/906/small_2x/ai-generated-graphic-design-workspace-with-colorful-illustration-photo.jpeg",
      link: "https://www.youtube.com/playlist?list=PLK1_9VA534IhRtQJYOtvN92Kb6T6vim7I",
    },
    {
      id: "python-beginners",
      title: "Python for Beginners",
      platform: "Youtube",
      image:
        "https://media.brightdata.com/2025/03/Data-Analysis-With-Python.svg",
      link: "https://youtu.be/UrsmFxEIp5k",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      platform: "Youtube",
      image:
        "https://media.istockphoto.com/id/1334591614/photo/man-using-digital-tablet-online-connect-to-internet-banking-currency-exchange-online-shopping.jpg?s=612x612&w=0&k=20&c=nejA5SuHcN2fAdO7Bkaf9pJrwzyLPBCyOLZgMaslGko=",
      link: "https://youtu.be/XuUbLHIRyuM",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-20 px-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900">
          Explore <span className="text-blue-600">Top Courses</span>
        </h2>
        <p className="text-slate-600 mt-3">
          Learn from world-class platforms like Coursera — and let AI summarize
          your lessons in seconds.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
