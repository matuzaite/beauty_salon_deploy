import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const services = await prisma.services.findMany();
  return NextResponse.json(services);
}
