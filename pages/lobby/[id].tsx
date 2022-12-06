/* eslint-disable react/jsx-no-bind */
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';
import Hero from '../../components/lobby/Hero';
import Navbar from '../../components/lobby/Navbar';

const Lobby: NextPage = ({ lobbydata, user }: any) => (
  <div>
    <Navbar image={user?.image} page="Lobby" />
    <Hero name={lobbydata?.name} description={lobbydata?.description} />
  </div>
);

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

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email?.toLowerCase(),
    },
    select: {
      image: true,
    },
  });

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
      user,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
