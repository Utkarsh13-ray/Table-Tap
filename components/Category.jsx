import { useRef } from "react";
import { MdAdd } from "react-icons/md"

const Category = ({ title, menu, cat, clickHandler }) => {
  const Ref = useRef(null);
  return (
    <>
      <div>
        <div className="text-2xl text-center font-medium text-black loginDiv rounded-2xl m-5 p-2 bg-highlight">
          {title}
        </div>
        <div ref={Ref}>
          {menu.map((item) => {
            if (item.category == cat)
              return (
                <div className="flex m-2 shadow-sm p-1 rounded-md justify-around border-b" key={item.id}>
                  <div className="w-2/3">
                    {item.name} (₹ {item.price})
                  </div>
                  <div className="flex">
                    <div className="text-sm">Quantity</div>
                    <form onSubmit={clickHandler(item, item.ind, Ref)} className="flex">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="w-10 inputDiv border rounded-sm ml-4"
                      ></input>
                      <button
                        type="submit"
                        className="bg-highlight ml-4 px-2 py-1 rounded-md text-sm flex items-center justify-center"
                      >
                        <MdAdd/>Add
                      </button>
                    </form>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
};

export default Category;
