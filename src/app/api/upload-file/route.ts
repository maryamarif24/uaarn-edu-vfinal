import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload asset to Sanity
    const uploaded = await client.assets.upload("file", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return NextResponse.json({
      assetId: uploaded._id,
      url: uploaded.url,
    });
  } catch (err) {
    console.error("File upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
