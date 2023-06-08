import Link from "next/link"
import { signOut } from "firebase/auth";
import { useStateContext } from "@/context/stateContext";
import { auth } from "../config/firebase"

const Navbar = () => {
  const { currentUser, setCurrentUser } = useStateContext()

  const logout = () => {
    setCurrentUser(null)
    signOut(auth);
  };

  return (
    <>
     <header className="bg-[#edf1f4] text-black flex max-w-3xl w-full flex-wrap mx-auto items-center lg:py-0 py-2 fixed left-[50%] translate-x-[-50%]">
    <div className="flex-1  flex justify-between items-center text-xl">
      <Link className="text-lg font-bold text-black" href="/">
         Table Tap
      </Link>
    </div>

    <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
     fdc
    </label>
    <input className="hidden" type="checkbox" id="menu-toggle" />

    <div className="hidden lg:flex lg:items-center  lg:w-auto w-full">
      <nav>
        <ul className="lg:flex items-center justify-between text-sm font-medium  pt-4 lg:pt-0">
          <li>
          {!currentUser && <Link className="lg:p-4 py-3 px-0 block" href="/login">Login as Resteraunt</Link>}
          {currentUser && <Link className="lg:p-4 py-3 px-0 block" href="/" onClick={()=>logout()}>Logout</Link>}
          </li>
        </ul>
      </nav>
    </div>
  </header>
  </>
  )
}

export default Navbar