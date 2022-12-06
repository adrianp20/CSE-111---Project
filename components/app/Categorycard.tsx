/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */

const Categorycard = (props: any) => {
  const setCategory = (id: any) => {
    fetch('/api/user/setcategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId: id,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      });
  };
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>{props.title}</th>
            <th>Add/Remove</th>
          </tr>
        </thead>
        {/* Map Category Name and Add or Remove function */}
        <tbody>
          {props.categories.map((category: any) => (
            <tr key={category.id}>
              <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                  <div>
                    <p className="font-semibold">{category.name}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                  <div className="relative mr-3 hidden h-8 w-8 rounded-full md:block">
                    <button
                      type="button"
                      className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                      onClick={() => setCategory(category.id)}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
                      onClick={() => setCategory(category.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categorycard;
