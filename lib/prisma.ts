// Add typescript ignore to entire file
// @ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
// eslint-disable-next-line import/prefer-default-export
export { prisma };
