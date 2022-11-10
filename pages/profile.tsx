import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { prisma } from '../lib/prisma';

function updateBio(userIdIn: String, bioIn: String) {
  fetch('/api/profile/upsertprofile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userIdIn,
      bio: bioIn,
    }),
  }).then((res) => res.json());
}

function updateUser(userIdIn: String, nameIn: String) {
  fetch('/api/user/updatename', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: userIdIn,
      name: nameIn,
    }),
  }).then((res) => res.json());
}

const Home: NextPage = ({ user, profile }: any) => {
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(profile?.bio);

  useEffect(() => {
    updateBio(user?.id, bio);
  }, [bio, user?.id]);

  useEffect(() => {
    updateUser(user?.id, name);
  }, [name, user?.id]);

  if (profile?.id == null) {
    updateBio(user?.id, bio);
  }
  return (
    // Form to update user profile
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gray-100">
          <Image
            src={user?.image}
            alt="Picture of the author"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <h1 className="mt-3 text-4xl font-bold">{user?.name}</h1>
        <p className="mt-3 text-2xl font-bold">{user?.email}</p>
        <div className="mt-3">
          <h1 className="block text-sm font-medium text-gray-700">Name</h1>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3">
          <h1 className="block text-sm font-medium text-gray-700">Bio</h1>
          <div className="mt-1">
            <textarea
              id="bio"
              name="bio"
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// Get User profile data from prisma
export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email?.toLowerCase(),
    },
  });

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user?.id,
    },
  });

  return {
    props: {
      user,
      profile,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
Home.auth = true;
