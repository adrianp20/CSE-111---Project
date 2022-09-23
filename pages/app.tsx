import type { NextPage } from 'next';

const Home: NextPage = () => (
  <div>
    <h1>Hello</h1>
  </div>
);

export default Home;
// @ts-ignore - Can not generate type for Home Export
Home.auth = true;
