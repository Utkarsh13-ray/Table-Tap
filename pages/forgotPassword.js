import CheckMail from '@/components/CheckMail';
import { useStateContext } from '@/context/stateContext';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const forgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState(false);
    const { passwordReset } = useStateContext();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
            await passwordReset(email);
            setEmailMessage(true);
        } catch (error) {    
          if (error.code === 'auth/user-not-found') {
            setEmailMessage(false);
            toast.error(`User not found, try again!`);
            setEmail('');
          }
          console.log(error)
        }
    };
    return (
        <>
            <section className='h-screen text-black font-poppins bg-primary flex flex-col md:flex-row justify-center  md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0'> 
                {emailMessage && <CheckMail email={email}/>}
                {!emailMessage && <div className='h-1/2 md:w-1/3 md:h-2/5 border relative bg-[#edf1f4] loginDiv rounded-lg flex justify-center items-center flex-col max-w-sm'>
                <div className='w-full py-2 rounded-2xl px-12 '>
                    <div className='text-2xl text-black font-bold mb-2'>Verify Email</div>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email"
                                className='text-sm w-full px-4 py-2 rounded inputDiv bg-[#edf1f4] mb-4'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        <div>
                            <button type='submit' className='disabled:opacity-50 hover:bg-[#013667c9] mt-4 bg-secondary px-4 py-2 text-white font-semibold uppercase rounded text-xs tracking-wider'>Verify Email</button>
                        </div>
                        </form>
                    </div>
                </div>
                }
            </section>
        </>
    )
}

export default forgotPassword