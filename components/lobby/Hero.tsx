/* eslint-disable react/destructuring-assignment */

const Hero = (props: any) => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">{props.name}</h1>
        <p className="py-6">{props.description}</p>
      </div>
    </div>
  </div>
);

export default Hero;
