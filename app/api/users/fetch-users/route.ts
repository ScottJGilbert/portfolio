import { NextRequest, NextResponse } from "next/server";
import { fetchUsers } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const {
      query,
      ids,
      useQuery,
    }: { query?: string; ids?: string[]; useQuery: boolean } = await req.json();

    const users = await fetchUsers(ids, query, useQuery);

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.log("Error fetching users: ", err);
    return NextResponse.json(
      {
        error:
          "Internal server error: " +
          (err instanceof Error ? err.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}
