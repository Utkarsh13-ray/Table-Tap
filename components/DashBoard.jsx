import InfoBox from "./InfoBox";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { RiDeleteBin6Line } from "react-icons/ri";
import Popup from "./popup/Popup";

const DashBoard = ({
  menu,
  totalCustomers,
  totalOrders,
  totalSales,
  handleOpenModal,
}) => {
  const [status, setStatus] = useState(false);
  const [active, setActive] = useState(1);
  const [items, setItems] = useState([]);
  const router = useRouter();
  const { rest } = router.query;
  const [viewModal, setViewModal] = useState(false);
  useEffect(() => {
    const temp = async () => {
      const data = await getDocs(collection(db, `restaurants/${rest}/Table1`));
      const info = data.docs.map((doc) => ({ ...doc.data() }));

      info.length >= 1 ? setStatus(true) : setStatus(false);
      setItems(info);
    };
    temp();
  }, []);

  const clearCollection = async (table) => {
    const path = `restaurants/${rest}/${table}`;
    const ref = collection(db, path);
    const snapshot = await getDocs(ref);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    if (results.length !== 0) {
      results.forEach(async (result) => {
        const docRef = doc(db, path, result.id);
        await deleteDoc(docRef);
      });
      setStatus(false);
      setItems([]);
      toast.success("Order Cleared!");
    } else toast.error("Order Empty!");
  };

  const handleClick = async (number) => {
    const table = "Table" + number;
    const path = `restaurants/${rest}/${table}`;
    const data = await getDocs(collection(db, path));
    const info = data.docs.map((doc) => ({ ...doc.data() }));

    info.length >= 1 ? setStatus(true) : setStatus(false);
    setActive(number);
    setItems(info);
  };
  const dummy = [
    {
      id: "1",
      amount: "2000",
      description: "Table No1",
    },
    {
      id: "2",
      amount: "6000",
      description: "Table No2",
    },
    {
      id: "3",
      amount: "7000",
      description: "Table No3",
    },
  ];
  const viewOrder = (active) => {
    setViewModal(active);
  };

  return (
    <div>
      <div>
        {viewModal && (
          <Popup isOpen={viewOrder} onClose={viewOrder}>
            <div className="flex gap-10 flex-col justify-center items-center min-h-[300px]">
              <div className="w-[180px] h-[180px]">
                <div id="qr-code" />
              </div>
            </div>
          </Popup>
        )}
      </div>
      <div className="flex flex-col h-screen">
        <div className="h-1/3 w-full flex mt-10">
          <InfoBox title="Total Orders" info={totalOrders} />
          <InfoBox title="Total Sales" info={totalSales} />
          <InfoBox title="Total Products" info={menu.length} />
          <InfoBox title="Total Customers" info={totalCustomers} />
        </div>
        <div className="h-2/3 w-full flex">
          <div className="w-2/3 flex border-r">
            <div className="w-4/5 h-4/5 m-auto rounded-lg loginDiv gap-y-2 flex flex-col">
              <h1 className="text-3xl font-bold m-3">Order</h1>
              <button
                className="text-white py-2 px-7 mx-14"
                onClick={viewOrder}
              >
                {dummy.map((dum) => {
                  return (
                    <div
                      key={dum.id}
                      className="flex rounded-lg bg-black justify-between items-center px-4 py-4 my-3"
                    >
                      <div className="flex items-center  justify-center ">
                        <p className="  font-medium uppercase">
                          {dum.description}
                        </p>
                      </div>
                      <div className=" item-center  flex max-w-xs justify-center md:max-w-sm lg:space-x-6">
                        <span>{dum.amount}</span>
                        <button className=" rounded-full border border-white md:p-1">
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </button>
            </div>
          </div>
          <div className="w-1/3 flex">
            <div className="w-4/5 h-4/5 loginDiv rounded-lg m-auto">
              <h1></h1>
              <ul>
                <l1> </l1>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
