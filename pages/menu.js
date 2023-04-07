import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import {AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';


export default function Menu() {

  const [category, setCategory] = useState("starter");
  
  const menu=[
    {
      id:1,
      name:"Noodles",
      desc:"noodles with sauce",
      category:"starter",
      price:80
    },
    { id:2,
      name:"pasta",
      desc:"cream Pasta",
      category:"starter",
      price:80
    },
    { id:3,
      name:"shanghai",
      desc:"spicy shnaghai",
      category:"starter",
      price:80
    },
    {
      id:4,
      name:"Butter Paneer Masala",
      desc:"iconic spicy paneer enriched with butter",
      category:"main_course",
      price:160
    },
    {
      id:5,
      name:"Butter  Masala",
      desc:"extra spicy paneer gravy",
      category:"main_course",
      price:160
    },
    {
      id:6,
      name:"Dal fry",
      desc:"spicy dal",
      category:"main_course",
      price:160
    },
    {
      id:7,
      name:"Rasmalai",
      desc:"sweet",
      category:"desert",
      price:50
    },
    {
      id:8,
      name:"gulab jamun",
      desc:"sweet",
      category:"desert",
      price:50
    },
    {
      id:9,
      name:"Tandoori Roti",
      desc:"chapati with butter",
      category:"chapati",
      price:10
    },
    {
      id:10,
      name:"Butter Naan",
      desc:"chapati with butter",
      category:"chapati",
      price:20
    },
    {
      id:11,
      name:"Onion Salad",
      desc:"super salad with onion",
      category:"salad",
      price:20
    },
    {
      id:12,
      name:"Green Salad",
      desc:"super green salad",
      category:"salad",
      price:20
    },
  ]
  return (
    <div className='flex-col   overflow-hidden '>
      <div className='w-full  fixed top-0 '>
      <div className='bg-green-500 flex'>
      <div className='logo bg-white flex w-36 items-center justify-center rounded-md m-2'>
            <Image className='rounded-xl' src={'logo.svg'} width={50} height={50} alt='logo'></Image>
            <div className='text-[#1ac073] text-lg font-semibold'>TABLE TAP</div>
          </div>
        <div className='text-white m-auto text-3xl '>MENU</div></div>
        <div className='categories flex justify-center '>
         <Link onClick={()=>{setCategory("starter")}} className={`${category=="starter"?"bg-white":"bg-gray-200"} p-1 w-1/5 text-center border-r-2 border-gray-400`} href={"#starter"}><div >Starters </div></Link>
         <Link onClick={()=>{setCategory("main_course")}} className={`${category=="main_course"?"bg-white":"bg-gray-200"} p-1 w-1/5 text-center border-r-2 border-gray-400`} href={"#main_course"} ><div >Main Course </div></Link>
         <Link onClick={()=>{setCategory("desert")}} className={`${category=="desert"?"bg-white":"bg-gray-200"} p-1 w-1/5 text-center border-r-2 border-gray-400`} href={"#desert"}><div >Deserts  </div></Link>
         <Link onClick={()=>{setCategory("chapati")}} className={`${category=="chapati"?"bg-white":"bg-gray-200"} p-1 w-1/5 text-center border-r-2 border-gray-400`} href={"#chapati"}><div >Chapati</div></Link>
         <Link onClick={()=>{setCategory("salad")}} className={`${category=="salad"?"bg-white":"bg-gray-200"} p-1 w-1/5 text-center `} href={"#salad"}><div >Salads</div></Link>


         <div>
          </div>
          </div>
          </div>
          <div  id='starter' className='mt-24 ' onMouseEnter={()=>{setCategory("starter")}}>
          <div className='text-2xl bg-green-400 rounded-md m-5 p-2'>Starters</div>
          {menu.map((item)=>{
            if(item.category=="starter")
            return <div className='flex m-5 shadow-sm p-2 rounded-md' key={item.id}>
              <div className='w-2/3 text-xl'>{item.name} (₹ {item.price})</div>
              <div className='flex font-semibold w-1/3 justify-end  items-center'>
                <AiFillMinusCircle onClick={() => { }} className='text-green-600 cursor-pointer' /><div className='bg-green-500 rounded-lg px-2 w-12 h-8 flex items-center justify-center mx-2'>0</div><AiFillPlusCircle onClick={() => {}} className='text-green-600 cursor-pointer' /></div>
              </div>
            
          })}
          </div>
          <div id="main_course" onMouseEnter={()=>{setCategory("main_course")}} className='pt-5'>
          <div className='text-2xl bg-green-400 rounded-md m-5 p-2'>Main Course</div>
          {menu.map((item)=>{
            if(item.category=="main_course")
            return <div className='flex m-5 shadow-sm p-2 rounded-md' key={item.id}>
              <div className='w-2/3 text-xl'>{item.name} (₹ {item.price})</div>
              <div className='flex font-semibold w-1/3 justify-end  items-center'>
                <AiFillMinusCircle onClick={() => { }} className='text-green-600 cursor-pointer' /><div className='bg-green-500 rounded-lg px-2 w-12 h-8 flex items-center justify-center mx-2'>0</div><AiFillPlusCircle onClick={() => {}} className='text-green-600 cursor-pointer' /></div>
              </div>
            
          })}
          </div>
          <div id='desert' onMouseEnter={()=>{setCategory("desert")}} className='pt-5'>
          <div className='text-2xl bg-green-400 rounded-md m-5 p-2'>Deserts</div>
          {menu.map((item)=>{
            if(item.category=="desert")
            return <div className='flex m-5 shadow-sm p-2 rounded-md' key={item.id}>
              <div className='w-2/3 text-xl'>{item.name} (₹ {item.price})</div>
              <div className='flex font-semibold w-1/3 justify-end  items-center'>
                <AiFillMinusCircle onClick={() => { }} className='text-green-600 cursor-pointer' /><div className='bg-green-500 rounded-lg px-2 w-12 h-8 flex items-center justify-center mx-2'>0</div><AiFillPlusCircle onClick={() => {}} className='text-green-600 cursor-pointer' /></div>
              </div>
            
          })}
          </div>
          <div id='chapati' onMouseEnter={()=>{setCategory("chapati")}} className='pt-5'>
          <div className='text-2xl bg-green-400 rounded-md m-5 p-2'>Chapatis</div>
          {menu.map((item)=>{
            if(item.category=="chapati")
            return <div className='flex m-5 shadow-sm p-2 rounded-md' key={item.id}>
              <div className='w-2/3 text-xl'>{item.name} (₹ {item.price})</div>
              <div className='flex font-semibold w-1/3 justify-end  items-center'>
                <AiFillMinusCircle onClick={() => { }} className='text-green-600 cursor-pointer' /><div className='bg-green-500 rounded-lg px-2 w-12 h-8 flex items-center justify-center mx-2'>0</div><AiFillPlusCircle onClick={() => {}} className='text-green-600 cursor-pointer' /></div>
              </div>
            
          })}
          </div>
          <div id='salad' onMouseEnter={()=>{setCategory("salad")}} className='pt-5 pb-10'>
          <div className='text-2xl bg-green-400 rounded-md m-5 p-2'>Salads</div>
          {menu.map((item)=>{
            if(item.category=="salad")
            return <div className='flex m-5 shadow-sm p-2 rounded-md' key={item.id}>
              <div className='w-2/3 text-xl'>{item.name} (₹ {item.price})</div>
              <div className='flex font-semibold w-1/3 justify-end  items-center'>
                <AiFillMinusCircle onClick={() => { }} className='text-green-600 cursor-pointer' /><div className='bg-green-500 rounded-lg px-2 w-12 h-8 flex items-center justify-center mx-2'>0</div><AiFillPlusCircle onClick={() => {}} className='text-green-600 cursor-pointer' /></div>
              </div>
            
          })}
          </div>
          
          <div className='fixed bottom-2'>
            <div className='flex justify-center w-screen'>
          <div className='bg-green-600 w-56 text-white px-2 py-1 rounded-md text-center'>Place Order</div>
          </div>
          </div>
    </div>
  )
}
