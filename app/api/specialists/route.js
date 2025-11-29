import prisma from "@/lib/prisma";
export const runtime = 'nodejs';

async function withRetry(fn, { attempts = 3, delayMs = 500 } = {}) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i < attempts - 1) await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw lastErr;
}

export async function GET() {
  try {
    const specialists = await withRetry(() => prisma.specialists.findMany());
    return Response.json(specialists);
  } catch (error) {
    console.error("API /specialists error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
