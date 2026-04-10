import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma || new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DB_URL,
    })
});
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
