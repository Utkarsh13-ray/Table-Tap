import Head from 'next/head'
import Navbar from "./Navbar"
import Footer from "./Footer"

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
      {/* <footer>
        <Footer/>
      </footer> */}
    </div>
  )
}

export default Layout