/* eslint-disable vars-on-top */
// Add typescript ignore to entire file
// @ts-nocheck
import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line prettier/prettier
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// eslint-disable-next-line import/prefer-default-export
export const prisma =
  global.prisma ||
  new PrismaClient({});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
// eslint-disable-next-line import/prefer-default-export
