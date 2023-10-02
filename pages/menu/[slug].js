import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { collection, getDocs, addDoc, doc, updateDoc, increment, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useStateContext } from "../../context/stateContext";
import toast from 'react-hot-toast';
import Category from "@/components/Category";
import { useRouter } from "next/router";


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
  const { onAdd, cartItems, totalPrice, setCartItems } = useStateContext();
  const { menu } = props

  useEffect(() => {
    if (modal) document.body.classList.add("overflow-y-hidden");
    else document.body.classList.remove("overflow-y-hidden");
  });

  const clickHandler = (item, qty) => {
    return e => {
        e.preventDefault();
        let enteredAmt = 0;
        if(qty===NaN || qty===undefined) enteredAmt = 0
        else enteredAmt = +qty

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
      const q = query(usersCollectionRef, where("Table", "==", slug))
      const d = await getDocs(q)
      if(d.docs.length===0) await addDoc(usersCollectionRef, data);
      else {
        const x = [...d.docs[0].data().cartItems, ...cartItems]
        var temp = cartItems.reduce((acc, curr) => acc + curr.price*curr.quantity, 0)
        console.log(temp)
        await updateDoc(doc(db, `restaurants/${rest}/Orders`, d.docs[0].id), {
          "cartItems" : x,
          "totalPrice" : increment(temp)
        });
      }
      setCartItems([])
      setModal(false);
      updateOrders(qty)
      router.push("/Thank")
  };

  return (
    <>
      {modal && <Modal setModal={setModal} placeOrder={placeOrder} cartItems={cartItems}/>}
      <div className="flex flex-col font-poppins bg-primary">
        {/* Inside container after navbar */}
        <div className="container mx-auto max-w-3xl mt-20 mb-20 rounded p-10 shadow-xl border">
        {menu.map((doc)=><Category title={doc.category} id={doc.id} cat={doc.category} clickHandler={clickHandler}/>)}
        </div>
        <div className="fixed bottom-8 flex justify-center items-center w-full ">
            <button
              onClick={orderHandler}
              className="bg-secondary shadow-2xl text-white w-48 text-text px-2 py-1 rounded-md text-center"
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