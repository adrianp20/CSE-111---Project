import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../lib/prisma';
import Navbar from '../components/app/Navbar';

const Home: NextPage = ({ user, lobbylist }: any) => (
  // Form to update user profile
  <>
    <Navbar image={user?.image} assigned={null} page="Lobby Search" />
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4">
        {lobbylist.map((lobby: any) => (
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{lobby.name}</h2>
              <p className="">{lobby.description}</p>
            </div>
          </div>
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
    },
  });

  console.log(lobbylist[0].category[0].name);
  return {
    props: {
      user,
      lobbylist,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
Home.auth = true;
