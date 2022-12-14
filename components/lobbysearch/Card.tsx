/* eslint-disable react/destructuring-assignment */
import { useRouter } from 'next/router';

const Card = (props: any) => {
  const router = useRouter();
  async function setLobby() {
    await fetch('/api/user/setlobby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lobby: props.id,
      }),
    }).then((response) => response.json());

    router.push('/dashboard');
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
          <p>Users: {props.count}</p>
          <button className="btn-primary btn" onClick={setLobby}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
