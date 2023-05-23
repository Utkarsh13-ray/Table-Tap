import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";


const Modal = (props) => {
  console.log(props)

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
    dispatch(props.setLoading(true));
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        props.setLoading(false);
        props.setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        props.setLoading(false);
      });
  }

  const onOTPVerify = () => {
    props.setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        props.setCurrentUser(res.user);
        props.setLoading(false);
        toast.success("Welcome to Table Tap!")
      })
      .catch((err) => {
        console.log(err);
        props.setLoading(false)
        toast.error("Wrong OTP!")
      });
  }
  return (
    <div className="h-screen w-screen top-0 left-0 fixed z-10">
    <Toaster toastOptions={{ duration: 4000 }} />
      <div
        className="h-screen w-screen top-0 left-0 bg-[#313131cc] blur-none fixed"
        onClick={() => props.setModal(false)}
      ></div>
      <div className="bg-emerald-500 z-20 h-fit px-2 py-2 rounded-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <section className=" flex items-center justify-center">
      <div>

        {currentUser ? (
          <div className="flex flex-col justify-center items-center">
          <h2 className="text-center text-white font-medium text-2xl p-4">
            <button onClick={()=>props.placeOrder()} className="border border-blackp p-2">Place Order</button>
          </h2>
          <Link href="/menu"> <button  className=" bg-yellow-500 text-white rounded-md flex items-center justify-center px-3 py-2 hover:cursor-pointer">Order More</button></Link>
          </div>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={props.setOTP}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={props.setPh} />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
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