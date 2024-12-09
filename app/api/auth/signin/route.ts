import { authenticateWithPassport } from "@/app/auth/signin/actions";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { kv } from '@/lib/kv'

export async function POST(request: NextRequest) {
  const { account, password } = await request.json();

  try {
    const isAuthenticated = await authenticateWithPassport(account, password);

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Invalid account or password' }, { status: 401 })
    }

    const ticket = uuidv4();
    await kv.set(`auth:${ticket}`, { account }, { ex: 60 * 5 }); // 5 minutes

    return NextResponse.json({ ticket });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}