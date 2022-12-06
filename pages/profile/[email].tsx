/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import type { NextPage } from 'next';
import { useState } from 'react';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '../../lib/prisma';

const Profile: NextPage = ({ profile, session, category }: any) => {
  const [bio, setBio] = useState(profile?.profile?.bio);
  function editBio(e: any) {
    fetch('/api/profile/upsertprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: profile?.id,
        bio: e.target.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBio(data.profile.bio);
      });
  }
  return (
    <>
      <Link href="/dashboard">
        <span className="btn-primary btn m-3">Dashboard</span>
      </Link>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center">
          <Image
            className="mt-2 h-32 w-32 rounded-full"
            src={profile?.image}
            alt="profile"
            width={128}
            height={128}
          />
          <h1 className="text-center text-2xl font-bold">{profile?.name}</h1>
          <h2 className="text-center text-xl font-bold">
            {/* Map over the categories */}
            {profile?.profile?.category.map((cats: any) => (
              <span key={cats.id}>{cats.name}</span>
            ))}
          </h2>
          <p className="text-center">{bio}</p>
        </div>
      </div>

      {/* if session email and profile email the same, make textbox to edit username and bio and make dropdown to add category */}
      {session?.user?.email?.toLowerCase() === profile?.email ? (
        <div className="flex flex-col justify-center">
          <h1 className="mt-5 text-center text-2xl font-bold">Edit Profile</h1>
          <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-center">
              <label htmlFor="bio">Bio</label>
              <textarea
                className="rounded-lg border-2 border-gray-300 p-2"
                name="bio"
                id="bio"
                defaultValue={profile?.profile?.bio}
                onChange={(e) => editBio(e)}
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="category">Category</label>
              <select
                className="rounded-lg border-2 border-gray-300 p-2"
                name="category"
                id="category"
                onChange={(e) => {
                  fetch('/api/profile/updatecategory', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userId: profile?.id,
                      categoryId: e.target.value,
                    }),
                  }).then((res) => res.json());
                }}
              >
                <option value="">Select Category</option>
                {/* Map over the categories */}
                {category.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : (
        <span />
      )}
    </>
  );
};

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
      id: true,
      name: true,
      image: true,
      email: true,
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

  const category = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return {
    props: {
      profile,
      session,
      category,
    },
  };
};

// @ts-ignore - Can not generate type for Home Export
