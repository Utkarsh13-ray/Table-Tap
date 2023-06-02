import React from 'react'
import Link from 'next/link'
export default function Landing() {
  return (
    // <div className='flex bg-gray-200 rounded-lg '>
    <>
     <div className='md:block hidden '>
        <img src="plate.png" className='z-10 lg:h-[55vh] xl:h-[70vh]  absolute right-0  lg:right-42 xl:right-42 2xl:right-52 md:top-[25%] lg:top-[20%] xl:top-[15%] ' alt="" />
        {/* <img src="plate.png"  className='h-[60vh] absolute top-[15%] right-[33.33%] ' alt="" /> */}
      </div>
    <div className='flex justify-center md:justify-normal md:mx-0 ml-4  my-4 md:my-0  md:ml-4  '>

     

      <div className='flex md:mt-20 lg:mt-0  md:ml-5 mr-10 lg:ml-9  md:mr-0 md:w-1/2   h-[100vh] flex-col justify-center items-center z-10'>
            <div className='mt-32'>
            <div className='text-4xl sm:text-5xl font-bold'>Order Your</div>
            <div className='text-4xl sm:text-5xl font-semibold'>Favourite Food</div>
            <div className='text-sm sm:text-md my-4 w-80 md:w-96'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magni consequatur perspiciatis nisi, eveniet libero labore exercitationem nemo hic veniam numquam tenetur recusandae odio n.</div>
            <Link href={"/menu/Table1"}><div className=' md:w-80 w-68 lg:w-96 hover:cursor-pointer bg-gray-900 text-white p-3 rounded-full text-center text-xl font-semibold'>Menu</div></Link>
            </div>
            <div className='text-yellow-500 text-4xl mt-5'>Services</div>
            <div className='flex my-10 space-y-10 lg:space-x-10 lg:flex-row flex-col lg:space-y-0 lg:ml-36 '>
                 <div className="bg-gray-300  flex-col w-48 h-52 sm:h-64 sm:w-96   lg:w-52 lg:h-52 rounded-lg space-y-2" >
                  <div className='w-28 h-30 sm:w-40 sm:h-40 lg:w-36 lg:h-36 p-4 rounded-full mx-auto mt-4 mb-2 bg-white flex justify-center items-center'><img src="foodplate.png" className='h-20 w-20' alt="" /></div>
                  <div className='text-center font-semibold text-xl sm:text-2xl'>Best Quality </div>
                 </div>
                 <div className="bg-gray-300  flex-col w-48 h-52  sm:h-64 sm:w-96 lg:w-52 lg:h-52 rounded-lg space-y-2" >
                  <div className='w-28 h-30 sm:w-40 sm:h-40  p-4 lg:w-36 lg:h-36  rounded-full mx-auto mt-4 mb-2 bg-white flex justify-center items-center'><img src="phone.png" className='h-20 w-20' alt="" /></div>
                  <div className='text-center font-semibold text-xl sm:text-2xl'>Self Ordering </div>
                 </div>
                 <div className="bg-gray-300  flex-col w-48 h-52  sm:h-64 sm:w-96 lg:w-52 lg:h-52 rounded-lg space-y-2" >
                  <div className='w-28 h-30 sm:w-40 sm:h-40  p-4 lg:w-36 lg:h-36  rounded-full mx-auto mt-4 mb-2 bg-white flex justify-center items-center'><img src="delivery.png" className='h-20 w-20' alt="" /></div>
                  <div className='text-center font-semibold text-xl sm:text-2xl'>Fast Serving</div>
                 </div>
            </div>
      </div>
      <div className="md:block z-0 hidden md:w-1/2 xl:w-1/3 bg-[#e4b145] h-full absolute right-0 rounded-l-full" ></div>


    </div>
    </>
    // {/* </div> */}
  )
}
