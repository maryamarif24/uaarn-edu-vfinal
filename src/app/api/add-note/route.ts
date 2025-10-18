import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const result = await client.create({
      _type: "note",
      title: data.title,
      description: data.description,
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: data.fileAssetId,
        },
      },
      teacher: data.teacher,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error adding note:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add note" },
      { status: 500 }
    );
  }
}
