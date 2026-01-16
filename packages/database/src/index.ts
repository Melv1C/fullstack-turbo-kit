import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, type Prisma } from '@repo/database/generated/prisma/client';
import dotenv from 'dotenv';

// Ensure DATABASE_URL is available regardless of import order
dotenv.config({ path: '../../packages/database/.env' });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export type { Prisma };
