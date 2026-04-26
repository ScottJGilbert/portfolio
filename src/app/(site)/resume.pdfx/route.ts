export const revalidate = 1800; // Revalidate every 30 minutes

export async function GET() {
  // const backend = process.env.DATABASE_URL || "https://scottgilbert.dev/";

  const pdfResponse = await fetch(`/resume.pdf`);

  if (!pdfResponse.ok) {
    return new Response(
      "Failed to fetch resume PDF: " + pdfResponse.statusText,
      { status: 500 },
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
