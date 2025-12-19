import { fetchResumeURL } from "@/lib/db";

export const revalidate = 1800; // Revalidate every 30 minutes

export async function GET() {
  // Return static PDF that is revalidated every 30 minutes
  const resumeURL = await fetchResumeURL();

  const pdfResponse = await fetch(resumeURL);
  if (!pdfResponse.ok) {
    return new Response(
      "Failed to fetch resume PDF: " + pdfResponse.statusText,
      { status: 500 }
    );
  }

  const pdfBlob = await pdfResponse.blob();
  return new Response(pdfBlob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=resume.pdf",
    },
  });
}
