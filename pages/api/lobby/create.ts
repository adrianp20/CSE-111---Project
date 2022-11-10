// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import { unstable_getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth/[...nextauth]';

import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await unstable_getServerSession(req, res, authOptions);
  // if (session) {
  const data = req.body;
  const lobby = await prisma.lobby.create({
    data: {
      name: data.name,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
  });
  res.status(200).json({ lobby });
  // } else {
  //   res.status(401).json({
  //     error: 'You must be signed in',
  //   });
  // }
}
