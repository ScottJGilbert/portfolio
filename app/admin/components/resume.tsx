"use client";

import { UploadDropzone } from "@/lib/uploadthing";

export default function ResumeUpload({ oldKey }: { oldKey?: string }) {
  const deleteOldResume = async () => {
    if (!oldKey) return;
    const res = await fetch("/api/images/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: oldKey }),
    });

    if (!res.ok) {
      console.error("Failed to delete old resume.");
    }
  };

  return (
    <div className="mt-4">
      <h2>Upload New Resume</h2>
      <UploadDropzone
        className="py-8 bg-[var(--background-tertiary)] ut-label:text-lg"
        endpoint="pdfUploader"
        onClientUploadComplete={() => {
          // Do something with the response
          deleteOldResume();
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
