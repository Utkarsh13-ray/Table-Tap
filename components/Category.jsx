import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { MdOutlineAdd } from "react-icons/md"
import useSWR from 'swr'

const fetcher = async(url) => {
  const res = await getDocs(collection(db, url))
  return res
}

const Category = ({ title, id, cat, clickHandler }) => {
  const router = useRouter()
  const [items, setItems] = useState([])
  const { rest } = router.query
  const { data } = useSWR(`restaurants/${rest}/Menu/${id}/${cat}`, fetcher, {refreshInterval: 500})
  useEffect(()=>{
    console.log(items)
  }, [])
  
  useEffect(()=>{
    if(data) setItems(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }, [data])

  function toTitleCase(str) {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  
    return titleCase;
  }
  
  const [qty, setQty] = useState(Array(items.length).fill(0))
  return (
    <>
      <div>
        <div className="text-2xl text-center font-semibold uppercase bg-accent text-secondary shadow rounded-2xl m-5 p-2">
          {title}
        </div>
        <div>
          {items.map((item, ind) => {
              return (
                <div className="flex m-2 shadow-sm p-1 rounded-md justify-around border-b" key={item.id}>
                  <div className="w-2/3">
                    <div className="text-lg font-semibold">
                      {toTitleCase(item.name)}
                    </div>
                    <div className="text-sm">
                      {item.desc}
                    </div>
                  </div>
                  <div className="flex flex-col mb-1 items-end">
                    <div className="text-md font-semibold">₹{item.price}</div>
                    <form onSubmit={clickHandler(item, qty[ind])} className="flex mt-1 border rounded-sm">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={ qty[ind] }
                        onChange={ e=> {
                          const newArray = [...qty];
                          newArray[ind] = e.target.value;
                          setQty(newArray);
                        }}
                        className="w-8 inputDiv border rounded-sm"
                      ></input>
                      <button
                        type="submit"
                        className="rounded-md text-xl text-secondary flex items-center justify-center"
                      >
                        <MdOutlineAdd/>
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
