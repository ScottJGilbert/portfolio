import { addMessage } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";

export async function POST(request: NextRequest) {
  return request.json().then(async (data) => {
    const { first_name, last_name, email, message } = data;
    data.message = sanitizeHtml(data.message);

    if (!first_name || !last_name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }
    try {
      await addMessage({ first_name, last_name, email, message });
      return new NextResponse("Message sent!", { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error: " + error },
        { status: 500 }
      );
    }
  });
}
