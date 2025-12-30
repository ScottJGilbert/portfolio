"use client";

import { UploadButton } from "@/lib/uploadthing";

interface UploadResult {
  name: string;
  ufsUrl: string;
}

export default function Upload({
  onComplete,
}: {
  onComplete?: (data: UploadResult) => void;
}) {
  return (
    <UploadButton
      className="ut-button:p-4 ut-button:m-2 ut-button:bg-red-500 ut-button:hover:bg-red-600 ut-button:hover:cursor-pointer ut-button:ut-readying:bg-red-500/50"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed!");
        if (onComplete)
          onComplete({ name: res[0].name, ufsUrl: res[0].ufsUrl });
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      content={{
        button({ ready, isUploading }) {
          if (ready) return <div>{"Upload Image (4MB)"}</div>;
          if (isUploading) return "Uploading...";
          return "Loading...";
        },
        allowedContent() {
          return <></>;
        },
      }}
    />
  );
}
