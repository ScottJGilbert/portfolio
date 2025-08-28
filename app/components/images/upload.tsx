"use client";

import { UploadButton } from "@/lib/uploadthing";

export default function Upload() {
  return (
    <div className="my-auto flex">
      <div className="m-auto p-8 rounded-2xl bg-green-950 border-solid border-gray-50 border-1">
        <h1 className="mb-1">Upload Image</h1>
        <hr></hr>
        <UploadButton
          className="mt-4 ut-button:p-4 ut-button:m-2 ut-button:bg-red-500 ut-button:hover:bg-red-600 ut-button:hover:cursor-pointer ut-button:ut-readying:bg-red-500/50"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <p className="text-center mt-2">SVG files not accepted.</p>
      </div>
    </div>
  );
}
