import { useStateContext } from "@/context/stateContext";

const CheckMail = ({ email }) => {
    const { passwordReset } = useStateContext();
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.currentTarget.disabled = true;
        try {
            await passwordReset(email);
            setEmailMessage(true);
        } catch (error) {    
          if (error.code === 'auth/user-not-found') {
            setEmailMessage(false);
            toast.error(`User not found, try again!`);
            setEmail('');
          }
        }
    };
  return (
    <>
    <div className="h-1/2 md:w-3/4 md:h-3/5 border relative bg-[#edf1f4] loginDiv rounded-lg flex justify-center items-center flex-col max-w-lg">
        <div className="h-full w-full flex flex-col items-center p-6 justify-center">
            <h1 className="text-2xl text-black font-bold mb-2">Please verify your email</h1>
            <div className="flex flex-col items-center m-4 text-center">
                <div className="text-md">You're almost there! We sent an email to</div>
                <div className="text-black font-bold">{ email }</div>
            </div>
            <div className="flex flex-col items-center m-4 text-center">
                <h2 className="text-md">Just click on that link in that email to reset your password.</h2>
                <h2 className="text-md">If you don't see it, you may need to <span className="text-black font-bold">check your spam</span> folder.</h2>
            </div>
            <div className="flex flex-col items-center m-4 text-center">
                <h2 className="text-md">Still can't find the email?</h2>
                <button type="button" onClick={handleSubmit} className='disabled:opacity-50 disabled:hover:bg-secondary hover:bg-[#013667c9] mt-4 bg-secondary px-4 py-2 text-white font-semibold uppercase rounded text-xs tracking-wider'>Resend Email</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default CheckMail