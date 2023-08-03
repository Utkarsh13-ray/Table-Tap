import DashBoard from "@/components/DashBoard";
import Menu from "@/components/Menu";
import Settings from "@/components/Settings";
import SidebarElements from "@/components/SidebarElements";
import Team from "@/components/Team";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { collection, getDocs, getDoc, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Popup from "../components/popup/Popup";
import { useStateContext } from "@/context/stateContext";
import QRCode from "react-qr-code";

const dashboard = (props) => {
  const router = useRouter();
  const { user } = useStateContext()
  const { rest } = router.query
  const { restDetails, users, orders } = props;
  const [menu, setMenu] = useState([])
  const [display, setDisplay] = useState("Dashboard")
  const [showIncomeModal, setShowIncomeModal] = useState(false)
  const [url, setUrl] = useState("http://table-ordering.vercel.app")
  const [num, setNum] = useState()
  const [active, setActive] = useState("Dashboard")



  useEffect(()=>{
    if(!user || router.query.rest===undefined) router.push('/login')
  }, [])

  const handleOpenModal = (check) => {
    setShowIncomeModal(check);
  };
    return (
    <>
      {user && (
        <div className="h-screen w-full flex font-poppins ">
          <div>
            {showIncomeModal && (
              <Popup isOpen={handleOpenModal} onClose={handleOpenModal}>
                <div className="flex gap-10 flex-col justify-center items-center min-h-[300px]">
                  <div className="w-[256px] h-[256px]">
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={url}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                  <input placeholder="Enter Table Number" type="number" value={num} onChange={e => setNum(e.target.value)}/>
                  <button onClick={() => setUrl(`https://table-ordering-f9s2.vercel.app/menu/Table${num}?rest=${user.uid}`)}>
                    Generate
                  </button>
                </div>
              </Popup>
            )}
          </div>
          <div className="w-1/5 z-10 bg-accent shadow-xl cursor-pointer">
            <ul className="">
              <h1 className="px-10 py-2 font-bold text-xl">
                {restDetails.name}
              </h1>
              <SidebarElements
                setDisplay={setDisplay}
                title="Dashboard"
                icon={<MdDashboard />}
                display={display}
              />
              <SidebarElements
                setDisplay={setDisplay}
                title="Menu"
                icon={<FaThList />}
                display={display}
              />
              <SidebarElements
                setDisplay={setDisplay}
                title="Team"
                icon={<AiOutlineTeam />}
                display={display}
              />
              <SidebarElements
                setDisplay={handleOpenModal}
                title="Generate QR"
                icon={<AiOutlineTeam />}
                display={display}
              />
              <SidebarElements
                setDisplay={setDisplay}
                title="Settings"
                icon={<MdSettings />}
                display={display}
              />
            </ul>
          </div>
          <div className="w-4/5 bg-primary">
            {display === "Dashboard" && (
              <DashBoard
                // totalProducts={menu.length}
                handleOpenModal={handleOpenModal}
                totalOrders={restDetails.totalOrders}
                totalCustomers={users}
                totalSales={restDetails.totalSales}
                orders={orders}
              />
            )}
            {display === "Menu" && <Menu menu={menu}/>}
            {display === "Team" && <Team />}
            {display === "Settings" && <Settings />}
          </div>
        </div>
      )}
    </>
  );
};

export default dashboard;

export async function getServerSideProps(context) {
  const { rest } = context.query;
  if (rest !== undefined) {
    const res = await getDoc(doc(db, "restaurants", rest));
    const restDetails = { ...res.data() };
    var users = 0;
    const usersData = await getDocs(collection(db, "users"));
    usersData.docs.map(() => users++);

    return {
      props: {
        restDetails,
        users
      },
    };
  }
  return {
    props: {},
  };
}