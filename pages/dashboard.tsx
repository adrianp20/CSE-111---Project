/* eslint-disable react/jsx-no-bind */
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../lib/prisma';
import Navbar from '../components/app/Navbar';
import Lobbyboard from '../components/app/Lobbyboard';
import Introducelobby from '../components/app/IntroduceLobby';
import Card from '../components/app/Card';

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
      <Navbar image={user?.image} assigned={user?.lobby} page="Dashboard" />
      {/* center of page */}
      <div className="flex flex-row justify-center py-2">
        {user?.lobby === null ? (
          <Introducelobby />
        ) : (
          <Lobbyboard
            name={user?.lobby?.name}
            description={user?.lobby?.description}
            leave={leaveLobby}
          />
        )}
      </div>

      {/* Grid divided by 3 */}
      <div className="grid grid-cols-3 gap-4">
        <Card profiles={user?.following} />
        <div className="col-span-1" />
        {/* Center */}
        <Card profiles={user?.following} />
        <div className="col-span-1" />
        {/* Right side */}
        <Card profiles={user?.following} />
        <div className="col-span-1" />
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
        },
      },
      _count: {
        select: { followers: true, following: true },
      },
    },
  });

  console.log(user);
  // Count number of followers
  return {
    props: {
      user,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
Home.auth = true;
