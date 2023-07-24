import InfoBox from "./InfoBox";
import { deleteDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md"
import Popup from "./popup/Popup";
import useSWR from 'swr'

const fetcher = async(url) => {
  const res = await getDocs(collection(db, url))
  return res
}

const DashBoard = ({menu, totalOrders, totalCustomers, totalSales}) => {
  const router = useRouter()
  const { rest } = router.query
  const [viewModal, setViewModal] = useState(false);
  const [orders, setOrders] = useState([])
  const [items, setItems] = useState([])
  const [Table, setTable] = useState("")
  const {data} = useSWR(`restaurants/${rest}/Orders`, fetcher, {refreshInterval:500})

  const deleteOrder = async (id) => {
    await deleteDoc(doc(db, `restaurants/${rest}/Orders`, id))
  }

  useEffect(()=>{
    if(data) setOrders((data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
  }, [data])

  
  const viewOrder = (active, item) => {
    const cartItems = undefined
    if(item!==undefined) {
      cartItems = item.cartItems
      setTable(item.Table)
    }
    if(cartItems!==undefined) setItems(cartItems.map((doc) => ({ ...doc })))
    setViewModal(active);
  };

  return (
    <div>
      <div>
        {viewModal && (
          <Popup isOpen={viewOrder} onClose={viewOrder} Table={Table}>
            <div>
              {items.map((doc)=>(
                <div className="px-3 py-1 rounded flex w-full justify-between bg-accent shadow-md">
                  <div className="flex flex-col items-start">
                    <h1 className="font-semibold text-lg">{doc.name}</h1>
                    <h1 className="text-sm">Quantity: {doc.quantity}</h1>
                  </div>
                  <h1>₹{doc.price}</h1>
                </div>
              ))}
            </div>
          </Popup>
        )}
      </div>
      <div className="flex flex-col h-screen">
        <div className="w-full flex mt-10 flex-col lg:flex-row  lg:h-1/3 h-1/2 items-center lg:items-stretch ">
          <InfoBox title="Total Orders" info={totalOrders} />
          <InfoBox title="Total Sales" info={totalSales} />
          <InfoBox title="Total Products" info={menu.length} />
          <InfoBox title="Total Customers" info={totalCustomers} />
        </div>
        <div className="h-2/3 w-full flex">
<<<<<<< HEAD
          <div className="w-2/3 flex border-r">
            <div className="w-4/5 h-4/5 m-auto rounded-lg loginDiv gap-y-2 flex flex-col">
              <h1 className="text-3xl font-bold m-3">Order</h1>
=======
          <div className="w-1/2 flex border-r">
            <div className="w-4/5 h-4/5 m-auto rounded-lg gap-y-2 flex flex-col border">
              <h1 className="text-3xl text-secondary font-bold m-3">Orders</h1>
>>>>>>> 29399802e064dae3bd7853d1945edd4b46e3385a
              <div
                className="text-secondary py-2 mx-3 scrollbarhide"
              >
                {orders.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="shadow-md cursor-pointer flex rounded-lg bg-accent justify-between items-center px-4 py-4 my-3"
                    >
                      <div className="flex items-center justify-between w-full" onClick={() => viewOrder(true, item)}>
                        <p className="font-medium uppercase">
                          {item.Table}
                        </p>
                        <span className="mr-2">₹{item.totalPrice}</span>
                      </div>
                        <button className="text-xl" onClick={()=>deleteOrder(item.id)}>
                          <MdDelete />
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
                <li>1 </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
