import Head from 'next/head'
import Navbar from "./Navbar"

const Layout = ({children}) => {
  return (
    <div className=''>
      <Head>
        <title>Resteraunt</title>
      </Head>
      <header className=''>
        <Navbar/>
      </header>
      <main className='m-auto w-full'>
        {children}
      </main>
    </div>
  )
}

export default Layout