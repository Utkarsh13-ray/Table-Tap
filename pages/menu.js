import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import dynamic from 'next/dynamic';
import { collection, getDocs, increment, addDoc } from "firebase/firestore";
import { db } from "../config/firebase"
import { useStateContext } from "../context/stateContext";

const Modal = dynamic(
  () => {
    return import("../components/Modal");
  },
  { ssr: false }
);

const Menu = (props) => {
  const {menu} = props

  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(false)
  const {decQty, incQty, qty, onAdd, totalPrice} = useStateContext()

  useEffect(()=>{
    console.log(totalPrice)
  })

  useEffect(() => {
    if(modal) document.body.classList.add("overflow-y-hidden")
    else document.body.classList.remove("overflow-y-hidden")
  })

  const placeOrder = () => {
    const usersCollectionRef = collection(db, 'Table1')
    cart.map((item)=>{
      const add = async () => {
        const document = await addDoc(usersCollectionRef, item)
        console.log(item)
      }
      add()
    })
    setModal(false)
  }

  return (
    <>
    {modal && <Modal setModal={setModal} placeOrder={placeOrder}/>}
    <div className='flex-col overflow-hidden'>
      <div className='w-full fixed top-0'>
      <div className='bg-emerald-500 flex'>
      <div className='logo bg-white flex w-36 items-center justify-center rounded-md m-2'>
            <Image className='rounded-xl' src={'logo.svg'} width={50} height={50} alt='logo'></Image>
            <div className='text-[#1ac073] text-lg font-semibold'>TABLE TAP</div>
          </div>
        <div className='text-white m-auto text-3xl '>MENU</div></div>
        <div className='categories flex justify-center '>
         <div>
          </div>
          </div>
          </div>
          <div  id='starter' className='mt-24'>
          <div className='text-2xl bg-emerald-500 rounded-md m-5 p-2'>Starters</div>
          {menu.map((item)=>{
            if(item.category=="starter")
            return <div className='flex m-5 shadow-sm p-2 rounded-md' key={item.id}>
              <div className='w-2/3 text-xl'>{item.name} (₹ {item.price})</div>
              <div className='flex font-semibold w-1/3 justify-end  items-center'>
                <AiFillMinusCircle onClick={decQty} className='text-green-600 cursor-pointer' /><div className='bg-green-500 rounded-lg px-2 w-12 h-8 flex items-center justify-center mx-2'>{qty}</div><AiFillPlusCircle onClick={incQty} className='text-green-600 cursor-pointer' /></div>
                <div className='border border-black' onClick={() => onAdd(item, qty)}>Add to Cart</div>
              </div>
            
          })}
          </div>
          <div id="main_course" className='pt-5'>
          <div className='text-2xl bg-emerald-500 rounded-md m-5 p-2'>Main Course</div>
          {menu.map((item)=>{
            if(item.category=="main_course")
            return <div className='flex m-5 shadow-sm p-2 rounded-md' key={item.id}>
              <div className='w-2/3 text-xl'>{item.name} (₹ {item.price})</div>
              <div className='flex font-semibold w-1/3 justify-end  items-center'>
                <AiFillMinusCircle onClick={decQty} className='text-green-600 cursor-pointer' /><div className='bg-green-500 rounded-lg px-2 w-12 h-8 flex items-center justify-center mx-2'>{qty}</div><AiFillPlusCircle onClick={incQty} className='text-green-600 cursor-pointer' /></div>
                <div className='border border-black' onClick={() => onAdd(item, qty)}>Add to Cart</div>
              </div>
            
          })}
          </div>
          <div id='desert' className='pt-5'>
          <div className='text-2xl bg-emerald-500 rounded-md m-5 p-2'>Deserts</div>
          {menu.map((item)=>{
            if(item.category=="dessert")
            return <div className='flex m-5 shadow-sm p-2 rounded-md' key={item.id}>
              <div className='w-2/3 text-xl'>{item.name} (₹ {item.price})</div>
              <div className='flex font-semibold w-1/3 justify-end  items-center'>
                <AiFillMinusCircle onClick={decQty} className='text-green-600 cursor-pointer' /><div className='bg-green-500 rounded-lg px-2 w-12 h-8 flex items-center justify-center mx-2'>{qty}</div><AiFillPlusCircle onClick={incQty} className='text-green-600 cursor-pointer' /></div>
                <div className='border border-black' onClick={() => onAdd(item, qty)}>Add to Cart</div>
              </div>
            
          })}
          </div>
          <div id='chapati' className='pt-5'>
          <div className='text-2xl bg-emerald-500 rounded-md m-5 p-2'>Chapatis</div>
          {menu.map((item)=>{
            if(item.category=="chapati")
            return <div className='flex m-5 shadow-sm p-2 rounded-md' key={item.id}>
              <div className='w-2/3 text-xl'>{item.name} (₹ {item.price})</div>
              <div className='flex font-semibold w-1/3 justify-end  items-center'>
                <AiFillMinusCircle onClick={decQty} className='text-green-600 cursor-pointer' /><div className='bg-green-500 rounded-lg px-2 w-12 h-8 flex items-center justify-center mx-2'>{qty}</div><AiFillPlusCircle onClick={incQty} className='text-green-600 cursor-pointer' /></div>
                <div className='border border-black' onClick={() => onAdd(item, qty)}>Add to Cart</div>
              </div>
            
          })}
          </div>
          <div id='salad' className='pt-5 pb-10'>
          <div className='text-2xl bg-emerald-500 rounded-md m-5 p-2'>Salads</div>
          {menu.map((item)=>{
            if(item.category=="salad")
            return <div className='flex m-5 shadow-sm p-2 rounded-md' key={item.id}>
              <div className='w-2/3 text-xl'>{item.name} (₹ {item.price})</div>
              <div className='flex font-semibold w-1/3 justify-end  items-center'>
                <AiFillMinusCircle onClick={decQty} className='text-green-600 cursor-pointer' /><div className='bg-green-500 rounded-lg px-2 w-12 h-8 flex items-center justify-center mx-2'>{qty}</div><AiFillPlusCircle onClick={incQty} className='text-green-600 cursor-pointer' /></div>
                <div className='border border-black' onClick={() => onAdd(item, qty)}>Add to Cart</div>
              </div>
            
          })}
          </div>
          
          <div className='fixed bottom-2'>
            <div className='flex justify-center w-screen'>
          <button onClick={()=>setModal(true)} className='bg-emerald-500 w-56 text-white px-2 py-1 rounded-md text-center'>Place Order</button>
          </div>
          </div>
    </div>
    </>
  )
}

export default Menu

export async function getServerSideProps() {
    const data = await getDocs(collection(db, "Menu"))
    console.log(data.docs[0].data().name)
    const menu = data.docs.map((doc)=>(
      {id: doc.id, ...doc.data()}
    ))

  return {
    props: {
      menu
    },
  }
}