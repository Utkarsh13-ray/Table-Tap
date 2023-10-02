import { useRouter } from "next/router"
import { useEffect } from "react"

const SuccessMessage = () => {
    const router = useRouter();
    useEffect(()=>{
        setTimeout(()=>{
            router.push('/login');
        }, 2000)
    });
  return (
    <>
        <div className="h-1/2 md:w-1/2 md:h-2/5 border relative bg-[#edf1f4] loginDiv rounded-lg flex justify-center items-center flex-col max-w-md">
        <div className="h-full w-full flex flex-col items-center p-6 justify-center">
            <h1 className="text-2xl text-black font-bold mb-2">Password Changed Successfully!</h1>
            <div className="text-md">Redirecting to Login Page!</div>
        </div>
    </div>
    </>
  )
}

export default SuccessMessage