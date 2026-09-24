import { NextResponse, type NextRequest } from "next/server";
import {
  recruiterLinks,
  RECRUITER_COOKIE_MAX_AGE_SECONDS,
  RECRUITER_COOKIE_NAME,
} from "@/lib/recruiter-links";

/**
 * Vanity recruiter-tracking redirect: /r/<code> -> / with a first-party
 * cookie recording the code's categories. Unknown codes still redirect home
 * (no 404), so a typo'd QR code / printed link doesn't dead-end a visitor.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const categories = recruiterLinks[code.toLowerCase()];

  const response = NextResponse.redirect(new URL("/", request.url));

  if (categories && categories.length > 0) {
    response.cookies.set(RECRUITER_COOKIE_NAME, categories.join(","), {
      maxAge: RECRUITER_COOKIE_MAX_AGE_SECONDS,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  return response;
}
