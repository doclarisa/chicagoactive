// Neon serverless driver adapter (WebSocket) so the client works in Vercel's
// serverless runtime. Pooled DATABASE_URL is correct here; the singleton
// guard prevents connection exhaustion during Next.js hot-reload.
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
