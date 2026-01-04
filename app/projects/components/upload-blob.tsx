"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Release } from "@/lib/definitions";
import Button from "@/app/ui/button";
import { useUploadThing } from "@/lib/uploadthing";

export default function UploadRelease({
  project_key,
}: {
  project_key: string;
}) {
  const { startUpload } = useUploadThing("fileUploader", {
    onClientUploadComplete: async () => {},
    onUploadError: (error) => {
      alert(`ERROR! ${error.message}`);
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [releases, setReleases] = useState<Release[]>([]);

  const blankRelease: Release = {
    key: "",
    project_key: project_key,
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
      [name]:
        type === "checkbox"
          ? checked
          : name === "release_date"
          ? new Date(value)
          : value,
    }));
  };

  const deleteRelease = async (key: string) => {
    const response = await fetch(`/api/releases/delete-release`, {
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
      `/api/releases/fetch-releases?project_key=${project_key}`
    );
    const data = await response.json();
    if (response.ok) {
      setReleases(data as Release[]);
    } else {
      console.error("Failed to fetch releases:", data.error);
    }
  }, [project_key]);

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  return (
    <div className="mt-8 mb-4 w-full flex justify-between">
      <div className="flex-1">
        <h2 className="text-center text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
          Releases
        </h2>
        <ul className="mb-6 flex flex-col gap-2">
          {releases &&
            releases.map((release) => (
              <li
                key={release.key}
                className="flex items-center justify-between bg-[var(--background-tertiary)] border border-[var(--border-secondary)] rounded-xl px-4 py-2"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                    {release.version}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {new Date(release.release_date).toDateString()}
                  </span>
                  <span className="text-zinc-700 dark:text-zinc-200">
                    {release.text}
                  </span>
                  {release.external && release.url && (
                    <a
                      href={release.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-xs mt-1"
                    >
                      External Link
                    </a>
                  )}
                </div>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg ml-4"
                  onClick={() => deleteRelease(release.key)}
                >
                  Delete
                </Button>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h2 className="text-center text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
          Upload New Release
        </h2>
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

            const response = await fetch("/api/releases/upload-release", {
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
          className="flex flex-col gap-4 bg-[var(--background-tertiary)] border border-[var(--border-secondary)] rounded-2xl p-6"
        >
          <div className="flex flex-col gap-3">
            <label className="font-medium text-zinc-800 dark:text-zinc-200">
              File Upload
              <input
                name="file"
                ref={inputFileRef}
                type="file"
                className="block mt-1 w-full px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              />
            </label>
            <label className="font-medium text-zinc-800 dark:text-zinc-200">
              Or URL
              <input
                name="url"
                type="text"
                value={formData.url}
                placeholder="URL"
                onChange={updateFormData}
                className="block mt-1 w-full px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              />
            </label>
            <label className="font-medium text-zinc-800 dark:text-zinc-200">
              Version
              <input
                name="version"
                type="text"
                placeholder="Version"
                required
                value={formData.version}
                onChange={updateFormData}
                className="block mt-1 w-full px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              />
            </label>
            <label className="font-medium text-zinc-800 dark:text-zinc-200">
              Release Date
              <input
                name="release_date"
                type="date"
                placeholder="Release Date"
                required
                value={formData.release_date.toISOString().split("T")[0]}
                onChange={updateFormData}
                suppressHydrationWarning
                className="block mt-1 w-full px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              />
            </label>
            <label className="font-medium text-zinc-800 dark:text-zinc-200">
              Description
              <input
                name="text"
                type="text"
                placeholder="Description"
                required
                value={formData.text}
                onChange={updateFormData}
                className="block mt-1 w-full px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              />
            </label>
            <div className="flex items-center gap-2 mt-2">
              <input
                name="external"
                type="checkbox"
                id="external"
                checked={formData.external}
                onChange={updateFormData}
                className="w-4 h-4 accent-blue-600"
              />
              <label
                htmlFor="external"
                className="text-zinc-800 dark:text-zinc-200"
              >
                External Link (Goes to Another Webpage)
              </label>
            </div>
          </div>
          <Button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors hover:cursor-pointer">
            Upload Release
          </Button>
        </form>
      </div>
    </div>
  );
}
