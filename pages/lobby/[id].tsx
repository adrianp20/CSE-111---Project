/* eslint-disable react/jsx-no-bind */
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { prisma } from '../../lib/prisma';
import Hero from '../../components/lobby/Hero';

const Lobby: NextPage = ({ lobbydata }: any) => (
  <>
    {/* Top Left button link to dashboard */}
    <Link href="/dashboard">
      <button className="btn-primary btn m-3">Dashboard</button>
    </Link>
    <Hero
      name={lobbydata?.name}
      description={lobbydata?.description}
      category={lobbydata.category}
    />
  </>
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
      email: true,
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
  console.log(lobbydata);
  return {
    props: {
      lobbydata,
      user,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
