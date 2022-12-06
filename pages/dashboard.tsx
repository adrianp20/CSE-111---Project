import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../lib/prisma';
import Navbar from '../components/app/Navbar';

const Home: NextPage = ({ user }: any) => (
  // Form to update user profile
  <Navbar image={user?.image} />
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
  });

  return {
    props: {
      user,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
Home.auth = true;
