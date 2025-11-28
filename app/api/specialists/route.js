import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const specialists = await prisma.specialists.findMany();
  return NextResponse.json(specialists);
}
