import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useStateContext } from '@/context/stateContext';
import { db } from '@/config/firebase';
import { setDoc, doc } from 'firebase/firestore';

const initialState = { name: "", email: "", password: ""};
const login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const { logIn, user, signUp, setUser } = useStateContext();
  const [isLogin, setIsLogin] = useState(true);
  

  useEffect(()=>{
    if(user) router.push(`/dashboard?rest=${user.uid}`)
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await logIn(email, password)
      toast.success("Login Successful!")
      router.push(`/dashboard?rest=${user.uid}`)
    } catch (err) {
      console.error(err)
      if(err.code==="auth/user-not-found") toast.error("User not found! Try Register Instead!")
      else if(err.code==="auth/wrong-password") toast.error("Wrong Password!")
    }
  };

  const addUser = async (res) => {
    const docRef = doc(db, "restaurants", res.user.uid)
    const data = {id: res.user.uid, email: formData.email, name: formData.name, totalOrders:0, totalSales:0, totalProducts: 0}
    await setDoc(docRef, data)
  }

  const registerWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signUp(email, password);
      setUser(res.user)
      addUser(res)
      router.push(`/dashboard?rest=${res.user.uid}`)
    } catch (err) {
        if(err.code==="auth/email-already-in-use")
            toast.error("Already Registered! Try Login Instead!")
        else if(err.code==="auth/weak-password")
            toast.error("Weak Password!")  
        else if(err.code==="auth/invalid-email") 
            toast.error("Invalid Email!")
        else if(err.code==="auth/missing-password")
            toast.err("Password Missing!")
        else if(err.code==="auth/missing-email")
            toast.error("Email Missing!")
        else console.log(err)
    }
  };

  const handleSubmit = (formData) => {
    if(isLogin) logInWithEmailAndPassword(formData.email, formData.password);
    else registerWithEmailAndPassword(formData.email, formData.password);
  }
  
  return (
    <>
       <section className="h-screen text-black font-poppins bg-primary flex flex-col md:flex-row justify-center  md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="h-1/2 md:w-1/3 md:h-3/5 border relative bg-[#edf1f4] loginDiv rounded-lg flex justify-center items-center flex-col max-w-sm">
            <div className='p-2 rounded-2xl px-12'>
            <div className='text-2xl text-black font-bold mb-2'>{isLogin ? "Login" : "Register"}</div>
          {!isLogin && (
            <input
              className="text-sm w-full px-4 py-2 rounded inputDiv bg-[#edf1f4] mb-4"
              type="text"
              placeholder="Restaurant Name"
              name = "name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
          )}
          <input
            className="text-sm w-full px-4 py-2 rounded inputDiv bg-[#edf1f4] mb-4"
            type="text"
            placeholder="Email Address"
            name = "email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            className="text-sm w-full px-4 py-2 rounded inputDiv bg-[#edf1f4]"
            type="password"
            placeholder="Password"
            name = "password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
          />
          <div className="mt-4 flex justify-between text-sm">
            <a
              className="text-black hover:underline hover:underline-offset-4"
              href="/forgotPassword"
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="hover:bg-[#013667c9] mt-4 bg-secondary px-4 py-2 text-white font-semibold uppercase rounded text-xs tracking-wider"
              onClick={() => handleSubmit(formData)}
              type="submit"
            >
              { isLogin ? "Login" : "Register" }
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-black text-center md:text-left">
            Don't have an account? {" "}
            <a
              className="text-black font-normal hover:underline hover:underline-offset-4 cursor-pointer"
              onClick={() => setIsLogin(prev => !prev)}
            >
              { isLogin ? "Register" : "Login" }
            </a>
          </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default login