import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { MdTextsms } from "react-icons/md"
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth, db } from "../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useStateContext } from "../context/stateContext";
import Cart from "../components/Cart"
import { doc, setDoc } from "firebase/firestore";


const Modal = (props) => {
  const { user, setUser } = useStateContext()
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [ph, setPh] = useState()
  const [otp, setOTP] = useState()

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  const onSignup = () => {
    setLoading(true)
    onCaptchVerify()

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const addUser = async (user) => {
    const docRef = doc(db, "users", user.uid)
    const data = {id: user.uid, phone: user.phoneNumber}
    setUser(user)
    await setDoc(docRef, data)
  }

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        addUser(res.user)
        setLoading(false)
        toast.success("Login Successful!")
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
        toast.error("Wrong OTP!")
      });
  }


  return (
    <div className="h-screen w-screen top-0 left-0 fixed z-10">
      <div
        className="h-screen w-screen top-0 left-0 bg-[#6c6c6ccc] blur-none fixed"
        onClick={() => props.setModal(false)}
      ></div>
      <div className="bg-primary z-20 h-fit px-2 py-2 rounded-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => props.setModal(false)}
            className="bg-[#dd3439] rounded-md p-1 inline-flex items-center justify-center text-white hover:bg-[#e0454a] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <section className=" flex items-center justify-center">
      <div>

        {user ? (
          <Cart placeOrder={props.placeOrder}/>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-secondary text-white w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={40} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-black text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOTP}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-secondary w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-secondary text-accent w-fit mx-auto p-4 rounded-full">
                  <MdTextsms size={40} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-black text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-secondary w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
      </div>
      <div id="recaptcha-container"></div>
      </div>
  );
};

export default Modal