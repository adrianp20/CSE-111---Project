/* eslint-disable tailwindcss/no-custom-classname */
import Link from 'next/link';

const Introducelobby = () => (
  <div className="min-w-2xl hero mt-20 bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <p className="py-6">
          Your lobby is not found, please search for a lobby.
        </p>
        <Link href="/lobbysearch">
          <button className="btn-primary btn">Search</button>
        </Link>
      </div>
    </div>
  </div>
);

export default Introducelobby;
