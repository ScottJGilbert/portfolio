import { UTApi } from "uploadthing/server";
import { NextRequest, NextResponse } from "next/server";
import { ImageData } from "@/lib/definitions";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const query = params.get("query") || "";

  const utApi = new UTApi();

  try {
    const images = (await utApi.listFiles()).files;
    const filteredImages = images.filter(
      (image) =>
        (image.name.toLowerCase().includes(query.toLowerCase()) ||
          image.key.toLocaleLowerCase().includes(query.toLowerCase())) &&
        !image.name.includes(".pdf")
    );

    const imagesData: ImageData[] = filteredImages.map((img) => ({
      key: img.key,
      name: img.name,
      url: "https://" + process.env.UPLOADTHING_APP_ID + ".ufs.sh/f/" + img.key,
    }));

    return NextResponse.json({ images: imagesData });
  } catch (err) {
    console.log("Error fetching images: ", err);
    return NextResponse.json(
      { error: ("Failed to fetch images: " + err) as string },
      { status: 500 }
    );
  }
}
