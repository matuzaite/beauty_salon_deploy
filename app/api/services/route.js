import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.services.findMany();
    return Response.json(services);
  } catch (error) {
    console.error("API /services error:", error);
    return new Response("Server error", { status: 500 });
  }
}
