import React from 'react'

const Navbar = () => {
  return (
    <>
     <header className="px-6 bg-white flex flex-wrap items-center lg:py-0 py-2 ">
    <div className="flex-1 flex justify-between items-center font-black text-xl text-gray-700">
      <a href="#">
      <img className="rounded-full w-10 h-10 border-2 border-transparent hover:border-pink-400 ignore-body-click" src="/logo.svg" alt="avatar"/>
      </a>
    </div>

    <label for="menu-toggle" className="cursor-pointer lg:hidden block">
     fdc
    </label>
    <input className="hidden" type="checkbox" id="menu-toggle" />

    <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
      <nav>
        <ul className="lg:flex items-center justify-between text-sm font-medium text-gray-700 pt-4 lg:pt-0">
          <li><a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-gray-600 hover:text-gray-900" href="#">Dashboard</a></li>
          <li><a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-gray-600 hover:text-gray-900" href="#">Courses</a></li>
          <li><a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-gray-600 hover:text-gray-900" href="#">Users</a></li>
          <li><a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent text-gray-600 hover:text-gray-900 lg:mb-0 mb-2" href="#">Support</a></li>
        </ul>
      </nav>
      <a href="#" className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor" id="userdropdown">
      <img className="rounded-full w-10 h-10 border-2 border-transparent hover:border-pink-400 ignore-body-click" src="https://pbs.twimg.com/profile_images/1163965029063913472/ItoFLWys_normal.jpg" alt="avatar"/>
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