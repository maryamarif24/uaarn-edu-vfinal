import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.image) {
      throw new Error("No image provided");
    }

    // ✅ Upload image to Sanity asset library and get reference
    const uploadedImage = await client.assets.upload("image", await fetch(data.image).then(r => r.blob()), {
      filename: "course-image.jpg",
    });

    // ✅ Now store the image properly in the document
    const result = await client.create({
      _type: "course",
      title: data.title,
      platform: data.platform,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: uploadedImage._id,
        },
      },
      link: data.link,
      teacherEmail: data.teacherEmail,
    });

    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    console.error("Error adding course:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
