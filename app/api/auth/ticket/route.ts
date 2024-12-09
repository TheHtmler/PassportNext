import { getTokenFromPassport } from "@/app/auth/signin/utils";
import { getGlobalAuthorizationTickets } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { ticket } = await request.json();

  const authorizationTickets = getGlobalAuthorizationTickets();
  console.log(authorizationTickets, '==authorizationTickets==')
  const authInfo = authorizationTickets.get(ticket);

  if (!authInfo) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 401 })
  }

  authorizationTickets.delete(ticket);

  try {
    const token = await getTokenFromPassport(authInfo.account);

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
