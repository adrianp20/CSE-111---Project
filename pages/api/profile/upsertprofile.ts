// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    const data = req.body;
    const profile = await prisma.profile.upsert({
      create: {
        userId: data.userId,
        bio: data?.bio,
      },
      update: {
        bio: data?.bio,
      },
      where: {
        userId: data.userId,
      },
    });
    res.status(200).json({ profile });
  } else {
    res.status(401).json({
      error: 'You must be signed in',
    });
  }
}
