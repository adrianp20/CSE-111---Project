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
          <th>{props.title}</th>
        </tr>
      </thead>
      <tbody>
        {props.profiles.map((profile: any) => (
          <tr key={profile.id}>
            <td className="px-4 py-3">
              <div className="flex items-center text-sm">
                <div className="relative mr-3 hidden h-8 w-8 rounded-full md:block">
                  <Image
                    src={profile.image}
                    alt="profile"
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                  <div className="absolute inset-0 rounded-full shadow-inner" />
                </div>
                <div>
                  <p className="font-semibold">{profile.name}</p>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Card;
