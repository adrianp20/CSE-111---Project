/* eslint-disable react/destructuring-assignment */
import { useState } from 'react';

const Hero = (props: any) => {
  const [description, setDescription] = useState(props.description);

  function updateDescription(e: any) {
    fetch('/api/lobby/updatedescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.id,
        description: e.target.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDescription(data.lobby.description);
      });
  }

  return (
    <div className="hero bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{props.name}</h1>
          {/* Description Input On change */}
          <textarea
            className="mt-5 min-w-full"
            defaultValue={description}
            onChange={(e) => {
              updateDescription(e);
            }}
          />
          <p> </p>
          {props.category.map((cat: any) => (
            <span className="badge-primary badge" key={cat.name}>
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
