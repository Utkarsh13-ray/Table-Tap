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


const dashboard = () => {
    const [display, setDisplay] = useState("Dashboard")
  return (
    <>
        <div className={`h-screen w-full flex`}>
            <div className="w-1/5 z-10 bg-white shadow-xl cursor-pointer">
                <ul>
                    <SidebarElements setDisplay={setDisplay} title="Dashboard" icon={<MdDashboard/>}/>
                    <SidebarElements setDisplay={setDisplay} title="Orders" icon={<FaThList/>}/>
                    <SidebarElements setDisplay={setDisplay} title="Team" icon={<AiOutlineTeam/>}/>
                    <SidebarElements setDisplay={setDisplay} title="Settings" icon={<MdSettings/>}/>
                </ul>
            </div>
            <div className="w-4/5 bg-white">
                {display==="Dashboard" && <DashBoard/>}
                {display==="Orders" && <Orders/>}
                {display==="Team" && <Team/>}
                {display==="Settings" && <Settings/>}
            </div>
        </div>
    </>
  )
}

export default dashboard