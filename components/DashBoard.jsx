import InfoBox from "./InfoBox";
import { deleteDoc, doc, getDocs, collection } from "firebase/firestore";
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
  totalSales
}) => {
  const router = useRouter()
  const { rest } = router.query
  const [viewModal, setViewModal] = useState(false);
  const [orders, setOrders] = useState([])
  const [items, setItems] = useState([])

  const deleteOrder = async (id) => {
    await deleteDoc(doc(db, `restaurants/${rest}/Orders`, id))
  }

  useEffect(()=>{
    const getOrder = async() => {
      const ordersData = await getDocs(collection(db, `restaurants/${rest}/Orders`))
      setOrders(ordersData.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    }
    getOrder()
  }, [deleteOrder])

  
  
  const viewOrder = (active, cartItems) => {
    if(cartItems!==undefined) setItems(cartItems.map((doc) => ({ ...doc })))
    setViewModal(active);
  };

  return (
    <div>
      <div>
        {viewModal && (
          <Popup isOpen={viewOrder} onClose={viewOrder}>
            <div>
              {items.map((doc)=>(
                <div className="flex w-full justify-between">
                  <h1>{doc.name}</h1>
                  <h1>{doc.quantity}</h1>
                  <h1>{doc.price}</h1>
                </div>
              ))}
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
              <div
                className="text-white py-2 px-7 mx-14 overflow-y-scroll"
              >
                {orders.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex rounded-lg bg-black justify-between items-center px-4 py-4 my-3"
                    >
                      <div className="flex items-center  justify-between w-full" onClick={() => viewOrder(true, item.cartItems)}>
                        <p className="  font-medium uppercase">
                          {item.Table}
                        </p>
                        <span>{item.totalPrice}</span>
                      </div>
                        <button className=" rounded-full border border-white md:p-1" onClick={()=>deleteOrder(item.id)}>
                          <RiDeleteBin6Line />
                        </button>
                    </div>
                  );
                })}
              </div>
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
