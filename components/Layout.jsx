import Head from 'next/head'
import Navbar from "./Navbar"

const Layout = ({children}) => {
  return (
    <div className=''>
      <Head>
        <title>Resteraunt</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className='max-w-[1400px] m-auto w-full'>
        {children}
      </main>
    </div>
  )
}

export default Layout