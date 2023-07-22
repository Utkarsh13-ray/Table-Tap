import DashBoard from "@/components/DashBoard";
import Orders from "@/components/Menu";
import Settings from "@/components/Settings";
import SidebarElements from "@/components/SidebarElements";
import Team from "@/components/Team";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Popup from "../components/popup/Popup";
import { useStateContext } from "@/context/stateContext";
import QRCode from "react-qr-code";

const dashboard = (props) => {
  const router = useRouter();
  const { user } = useStateContext()
  const { menu, restDetails, users, orders } = props;
  const [display, setDisplay] = useState("Dashboard")
  const [showIncomeModal, setShowIncomeModal] = useState(false)
  const [url, setUrl] = useState("http://table-ordering.vercel.app")
  const [num, setNum] = useState()

  useEffect(()=>{
    if(!user || router.query.rest===undefined) router.push('/login')
  })

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
                  <button onClick={() => setUrl(`http://table-ordering.vercel.app/menu/Table${num}?rest=${user.uid}`)}>
                    Generate
                  </button>
                </div>
              </Popup>
            )}
          </div>

          <div className="lg:w-1/5 w-1/2 z-10 bg-[#edf1f4] shadow-xl cursor-pointer">
            <ul className="">
              <h1 className="px-10 py-2 font-bold text-xl">
                {restDetails.name}
              </h1>
              <SidebarElements
                setDisplay={setDisplay}
                title="Dashboard"
                icon={<MdDashboard />}
              />
              <SidebarElements
                setDisplay={setDisplay}
                title="Menu"
                icon={<FaThList />}
              />
              <SidebarElements
                setDisplay={setDisplay}
                title="Team"
                icon={<AiOutlineTeam />}
              />
              <SidebarElements
                setDisplay={handleOpenModal}
                title="Generate QR"
                icon={<AiOutlineTeam />}
              />
              <SidebarElements
                setDisplay={setDisplay}
                title="Settings"
                icon={<MdSettings />}
              />
            </ul>
          </div>
          <div className="w-4/5 bg-[#edf1f4]">
            {display === "Dashboard" && (
              <DashBoard
                menu={menu}
                totalCustomers={users}
                totalOrders={restDetails.totalOrders}
                totalSales={restDetails.totalSales}
                handleOpenModal={handleOpenModal}
                orders={orders}
              />
            )}
            {display === "Orders" && <Orders />}
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
    const data = await getDocs(collection(db, `restaurants/${rest}/Menu`));
    
    const menu = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const docRef = doc(db, "restaurants", rest);
    const docData = await getDoc(docRef);
    const restDetails = { ...docData.data() };
    var users = 0;
    const usersData = await getDocs(collection(db, "users"));
    usersData.docs.map(() => users++);

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
  };
}