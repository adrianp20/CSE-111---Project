/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Navbar = (props: any) => (
  <div className="navbar bg-base-100">
    <div className="flex-1">
      <a className="btn-ghost btn text-xl normal-case">{props.page}</a>
    </div>
    <div className="flex-none gap-2">
      {props.assigned === null ? (
        <a className="btn-ghost btn text-xl normal-case">
          <Link href="/lobbysearch">Search For Lobby</Link>
        </a>
      ) : (
        <a className="btn-disabled btn">Found Lobby</a>
      )}

      <div className="dropdown-end dropdown">
        <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
          <div className="w-10 rounded-full">
            <Image src={props.image} alt="User Image" width={40} height={40} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <a className="justify-between">
              <Link href="/dashboard">Dashboard</Link>
            </a>
          </li>
          <li>
            <Link href={`/profile/${props.email}`}>
              <span className="justify-between">Profile</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="justify-between"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Navbar;
