import Link from "next/link"
import { useStateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Navbar = () => {
  const router = useRouter()
  const { user, logOut } = useStateContext()
  useEffect(()=>{
    console.log(user)
  })
  const logout = () => {
    logOut()
    router.push("/")
  };

  return (
    <>
<<<<<<< HEAD
     <header className="bg-[#edf1f4] text-black flex max-w-3xl w-full flex-wrap mx-auto items-center lg:py-0 py-2 fixed left-[50%] translate-x-[-50%]">
    <div className="flex-1  flex justify-between items-center text-xl">
      <Link className="cursor-pointer text-lg font-bold text-black" href="/">
=======
     <header className="font-poppins font-bold bg-transparent text-secondary flex max-w-3xl w-full flex-wrap items-center lg:py-0 mt-3 fixed left-[50%] translate-x-[-50%]">
    <div className="flex-1 flex justify-between items-center text-xl">
      <Link className="cursor-pointer text-lg" href="/">
>>>>>>> 29399802e064dae3bd7853d1945edd4b46e3385a
         Table Tap
      </Link>
    </div>

    <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
     fdc
    </label>
    <input className="hidden" type="checkbox" id="menu-toggle"/>

    <div className="hidden lg:flex lg:items-center  lg:w-auto w-full">
      <nav>
<<<<<<< HEAD
        <ul className="lg:flex items-center justify-between text-sm font-medium  pt-4 lg:pt-0">
          <li>
          {!user && <Link className="lg:p-4 py-3 px-0 block" href="/login">Login as Restaurant</Link>}
          {user && (
            <div className="flex">
            {user.phoneNumber==null && <div className="lg:p-4 py-3 px-0 block" onClick={()=>router. push(`/dashboard?rest=${user.uid}`)}>Dashboard</div>}
            <div className="lg:p-4 py-3 px-0 block cursor-pointer" href="/" onClick={()=>logout()}>Logout</div>
            </div>
          )}
          </li>
=======
        <ul className="lg:flex items-center justify-between text-sm pt-4 lg:pt-0">
          <li>{!user && <Link className="lg:p-4 py-3 px-0 block" href="/login">Login as Resteraunt</Link>}</li>
          <li>{user && user.phoneNumber==null && <div className="cursor-pointer mr-3" onClick={()=>router. push(`/dashboard?rest=${user.uid}`)}>Dashboard</div>}</li>
          <li>{user && <div className="cursor-pointer" href="/" onClick={()=>logout()}>Logout</div>}</li>
>>>>>>> 29399802e064dae3bd7853d1945edd4b46e3385a
        </ul>
      </nav>
    </div>
  </header>
  </>
  )
}

export default Navbar