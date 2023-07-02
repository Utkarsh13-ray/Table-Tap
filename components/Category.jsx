import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { MdAdd } from "react-icons/md"
import useSWR from 'swr'

const fetcher = async(url) => {
  const res = await getDocs(collection(db, url))
  return res
}

const Category = ({ title, id, cat, clickHandler }) => {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [qty, setQty] = useState()
  const { rest } = router.query
  const { data } = useSWR(`restaurants/${rest}/Menu/${id}/${cat}`, fetcher, {refreshInterval: 500})
  
  useEffect(()=>{
    if(data) setItems(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }, [data])
  
  return (
    <>
      <div>
        <div className="text-2xl text-center font-medium text-black loginDiv rounded-2xl m-5 p-2 bg-highlight">
          {title}
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
                    <form onSubmit={clickHandler(item, qty)} className="flex">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={qty}
                        onChange={e=>setQty(e.target.value)}
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
