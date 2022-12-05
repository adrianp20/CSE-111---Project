import Image from 'next/image';

const Navbar = (props: any) => (
  <div className="navbar bg-base-100">
    <div className="flex-1">
      <span className="btn-ghost btn text-xl normal-case">daisyUI</span>
    </div>
    <div className="flex-none gap-2">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input-bordered input"
        />
      </div>
      <div className="dropdown-end dropdown">
        <span className="btn-ghost btn-circle avatar btn">
          <div className="w-10 rounded-full">
            <Image
              // eslint-disable-next-line react/destructuring-assignment
              src={props.image}
              alt="Picture of the author"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
        </span>
        <ul className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
          <li>
            <span className="justify-between">
              Profile
              <span className="badge">New</span>
            </span>
          </li>
          <li>
            <span>Settings</span>
          </li>
          <li>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Navbar;
