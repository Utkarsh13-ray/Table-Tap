import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export default function Landing() {
  return (
    <>
     <div className='bg-[#CDFAE5] h-screen flex flex-col  '>
      <div className='logo bg-white flex w-36 items-center justify-center rounded-md m-8'>
            <Image className='rounded-xl' src="./logo.svg" width={50} height={50} alt='logo'/>
            <div className='text-[#1ac073] text-lg font-semibold'>TABLE TAP</div>
          </div>
        <div className='flex md:flex-row flex-col h-4/5  w-full space-x-5   '>
        <div className='flex flex-col justify-center items-center md:w-1/2  '>
          {/* <div className='logo mt-4 mb-10'>
            <Image className='rounded-xl' src={'logo.svg'} width={70} height={80} alt='logo'></Image>
          </div> */}
          <div className='font-semibold my-8 ml-2'>
          <div className='  text-5xl'>
            WELCOME
          </div>
          <div className='text-2xl mx-2 '>
            Lets order <span className='text-[#1ac073]'>FOOD</span>
          </div>
          </div >
          <Link href={"/menu"}>
          <div className="button bg-yellow-500 w-52 h-9 text-white rounded-md flex items-center justify-center my- hover:cursor-pointer">
            MENU
          </div>
          </Link>
        </div>
          
        <div className='flex  justify-center my-10'>
            <Image className='bg-[#CDFAE5]' src={'dining.svg'} width={500} height={500} alt='logo'></Image>
      

        </div>
        </div>
  
      </div></>
  )
}
