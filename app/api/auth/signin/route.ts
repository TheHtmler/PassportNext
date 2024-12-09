import { authenticateWithPassport } from "@/app/auth/signin/actions";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const authorizationTickets = new Map();

export async function POST(request: NextRequest) {
  const { account, password } = await request.json();

  try {
    const isAuthenticated = await authenticateWithPassport(account, password);

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Invalid account or password' }, { status: 401 })
    }

    const ticket = uuidv4();
    authorizationTickets.set(ticket, {
      account,
      timestamp: Date.now(),
    });

    return NextResponse.json({ ticket });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}