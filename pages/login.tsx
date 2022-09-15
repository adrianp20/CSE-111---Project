import { getProviders, signIn, getSession } from 'next-auth/react';
import type { NextPage } from 'next';

interface TypeProvider {
  providers: {
    name: any,
    id: any,
  };
}

const Login: NextPage<TypeProvider> = ({ providers }: TypeProvider) => (
  <>
    {Object.values(providers).map((provider) => (
      <div key={provider.name}>
        <button onClick={() => signIn(provider.id)}>
          Sign in with {provider.name}
        </button>
      </div>
    ))}
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

  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Login;
