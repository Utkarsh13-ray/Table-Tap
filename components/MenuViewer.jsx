import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/stateContext";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import useSWR from 'swr'

const fetcher = async(url) => {
    const res = await getDocs(collection(db, url))
    return res
}

const MenuViewer = ({ id, cat }) => {
  const router = useRouter()
  const [items, setItems] = useState([])
  const { rest } = router.query
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [desc, setDesc] = useState()
  const { data } = useSWR(`restaurants/${rest}/Menu/${id}/${cat}`, fetcher, { refreshInterval: 500 })

  const addItem = async() => {
    const q = query(collection(db, `restaurants/${rest}/Menu`), where("category", "==", cat))
    const querySnapshot = await getDocs(q);
    const usersCollectionRef = collection(db, `restaurants/${rest}/Menu/${querySnapshot.docs[0].id}/${cat}`)
    const document = await addDoc(usersCollectionRef, {name, price, desc})
  }
  
  useEffect(()=>{
    if(data) setItems(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }, [data])
  
  return (
    <>
      <div>
      <div className="text-2xl text-center font-medium text-black loginDiv rounded-2xl m-5 p-2 bg-highlight">
          {cat}
        </div>
      <div>
            <input placeholder="Food Name" value={name} onChange={e=>setName(e.target.value)}/>
            <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)}/>
            <input placeholder="Desc" value={desc} onChange={e=>setDesc(e.target.value)}/>
            <button onClick={()=>addItem()}>Add</button>
          </div>
        
        <div>
          {items.map((item) => {
              return (
                <div className="flex m-2 shadow-sm p-1 rounded-md justify-around border-b" key={item.id}>
                  <div className="w-2/3">
                    {item.name} (₹ {item.price})
                  </div>
                  <div className="flex">
                    <div className="text-sm">Quantity</div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
};

export default MenuViewer;
