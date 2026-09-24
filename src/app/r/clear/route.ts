import { NextResponse, type NextRequest } from "next/server";
import { RECRUITER_COOKIE_NAME } from "@/lib/recruiter-links";

/**
 * /r/clear — testing helper, not a recruiter link. Clears the
 * recruiter_categories cookie and redirects home, so featured-project
 * personalization can be reset without manually clearing browser cookies.
 * This literal route wins over the sibling /r/[code] catch-all, so "clear"
 * can never collide with a real recruiter code.
 */
export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete({ name: RECRUITER_COOKIE_NAME, path: "/" });
  return response;
}
