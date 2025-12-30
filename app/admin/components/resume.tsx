"use client";

import { UploadDropzone } from "@/lib/uploadthing";

export default function ResumeUpload() {
  return (
    <div className="mt-4">
      <h2>Upload New Resume</h2>
      <UploadDropzone
        className="py-8 bg-[var(--background-tertiary)] ut-label:text-lg"
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed!");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
