import Head from 'next/head'
import Navbar from "./Navbar"

const Layout = ({children}) => {
  return (
    <div className='bg-[#edf1f4]'>
      <Head>
        <title>Restaurant</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className='m-auto w-full'>
        {children}
      </main>
    </div>
  )
}

export default Layout