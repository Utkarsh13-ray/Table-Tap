const Navbar = () => {
  return (
    <>
     <header className="px-6 bg-secondary flex  flex-wrap max-w-4xl rounded-b-xl  mx-auto items-center lg:py-0 py-2 ">
    <div className="flex-1  flex justify-between items-center  text-xl">
      <a className="text-lg font-bold text-black" href="#">
         Table Tap
      </a>
    </div>

    <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
     fdc
    </label>
    <input className="hidden" type="checkbox" id="menu-toggle" />

    <div className="hidden lg:flex lg:items-center text-white lg:w-auto w-full" id="menu">
      <nav>
        <ul className="lg:flex items-center justify-between text-sm font-medium  pt-4 lg:pt-0">
          <li><a className="lg:p-4 py-3 px-0 block" href="#">Login as Resteraunt</a></li>
        </ul>
      </nav>
      <a href="#" className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor" id="userdropdown">
    
    </a>
      <div id="usermenu" className="absolute lg:mt-12 pt-1 z-40 left-0 lg:left-auto lg:right-0 lg:top-0 invisible lg:w-auto w-full">
        <div className="bg-white shadow-xl lg:px-8 px-6 lg:py-4 pb-4 pt-0 rounded lg:mr-3 rounded-t-none">
          <a href="/settings" className="pb-2 block text-gray-600 hover:text-gray-900 ignore-body-click">Settings</a>
          <a href="/logout" className="block text-gray-600 hover:text-gray-900 ignore-body-click">Logout</a>
        </div>
      </div>

    </div>

  </header>
  </>
  )
}

export default Navbar