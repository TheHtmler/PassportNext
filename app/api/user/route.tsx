import { getUserFromPassport } from "@/app/auth/signin/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 })
  }

  try {
    const user = await getUserFromPassport(token);

    return NextResponse.json(user);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

}
