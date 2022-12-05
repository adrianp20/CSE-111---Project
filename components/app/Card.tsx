/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Image from 'next/image';

const Card = (props: any) => (
  // create list of profiles containing name and image

  // Table component name and image are passed as props
  <div className="overflow-x-auto w-full">
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Picture</th>
          {/* <th></th> */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <Image
                    src="/tailwind-css-component-profile-2@56w.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">Hart Hagerty</div>
                <div className="text-sm opacity-50">United States</div>
              </div>
            </div>
          </td>

          <th>
            <button className="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>

        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <Image
                    src="/tailwind-css-component-profile-3@56w.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
            </div>
          </td>

          <th>
            <button className="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>

        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <Image
                    src="/tailwind-css-component-profile-4@56w.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">Marjy Ferencz</div>
                <div className="text-sm opacity-50">Russia</div>
              </div>
            </div>
          </td>

          <th>
            <button className="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>

        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <Image
                    src="/tailwind-css-component-profile-5@56w.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">Yancy Tear</div>
                <div className="text-sm opacity-50">Brazil</div>
              </div>
            </div>
          </td>

          <th>
            <button className="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
      </tbody>
      {/* <!-- foot --> */}
      <tfoot>
        <tr>
          {/* <th></th> */}
          <th>Name</th>
          <th>Picture</th>
          {/* <th></th> */}
        </tr>
      </tfoot>
    </table>
  </div>
);

export default Card;
