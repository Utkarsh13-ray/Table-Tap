import { useRouter } from "next/router"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/config/firebase"
import { BiReset } from "react-icons/bi"

const InfoBox = ({title, info}) => {
  const router = useRouter()
  const { rest } = router.query

  const reset = async (title) => {
    const docRef = doc(db, "restaurants", rest)
    const res = await getDoc(docRef)
    let data
    if(title=="Total Orders") {
      data = {...res.data(), totalOrders: 0}
    }
    else if(title=="Total Sales") {
      data = {...res.data(), totalSales: 0}
    }
    await setDoc(docRef, data)
  }

  return (
    <div className="w-3/4 lg:w-1/4 flex h-36">
      <div className="w-4/5 rounded-lg lg:m-auto px-4 py-2 loginDiv">
      <div className="flex justify-between">
        <h1 className="font-semibold text-base">{title}</h1>
        <button className={`${title!="Total Orders" && title!="Total Sales" && `hidden`} text-lg`} onClick={()=> reset(title)}><BiReset/></button>
      </div>
      <h3 className="font-bold text-3xl">{info}</h3>
      </div>
    </div>
  );
};

export default InfoBox;
