/* eslint-disable react/jsx-no-bind */
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../lib/prisma';
import Navbar from '../components/app/Navbar';
import Lobbyboard from '../components/app/Lobbyboard';
import Introducelobby from '../components/app/IntroduceLobby';
import Card from '../components/app/Card';
import Friendcard from '../components/app/Friendcard';

const Home: NextPage = ({ user }: any) => {
  function leaveLobby() {
    fetch('/api/user/setlobby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lobby: null,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      });
  }

  return (
    <>
      <Navbar
        image={user?.image}
        assigned={user?.lobby}
        page="Dashboard"
        email={user?.email}
      />
      {/* center of page */}
      <div className="flex flex-row justify-center py-2">
        {user?.lobby === null ? (
          <Introducelobby />
        ) : (
          <Lobbyboard
            name={user?.lobby?.name}
            description={user?.lobby?.description}
            id={user?.lobby?.id}
            leave={leaveLobby}
          />
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card profiles={user?.followers} title="Followers" />
        <Card profiles={user?.following} title="Following" />
        <Friendcard friends={user?.userFriends} title="Friends" />
      </div>
    </>
  );
};

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
      email: true,
      lobby: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
      following: {
        select: {
          name: true,
          image: true,
          id: true,
          email: true,
        },
      },
      followers: {
        select: {
          name: true,
          image: true,
          id: true,
          email: true,
        },
      },
      userFriends: {
        select: {
          id: true,
          status: true,
          friend: {
            select: {
              name: true,
              image: true,
              email: true,
              id: true,
            },
          },
        },
      },
      profile: {
        select: {
          category: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
      _count: {
        select: { followers: true, following: true },
      },
    },
  });

  return {
    props: {
      user,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
Home.auth = true;
