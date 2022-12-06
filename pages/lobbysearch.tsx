/* eslint-disable no-underscore-dangle */
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../lib/prisma';
import Navbar from '../components/app/Navbar';
import Card from '../components/lobbysearch/Card';

const Home: NextPage = ({ user, lobbylist }: any) => (
  // router
  <>
    <Navbar image={user?.image} assigned={null} page="Lobby Search" />
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {lobbylist.map((lobby: any) => (
          <Card
            title={lobby.name}
            description={lobby.description}
            count={lobby._count.users}
            id={lobby.id}
          />
        ))}
      </div>
    </div>
  </>
);
export default Home;

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

  const lobbylist = await prisma.lobby.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      category: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          users: true,
        },
      },
    },
  });

  console.log(lobbylist);
  return {
    props: {
      user,
      lobbylist,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
Home.auth = true;
