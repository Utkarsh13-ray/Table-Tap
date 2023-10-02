import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/stateContext";
import { toast } from "react-hot-toast";
import SuccessMessage from "@/components/SuccessMessage"

const defaultFormFields = {
    password: '',
    confirmPassword: '',
}
const resetPassword = () => {
    const [successMessage, setSuccessMessage] = useState(false);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { password, confirmPassword } = formFields;
    const { confirmThePasswordReset } = useStateContext();
    const router = useRouter();
    const { oobCode } = router.query;

    useEffect(() => {
      if(!router.isReady) return;
      if(oobCode === undefined) router.push('/');
      console.log(oobCode)
    }, [router.isReady])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({...formFields, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
          toast.success(`Passwords did not match. Try Again`);
          return;
        }

        try {
            if (oobCode) {
                await confirmThePasswordReset(oobCode, confirmPassword);
                setFormFields(defaultFormFields);
                setSuccessMessage(true);
            } else {
                toast.error('Something is wrong; try again later!');
            }
        } catch (error) {    
            if (error.code === 'auth/invalid-action-code') {
              toast.error('Something is wrong; try again later!');
            }
            console.log(error.message) 
        }
      };

  return (
    <>
      <section className='h-screen text-black font-poppins bg-primary flex flex-col md:flex-row justify-center  md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0'>
          {successMessage ? <SuccessMessage/> : 
          <div className='h-1/2 md:w-1/3 md:h-2/5 border relative bg-[#edf1f4] loginDiv rounded-lg flex justify-center items-center flex-col max-w-sm'>
            <div className='w-full py-2 rounded-2xl px-12'>
              <div className='text-2xl text-black font-bold mb-2'>Verify Email</div>
              <form onSubmit={ e => handleSubmit(e) }>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={ password }
                    onChange={ handleChange }
                    placeholder="New Password"
                    className='text-sm w-full px-4 py-2 rounded inputDiv bg-[#edf1f4] mb-4'
                    required
                  />
                </div>
                <div>
                  <input
                    type='password'
                    name='confirmPassword'
                    value={ confirmPassword }
                    onChange={ handleChange }
                    placeholder="Confirm Password"
                    className='text-sm w-full px-4 py-2 rounded inputDiv bg-[#edf1f4] mb-4'
                    required
                  />
                </div>
                <div>
                  <button type="submit" className='hover:bg-[#013667c9] mt-4 bg-secondary px-4 py-2 text-white font-semibold uppercase rounded text-xs tracking-wider'>Submit</button>
                </div>
              </form>
            </div>
          </div>
          }
        </section>
      </>
  );
}

export default resetPassword