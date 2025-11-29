import prisma from "@/lib/prisma";
export const runtime = 'nodejs';

export async function GET() {
  try {
    const specialists = await prisma.specialists.findMany();
    return Response.json(specialists);
  } catch (error) {
    console.error("API /specialists error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
