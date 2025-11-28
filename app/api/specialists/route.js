import prisma from "@/lib/prisma";

const safeJson = (data) =>
  JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );

export async function GET() {
  try {
    const specialists = await prisma.specialists.findMany({
      orderBy: { id: "asc" },
    });
    return Response.json(safeJson(specialists));
  } catch (err) {
    console.error("API /specialists error:", err);
    return new Response("Server error", { status: 500 });
  }
}
