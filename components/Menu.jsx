import { useState, useEffect } from "react"
import { collection, addDoc, query, where, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "@/config/firebase"
import { useRouter } from "next/router"
import MenuViewer from "../components/MenuViewer"
import Input from "./Input"


const Menu = () => {
  const router = useRouter()
  const { rest } = router.query
  const [menu, setMenu] = useState([])
  const [category, setCategory] = useState("")

  const createCategory = async() => {
    const usersCollectionRef = collection(db, `restaurants/${rest}/Menu`)
    const data = {"category" : category.toLowerCase()}
    const document = await addDoc(usersCollectionRef, data)
    setCategory("")
  }

  useEffect(()=>{
  }, [menu])

  useEffect(()=>{
    const q = query(collection(db, `restaurants/${rest}/Menu`))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = []
      querySnapshot.forEach((doc) => {
        arr.push({ id:doc.id, ...doc.data() })
      })
      setMenu(arr);
    });

    return () => unsubscribe()
  }, [])

  return (
<<<<<<< HEAD
    <div>Menu</div>
=======
    <>
      <div className='flex flex-col h-full w-full'>
      <div className="w-[90%] mx-auto">
          <div className="mt-16 flex">
            <Input placeholder="Create Category" state={category} setState={setCategory}/>
            <button className="text-secondary hover:text-white border-[3px] hover:bg-secondary transition-all duration-300 border-secondary font-semibold rounded-lg text-sm px-3 text-center" onClick={()=>createCategory()}>
              Create
            </button>
          </div>
      </div>
          <div className="overflow-y-scroll shadow-xl w-[90%] mx-auto mt-4 rounded-lg scrollbarhide">
          {menu.map((doc, index)=>(
            <div><MenuViewer cat={doc.category} id={doc.id} index={index} len={menu.length}/></div>
          ))}
          </div>
        </div>
    </>
>>>>>>> 29399802e064dae3bd7853d1945edd4b46e3385a
  )
}

export default Menu