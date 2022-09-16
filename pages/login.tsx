import { signIn, getSession } from 'next-auth/react';
import type { NextPage } from 'next';

const Login: NextPage = () => (
  <>
    <button onClick={() => signIn('google')}>Sign in with Google</button>
    <button onClick={() => signIn('github')}>Sign in with Github</button>
  </>
);

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default Login;
