import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await auth.getUser(req);
  return NextResponse.json({ user });
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await auth.signIn(email, password);
  return NextResponse.json({ user });
}

export async function DELETE(req: NextRequest) {
  await auth.signOut(req);
  return NextResponse.json({ message: "Signed out successfully" });
}