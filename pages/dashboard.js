import DashBoard from "@/components/DashBoard";
import Orders from "@/components/Orders";
import Settings from "@/components/Settings";
import SidebarElements from "@/components/SidebarElements";
import Team from "@/components/Team";
import { useState } from "react";
import { MdDashboard } from "react-icons/md"
import { FaThList } from "react-icons/fa"
import { AiOutlineTeam } from "react-icons/ai"
import { MdSettings } from "react-icons/md"
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";


const Dashboard = (props) => {
    const {menu, total, users} = props
    const [display, setDisplay] = useState("Dashboard")
  return (
    <>
        <div className={`h-screen w-full flex`}>
            <div className="w-1/5 z-10 bg-[#edf1f4] shadow-xl cursor-pointer">
                <ul>
                    <SidebarElements setDisplay={setDisplay} title="Dashboard" icon={<MdDashboard/>}/>
                    <SidebarElements setDisplay={setDisplay} title="Orders" icon={<FaThList/>}/>
                    <SidebarElements setDisplay={setDisplay} title="Team" icon={<AiOutlineTeam/>}/>
                    <SidebarElements setDisplay={setDisplay} title="Settings" icon={<MdSettings/>}/>
                </ul>
            </div>
            <div className="w-4/5 bg-[#edf1f4]">
                {display==="Dashboard" && <DashBoard menu={menu} totalCustomers={users} totalOrders={total[0].totalOrders} totalSales={total[0].totalSales}/>}
                {display==="Orders" && <Orders/>}
                {display==="Team" && <Team/>}
                {display==="Settings" && <Settings/>}
            </div>
        </div>
    </>
  )
}

export default Dashboard

export async function getServerSideProps() {
    const data = await getDocs(collection(db, "Menu"));
    const menu = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const col = await getDocs(collection(db, "Restaurant"))
    const total = col.docs.map((doc) => ({...doc.data()}))
    var users = 0
    const usersData = await getDocs(collection(db, "users"))
    usersData.docs.map(()=>users++)
  
    return {
      props: {
        menu,
        total,
        users
      },
    };
  }