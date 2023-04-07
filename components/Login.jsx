import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { setLoading, setPh, setOTP, setCurrentUser, setShowOTP } from "@/redux/actions";

const App = (props) => {
  const dispatch = useDispatch()
  const { currentUser, otp, ph, showOTP, loading, error} = props.state
  console.log(currentUser)

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
    console.log(ph)

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
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {currentUser ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> CODE A PROGRAM
            </h1>
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
  );
};

const mapDispatchToProps = (dispatch) => {
  return{
    setLoading: (value) => dispatch(setLoading(value)),
    setOTP: (value) => dispatch(setOTP(value)),
    setPh: (value) => dispatch(setPh(value)),
    setShowOTP: (value) => dispatch(setShowOTP(value)),
    setCurrentUser: (value) => dispatch(setCurrentUser(value)),
    dispatch,
  }
}
const mapStateToProps = (state) => {
  return {
      state: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (App)