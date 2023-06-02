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

  const [modal, setModal] = useState(false);
  const { onAdd, cartItems } = useStateContext();
  const {menu} = props

  useEffect(() => {
    if (modal) document.body.classList.add("overflow-y-hidden");
    else document.body.classList.remove("overflow-y-hidden");
  });

  const clickHandler = (item, ind, category) => {
    return e => {
        e.preventDefault();
        const enteredAmount = category.current.children[ind].children[1].children[1].children[0].value;
        const enteredAmt = +enteredAmount;
        onAdd(item, enteredAmt);
        category.current.children[ind].children[1].children[1].children[0].value = ""
    }
  };

  const orderHandler = () => {
    if(cartItems.length===0) {
      toast.error(`Cart is Empty! Click on add`)
    } else setModal(true)
  }
  
  const updateOrders = async () => {
    const ref = doc(db, "Restaurant", "lbQvrfEDf4RRG2FmsywA")
    await updateDoc(ref, {
      "totalOrders": increment(1)
  });
  }

  const placeOrder = () => {
      const usersCollectionRef = collection(db, router.query.slug);
      cartItems.map((item) => {
        const add = async () => {
          const document = await addDoc(usersCollectionRef, item);
        };
        add();
      });
      setModal(false);
      updateOrders()
      router.push("/thanks")
  };

  return (
    <>
      {modal && <Modal setModal={setModal} placeOrder={placeOrder} cartItems={cartItems}/>}
      <div className="flex flex-col">
        {/* Inside container after navbar */}
        <div className="container mx-auto max-w-3xl shadow-2xl mt-9 mb-12 rounded border p-10 bg-white ">
          <Category title="Starters" menu={menu} cat="starter" clickHandler={clickHandler}/>
          <Category title="Main Course" menu={menu} cat="main_course" clickHandler={clickHandler}/>
          <Category title="Desserts" menu={menu} cat="dessert" clickHandler={clickHandler}/>
          <Category title="Chapati" menu={menu} cat="chapati" clickHandler={clickHandler}/>
          <Category title="Salads" menu={menu} cat="salad" clickHandler={clickHandler}/>
        </div>
        <div className="fixed bottom-2 bg-transparent flex justify-center items-center w-full">
            <button
              onClick={orderHandler}
              className="bg-highlight w-48 text-white px-2 py-1 rounded-md text-center"
            >
              Place Order
            </button>
        </div>
      </div>
    </>
  );
};

export default Menu;

export async function getServerSideProps() {
  const data = await getDocs(collection(db, "Menu"));
  const menu = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return {
    props: {
      menu,
    },
  };
}