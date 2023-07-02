import { useState } from "react"
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"
import { db } from "@/config/firebase"
import { useRouter } from "next/router"
import MenuViewer from "../components/MenuViewer"

const Menu = ({menu}) => {
  const router = useRouter()
  const { rest } = router.query
  const [category, setCategory] = useState("")

  const createCategory = async() => {
    const usersCollectionRef = collection(db, `restaurants/${rest}/Menu`)
    const data = {"category" : category.toLowerCase()}
    const document = await addDoc(usersCollectionRef, data)
    console.log(document)
  }


  return (
    <>
      <div className='flex flex-col h-full w-full'>
        {/* upper div */}
        <div className='flex-1 border-black mt-16'> 
          <div>
            <input placeholder="Enter Category" value={category} onChange={e=>setCategory(e.target.value)}/>
            <button onClick={()=>createCategory()}>Create</button>
          </div>
          
        </div>
        {/* lower div */}
        <div className='flex-[3_3_0%]  overflow-y-scroll'>
        {menu.map((doc)=>(
          <div><MenuViewer title={doc.category} cat={doc.category} id={doc.id}/></div>
        ))}
        </div>
      </div>
    </>
  )
}

export default Menu