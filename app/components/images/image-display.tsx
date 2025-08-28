"use client";

import { useState, useEffect, Suspense } from "react";
import { ImageData } from "@/lib/definitions";
import Link from "next/link";
import Search from "../../ui/search";
import { fetchImages } from "@/lib/db";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ImageDisplay() {
  const [images, setImages] = useState([] as ImageData[]);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function getImages() {
      setImages(
        (await fetchImages(searchParams.get("query") || "")) as ImageData[]
      );
    }
    getImages();
  }, [searchParams]);

  return (
    <div>
      <div>
        <div className="mb-2">
          <h1>Images</h1>
        </div>
        <div className="flex gap-2">
          <Suspense>
            <Search placeholder="Search images..." />
          </Suspense>
          <Link
            href="/images/upload"
            className="p-2 rounded-xl bg-red-600 hover:cursor-pointer hover:bg-red-700"
          >
            + Upload New
          </Link>
        </div>
      </div>
      <div className="my-4">
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">
          {images.map((img) => (
            <div key={img.name + "image"}>
              <Image src={img.url} alt={img.name} width={160} height={160} />
              <p className="break-all">{img.name}</p>
              <p className="break-all">{img.url}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
