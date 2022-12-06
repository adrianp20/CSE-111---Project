/* eslint-disable react/jsx-no-bind */
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';

const Profile: NextPage = ({ profile }: any) => <h1>{profile?.name}</h1>;

export default Profile;

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

  const profile = await prisma.user.findUnique({
    where: {
      email: context.params.email,
    },
    select: {
      name: true,
      image: true,
      profile: {
        select: {
          bio: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      profile,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
