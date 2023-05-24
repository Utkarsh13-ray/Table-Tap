import React, { useEffect, useState } from "react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useStateContext } from "../context/stateContext";
import Navbar from "@/components/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import Category from "@/components/Category";

const Modal = dynamic(
  () => {
    return import("../components/Modal");
  },
  { ssr: false }
);

const Menu = (props) => {
  const { menu } = props;

  const [modal, setModal] = useState(false);
  const { onAdd, cartItems } = useStateContext();


  useEffect(() => {
    if (modal) document.body.classList.add("overflow-y-hidden");
    else document.body.classList.remove("overflow-y-hidden");
  });

  const clickHandler = (item, ind, category) => {
    return e => {
        e.preventDefault();
        console.log(category.current.children[ind].children[1].children[1].children[0].value)
        const enteredAmount = category.current.children[ind].children[1].children[1].children[0].value;
        const enteredAmt = +enteredAmount;
        onAdd(item, enteredAmt);
    }
  };

  const orderHandler = () => {
    if(cartItems.length===0) {
      toast.error(`Cart is Empty! Click on add`)
    } else setModal(true)
  }

  const placeOrder = () => {
      const usersCollectionRef = collection(db, "Table1");
      cartItems.map((item) => {
        const add = async () => {
          const document = await addDoc(usersCollectionRef, item);
          console.log(item);
        };
        add();
      });
      setModal(false);
  };

  return (
    <>
      <Toaster/>
      {modal && <Modal setModal={setModal} placeOrder={placeOrder} cartItems={cartItems}/>}
      <div className="bg-[#FFF9DB]">
        <Navbar />

        {/* Inside container after navbar */}
        <div className="container mx-auto max-w-4xl mt-9 bg-gray-200 rounded-3xl border border-red-700">
          <Category title="Starters" menu={menu} cat="starter" clickHandler={clickHandler}/>
          <Category title="Main Course" menu={menu} cat="main_course" clickHandler={clickHandler}/>
          <Category title="Desserts" menu={menu} cat="dessert" clickHandler={clickHandler}/>
          <Category title="Chapati" menu={menu} cat="chapati" clickHandler={clickHandler}/>
          <Category title="Salads" menu={menu} cat="salad" clickHandler={clickHandler}/>
        </div>
        <div className="fixed bottom-2">
          <div className="flex justify-center w-screen">
            <button
              onClick={orderHandler}
              className="bg-highlight w-56 text-white px-2 py-1 rounded-md text-center"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

export async function getServerSideProps() {
  const data = await getDocs(collection(db, "Menu"));
  console.log(data.docs[0].data().name);
  const menu = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return {
    props: {
      menu,
    },
  };
}
