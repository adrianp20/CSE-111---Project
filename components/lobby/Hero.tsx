/* eslint-disable react/destructuring-assignment */

const Hero = (props: any) => (
  <div className="hero bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">{props.name}</h1>
        <p className="py-6">{props.description}</p>
        {props.category.map((cat: any) => (
          <span className="badge-primary badge" key={cat.name}>
            {cat.name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default Hero;
