import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import type { NextPage } from 'next';

/*
    <button onClick={() => signIn('google')}>Sign in with Google</button>
    <button onClick={() => signIn('github')}>Sign in with Github</button>
*/
const Login: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);
  return (
    <div className="grid h-screen place-items-center">
      <div className="w-96 bg-base-100 shadow-xl">
        <figure className="flex justify-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={150}
              height={150}
              className="btn-ghost rounded-lg object-contain"
            />
          </Link>
        </figure>
        <div className="card-body items-center">
          <button
            className="btn-active btn w-72 bg-base-100"
            onClick={() => signIn('google')}
          >
            <span className="pr-3">
              <Image
                src="/loginAssets/google.svg"
                alt="google login"
                width="32"
                height="32"
              />
            </span>
            <h1 className="prose prose-stone"> Sign In With Google</h1>
          </button>
          <button
            className="btn-active btn w-72 bg-base-100"
            onClick={() => signIn('github')}
          >
            <span className="pr-3">
              <Image
                src="/loginAssets/github.svg"
                alt="google login"
                width="32"
                height="32"
              />
            </span>
            <h1 className="prose prose-stone"> Sign In With Github</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
