import { addMessage } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sendTime = cookieStore.get("sendTime");

  //If sendtime less than 10 minutes ago, block the request
  if (sendTime && Date.now() - parseInt(sendTime.value) < 5 * 60 * 1000) {
    return NextResponse.json(
      { error: "You can only send one message every 5 minutes." },
      { status: 429 }
    );
  }

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

      cookieStore.set("sendTime", Date.now().toString(), { path: "/" });

      return new NextResponse("Message sent!", { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error: " + error },
        { status: 500 }
      );
    }
  });
}
