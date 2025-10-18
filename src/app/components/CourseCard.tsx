"use client";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  platform: string;
  image?: any;
  link: string;
}

export default function CourseCard({ title, platform, image }: CourseCardProps) {
  let imageUrl = "/placeholder.png";

  if (typeof image === "string") {
    imageUrl = image;
  } else if (image?.asset?._ref) {
    // build Sanity image URL manually
    const projectId = "f3hh12vm"; // your Sanity project ID
    const ref = image.asset._ref.replace("image-", "").replace("-jpg", ".jpg");
    imageUrl = `https://cdn.sanity.io/images/${projectId}/production/${ref}`;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        width={800}
        height={400}
        className="w-full h-48 object-cover"
        unoptimized
      />
      <div className="p-6 text-left">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 mb-4">{platform}</p>
        <div className="flex justify-center">
          <Link
            href={`/courses/${encodeURIComponent(
              title.toLowerCase().replace(/\s+/g, "-")
            )}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
