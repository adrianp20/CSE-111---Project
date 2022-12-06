/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Image from 'next/image';

const Card = (props: any) => (
  // create list of profiles containing name and image

  // Table component name and image are passed as props
  <div className="w-full overflow-x-auto">
    <table className="table w-full">
      <thead>
        <tr>
          <th>Following</th>
        </tr>
        {props.profiles.map((profile: any) => (
          <tr key={profile.id}>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="flex items-center">
                <div className="h-10 w-10 shrink-0">
                  <label
                    tabIndex={0}
                    className="btn-ghost btn-circle avatar btn"
                  >
                    <div className="w-10 rounded-full">
                      <Image
                        src={profile?.image}
                        alt="User Image"
                        width={40}
                        height={40}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-circle h-12 w-12">
                  <Image
                    // src={props.image}
                    src="https://avatars.githubusercontent.com/u/59373049?v=4"
                    // src="https://avatars.githubusercontent.com/u/"
                    alt="User Image"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <div>
                {/* import name of user from their google or github profile */}
                {/* <div className="font-bold">User1</div> */}
                <div className="font-bold">{props.name}</div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Card;
