import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { collection, getDocs, addDoc, doc, FieldValue, updateDoc, increment } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useStateContext } from "../../context/stateContext";
import toast from 'react-hot-toast';
import Category from "@/components/Category";
import {useRouter} from "next/router";


const Modal = dynamic(
  () => {
    return import("../../components/Modal");
  },
  { ssr: false }
);

const Menu = (props) => {
  const router = useRouter()
  const { rest, slug } = router.query
  const [modal, setModal] = useState(false);
  const { onAdd, cartItems, totalPrice } = useStateContext();
  const { menu } = props

  useEffect(() => {
    console.log(router.query)
    if (modal) document.body.classList.add("overflow-y-hidden");
    else document.body.classList.remove("overflow-y-hidden");
  });

  const clickHandler = (item, qty) => {
    return e => {
        e.preventDefault();
        const enteredAmt = +qty;
        onAdd(item, enteredAmt);
    }
  };

  const orderHandler = () => {
    if(cartItems.length===0) {
      toast.error(`Cart is Empty! Click on add`)
    } else setModal(true)
  }
  
  const updateOrders = async (qty) => {
    const ref = doc(db, "restaurants", rest)
    await updateDoc(ref, {
      "totalOrders": increment(1),
      "totalSales" : increment(totalPrice*qty)
    });
  }

  const placeOrder = async () => {
      const usersCollectionRef = collection(db, `restaurants/${rest}/Orders`);
      const qty = cartItems.length
      const data = {
        "Table" : slug,
        "cartItems" : cartItems,
        "totalPrice": totalPrice
      }
      const document = await addDoc(usersCollectionRef, data);
      setModal(false);
      updateOrders(qty)
      router.push("/Thank")
  };

  return (
    <>
      {modal && <Modal setModal={setModal} placeOrder={placeOrder} cartItems={cartItems}/>}
      <div className="flex flex-col font-poppins">
        {/* Inside container after navbar */}
        <div className="container mx-auto max-w-3xl mt-20 mb-20 rounded p-10 loginDiv">
        {menu.map((doc)=><Category title={doc.category} id={doc.id} cat={doc.category} clickHandler={clickHandler}/>)}
        </div>
        <div className="fixed bottom-2 flex justify-center items-center w-full">
            <button
              onClick={orderHandler}
              className="bg-highlight shadow-2xl border w-48 text-black px-2 py-1 rounded-md text-center"
            >
              Place Order
            </button>
        </div>
      </div>
    </>
  );
};

export default Menu;

export async function getServerSideProps(context) {
  const { rest } = context.query
  const data = await getDocs(collection(db, `restaurants/${rest}/Menu`));
  const menu = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return {
    props: {
      menu,
    },
  };
}