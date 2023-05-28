const DashBoard = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/3 w-full flex">
        <div className="w-1/4 flex">
          <div className="h-1/2 w-4/5 rounded-lg m-auto px-4 py-2 shadow-xl border">
            <h1 className="font-semibold text-base">Total Orders</h1>
            <h3 className="font-bold text-3xl">1300</h3>
          </div>
        </div>
        <div className="w-1/4 flex">
          <div className="h-1/2 w-4/5 rounded-lg m-auto px-4 py-2 shadow-xl border">
            <h1 className="font-semibold text-base">Total Sales</h1>
            <h3 className="font-bold text-3xl">1000</h3>
          </div>
        </div>
        <div className="w-1/4 flex">
          <div className="h-1/2 w-4/5 rounded-lg m-auto px-4 py-2 shadow-xl border">
            <h1 className="font-semibold text-base">Total Products</h1>
            <h3 className="font-bold text-3xl">100</h3>
          </div>
        </div>
        <div className="w-1/4 flex">
          <div className="h-1/2 w-4/5 rounded-lg m-auto px-4 py-2 shadow-xl border">
            <h1 className="font-semibold text-base">Total Customers</h1>
            <h3 className="font-bold text-3xl">10000</h3>
          </div>
        </div>
      </div>
      <div className="h-2/3 w-full flex">
        <div className="w-2/3 flex border-r">
          <div className="w-4/5 h-4/5 m-auto rounded-lg shadow-2xl border flex">
            <div className="w-2/5 px-4 py-2">
              <h1 className="text-3xl font-bold">Tables</h1>
              <ul className="my-4">
                <li className="hover:bg-highlight rounded-lg px-4 py-2 text-lg">
                  Table 1
                </li>
                <li className="hover:bg-highlight rounded-lg px-4 py-2 text-lg">
                  Table 2
                </li>
                <li className="hover:bg-highlight rounded-lg px-4 py-2 text-lg">
                  Table 3
                </li>
                <li className="hover:bg-highlight rounded-lg px-4 py-2 text-lg">
                  Table 4
                </li>
                <li className="hover:bg-highlight rounded-lg px-4 py-2 text-lg">
                  Table 5
                </li>
              </ul>
              <button className="bg-highlight px-4 py-2 rounded-lg">Add Table</button>
            </div>
            <div className="w-3/5">
              <div className="px-4 py-2">
                <h1 className="text-xl font-semibold mb-2">Status:<span className="ml-2 font-normal text-base">Booked</span></h1>
                <button className="bg-highlight px-4 py-2 rounded-lg">View Order</button>
                <button className="border border-highlight px-4 py-2 rounded-lg">Cancel Order</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex">
          <div className="w-4/5 h-4/5 border shadow-2xl m-auto">
            <h1>Reviews</h1>
            <ul>
              <l1></l1>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
