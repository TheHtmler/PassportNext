import { getTokenFromPassport } from "@/app/auth/signin/utils";
import { kv } from '@/lib/kv';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { ticket } = await request.json();

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not provided' }, { status: 400 })
  }

  const authInfo = await kv.get(`auth:${ticket}`) as { account: string } | null;
  console.log(authInfo, 'authInfo')

  if (!authInfo) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 401 })
  }

  kv.del(`auth:${ticket}`);

  try {
    const token = await getTokenFromPassport(authInfo.account);

    return NextResponse.json({ token });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
