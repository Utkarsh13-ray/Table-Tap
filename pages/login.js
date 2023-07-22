import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useStateContext } from '@/context/stateContext';

const login = () => {
  const router = useRouter()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { logIn, user } = useStateContext()

  useEffect(()=>{
    if(user) router.push(`/dashboard?rest=${user.uid}`)
  })

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
  
  return (
    <>
       <section className="h-screen text-black font-poppins bg-primary flex flex-col md:flex-row justify-center  md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 border relative py-24 bg-[#edf1f4] loginDiv rounded-lg flex justify-center items-center flex-col max-w-sm">
            <div className='p-2 rounded-2xl px-12'>
            <div className="text-center md:text-left font-semibold">
            <label className="mr-1">Sign in with</label>
            <button
              type="button"
              className="mx-1 h-9 w-9 rounded-full bg-white text-secondary shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </button>
            <button
              type="button"
              className="inlne-block mx-1 h-9 w-9 rounded-full bg-secondary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
          </div>
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-black">
              Or
            </p>
          </div>
          <input
            className="text-sm w-full px-4 py-2 rounded inputDiv bg-[#edf1f4] mb-4"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 rounded inputDiv bg-[#edf1f4]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-4 flex justify-between text-sm">
            <label className="flex text-black cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a
              className="text-black hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-secondary px-4 py-2 text-white font-semibold uppercase rounded text-xs tracking-wider"
              onClick={() => logInWithEmailAndPassword(email, password)}
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-black text-center md:text-left">
            Don't have an account? {" "}
            <a
              className="text-black font-normal hover:underline hover:underline-offset-4 cursor-pointer"
              onClick={()=>router.push("/register")}
            >
              Register
            </a>
          </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default login