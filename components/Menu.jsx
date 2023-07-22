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
    <div>Menu</div>
  )
}

export default Menu