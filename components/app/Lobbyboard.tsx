/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */

// Props include lobby id, name and description
// Make a card
import Link from 'next/link';

const Lobbyboard = (props: any) => (
  <div className="hero mt-20 max-w-2xl">
    <div className="hero-overlay bg-opacity-60" />
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">{props.name}</h1>
        <p className="mb-5">{props.description}</p>
        <div className="space-x-3">
          <Link href={`/lobby/${props.id}`}>
            <button className="btn-primary btn">Enter lobby</button>
          </Link>
          <button className="btn-primary btn" onClick={props.leave}>
            Leave lobby
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Lobbyboard;
