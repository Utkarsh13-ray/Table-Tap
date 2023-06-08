import DashBoard from "@/components/DashBoard";
import Orders from "@/components/Menu";
import Settings from "@/components/Settings";
import SidebarElements from "@/components/SidebarElements";
import Team from "@/components/Team";
import { useState } from "react";
import { MdDashboard } from "react-icons/md"
import { FaThList } from "react-icons/fa"
import { AiOutlineTeam } from "react-icons/ai"
import { MdSettings } from "react-icons/md"
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useStateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Dashboard = (props) => {
    const router = useRouter()
    const {menu, restDetails, users} = props
    const [display, setDisplay] = useState("Dashboard")
    const { currentUser } = useStateContext()

    const checkUser = () => {
      if(!currentUser) 
        router.push("/login")
    }
    useEffect(()=>{
      if(router.query.rest===undefined) {
        router.push("/login")
      }
      checkUser()
    })
    
  return (
    <>
    {currentUser &&
        <div className='h-screen w-full flex font-poppins'>
            <div className="w-1/5 z-10 bg-[#edf1f4] shadow-xl cursor-pointer">
                <ul className="">
                    <h1 className="px-10 py-2 font-bold text-xl">{restDetails.name}</h1>
                    <SidebarElements setDisplay={setDisplay} title="Dashboard" icon={<MdDashboard/>}/>
                    <SidebarElements setDisplay={setDisplay} title="Menu" icon={<FaThList/>}/>
                    <SidebarElements setDisplay={setDisplay} title="Team" icon={<AiOutlineTeam/>}/>
                    <SidebarElements setDisplay={setDisplay} title="Settings" icon={<MdSettings/>}/>
                </ul>
            </div>
            <div className="w-4/5 bg-[#edf1f4]">
                {display==="Dashboard" && <DashBoard menu={menu} totalCustomers={users} totalOrders={restDetails.totalOrders} totalSales={restDetails.totalSales}/>}
                {display==="Orders" && <Orders/>}
                {display==="Team" && <Team/>}
                {display==="Settings" && <Settings/>}
            </div>
        </div>
        }
    </>
  )
}

export default Dashboard

export async function getServerSideProps(context) {
  const { rest } = context.query
  if(rest!==undefined) {
    const data = await getDocs(collection(db, `restaurants/${rest}/Menu`));
    const menu = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const docRef = doc(db, "restaurants", rest);
    const docData = await getDoc(docRef);
    const restDetails = {...docData.data()}
    var users = 0
    const usersData = await getDocs(collection(db, "users"))
    usersData.docs.map(()=>users++)
    
    return {
      props: {
        menu,
        restDetails,
        users
      },
    };
  } 
  return {
    props: {},
  }
  }