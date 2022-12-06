/* eslint-disable react/jsx-no-bind */
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';

const Lobby: NextPage = ({ lobbydata }: any) => <h1>{lobbydata.name}</h1>;

export default Lobby;

// Get User profile data from prisma
export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  // if not logged in redirect to login page
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const lobbydata = await prisma.lobby.findUnique({
    where: {
      id: context.params.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      category: {
        select: {
          name: true,
        },
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return {
    props: {
      lobbydata,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
