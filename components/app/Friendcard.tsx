/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Image from 'next/image';
import Link from 'next/link';

const Friendcard = (props: any) => {
  function friendAccept(fid: any) {
    fetch('/api/friends/friendaccept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: fid,
      }),
    }).then((res) => res.json());

    window.location.reload();
  }

  function friendDeny(fid: any) {
    fetch('/api/friends/frienddeny', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: fid,
      }),
    }).then((res) => res.json());

    window.location.reload();
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>{props.title}</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.friends.map((friend: any) => (
            <tr key={friend.friend.id}>
              <td className="px-4 py-3">
                <Link
                  href={`/profile/${friend.friend.email}`}
                  className="btn-ghost btn"
                >
                  <div className="flex items-center text-sm">
                    <div className="relative mr-3 hidden h-8 w-8 rounded-full md:block">
                      <Image
                        src={friend.friend.image}
                        alt="profile"
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                      <div className="absolute inset-0 rounded-full shadow-inner" />
                    </div>
                    <div>
                      <p className="font-semibold">{friend.friend.name}</p>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-3">
                {friend.status === false ? (
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="btn-primary btn"
                      onClick={() => friendAccept(friend.id)}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="btn-primary btn"
                      onClick={() => friendDeny(friend.id)}
                    >
                      Deny
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="btn-primary btn"
                      onClick={() => friendDeny(friend.id)}
                    >
                      Unfriend
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Friendcard;
