import prisma from "@/lib/prisma";

const safeJson = (data) =>
  JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

export async function GET() {
  try {
    const services = await prisma.services.findMany({
      orderBy: { id: "asc" },
    });
    return Response.json(safeJson(services));
  } catch (err) {
    console.error("API /services error:", err);
    return new Response("Server error", { status: 500 });
  }
}
