import { useStateContext } from '@/context/stateContext';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '@/config/firebase';

const Settings = () => {
  const router = useRouter()
  const { sendPasswordReset } = useStateContext()
  const { rest } = router.query
  const [email, setEmail] = useState()

  useEffect(()=>{
    const q = query(collection(db, `restaurants`), where("id", "==", rest))
    const unsubscribe = onSnapshot(q, (querySnapshot)=>{
      setEmail(querySnapshot.docs[0].data().email)
    })
    return () => unsubscribe()
  }, [])
  return (
    <>
      <div className="max-w-3xl border border-black mt-16 mx-auto">
        <h1>Settings</h1>
        {email && 
        <div>
          <p className="border border-black flex justify-between"><span>Change Password</span><button onClick={()=>sendPasswordReset(email)} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
          Change</button></p>
        </div>
        }
      </div>
    </>
  )
}

export default Settings