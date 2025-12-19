"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Release } from "@/lib/definitions";
import Button from "@/app/ui/button";
import { useUploadThing } from "@/lib/uploadthing";

export default function UploadRelease({ project_id }: { project_id: number }) {
  const { startUpload } = useUploadThing("fileUploader", {
    onClientUploadComplete: async () => {
      // Callback fired on the client side after the upload is complete
      // You can add logic here to save the file URL to your database
    },
    onUploadError: (error) => {
      // Handle errors here
      alert(`ERROR! ${error.message}`);
    },
    // Optional: Add other callbacks like onUploadProgress, etc.
  });

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [releases, setReleases] = useState<Release[]>([]);

  const blankRelease: Release = {
    key: "",
    project_id: project_id,
    version: "",
    release_date: new Date(),
    text: "",
    external: false,
    url: "",
  };

  const [formData, setFormData] = useState(blankRelease);

  const updateFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const deleteRelease = async (key: string) => {
    const response = await fetch(`/api/delete-release`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: key }),
    });
    const data = await response.json();
    if (response.ok) {
      fetchReleases();
      alert("Release deleted successfully!");
    } else {
      console.error("Failed to delete release:", data.error);
    }
  };

  const fetchReleases = useCallback(async () => {
    const response = await fetch(
      `/api/fetch-releases?project_id=${project_id}`
    );
    const data = await response.json();
    if (response.ok) {
      setReleases(data as Release[]);
    } else {
      console.error("Failed to fetch releases:", data.error);
    }
  }, [project_id]);

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  return (
    <>
      <ul>
        {releases &&
          releases.map((release) => (
            <li key={release.key}>
              {release.version} -{" "}
              {new Date(release.release_date).toDateString()} - {release.text}
              <Button
                className="bg-red-500 text-white"
                onClick={() => deleteRelease(release.key)}
              >
                Delete
              </Button>
            </li>
          ))}
      </ul>
      <h1>Upload Release</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (
            inputFileRef.current?.files?.length &&
            inputFileRef.current.files.length > 0
          ) {
            const file = inputFileRef.current.files[0];

            const newBlob = await startUpload([file]);

            if (!newBlob) {
              console.error("No blob returned from startUpload");
              return;
            }

            formData.url = newBlob[0].ufsUrl;
            formData.key = newBlob[0].key;
          } else {
            if (formData.url === "") {
              alert("Please select a file to upload or provide a URL.");
              return;
            }
          }

          const response = await fetch("/api/upload-release", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            const error = await response.json();
            console.error("Failed to upload release:", error);
            return;
          }

          setFormData(blankRelease);
          fetchReleases();

          alert("Release uploaded successfully!");
        }}
        className="flex gap-2"
      >
        <div>
          <input name="file" ref={inputFileRef} type="file" />

          <input
            name="url"
            type="text"
            value={formData.url}
            placeholder="url"
            onChange={updateFormData}
          />
          <input
            name="version"
            type="text"
            placeholder="version"
            required
            value={formData.version}
            onChange={updateFormData}
          />
          <input
            name="release_date"
            type="date"
            placeholder="release date"
            required
            value={formData.release_date.toISOString().split("T")[0]}
            onChange={updateFormData}
            suppressHydrationWarning
          />
          <input
            name="text"
            type="text"
            placeholder="text"
            required
            value={formData.text}
            onChange={updateFormData}
          />
          <input
            name="external"
            type="checkbox"
            id="external"
            checked={formData.external}
            onChange={updateFormData}
          />
          <label htmlFor="external">External Link</label>
        </div>
        <button
          type="submit"
          className="p-2 rounded-md bg-[var(--background-secondary)] border-1 border-[var(--border)] inline-flex justify-center items-center gap-4 max-w-[90vw] shrink-0 hover:bg-[var(--background-tertiary)] hover:cursor-pointer"
        >
          Upload
        </button>
      </form>
    </>
  );
}
