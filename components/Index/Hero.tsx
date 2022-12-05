import Link from 'next/link';

const Hero = () => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <p className="py-6">
          Find your game lobby here, connect with other people and have fun!
        </p>
        <Link href="/auth/login">
          <button className="btn-primary btn">Get Started</button>
        </Link>
      </div>
    </div>
  </div>
);

export default Hero;
