"use client";

import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { client } from "@/sanity/lib/client";

interface Course {
  _id: string;
  title: string;
  platform: string;
  image: string;
  link: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "course"]{
            _id,
            title,
            platform,
            "image": image.asset->url,
            link
          } | order(_createdAt desc)
        `);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900">
          Explore <span className="text-blue-600">Top Courses</span>
        </h2>
        <p className="text-slate-600 mt-3">
          Learn from world-class platforms like Coursera — and let AI summarize
          your lessons in seconds.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-slate-500">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-slate-500">
          No courses added yet. Please check back soon.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              title={course.title}
              platform={course.platform}
              image={course.image}
              link={course.link}
            />
          ))}
        </div>
      )}
    </div>
  );
}
