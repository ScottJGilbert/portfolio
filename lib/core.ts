import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";
import { addImage } from "./db";
import { ImageData } from "./definitions";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const session = await auth();

      // This code runs on your server before upload
      const email = session?.user?.email as string;

      // If you throw, the user will not be able to upload
      if (email !== "scott7gilbert@gmail.com")
        throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { email: email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for email:", metadata.email);

      console.log("file url", file.ufsUrl);

      const data: ImageData = {
        name: file.name,
        url: file.ufsUrl,
      };

      addImage(data);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
