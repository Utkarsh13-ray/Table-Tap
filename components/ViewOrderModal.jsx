
import "react-phone-input-2/lib/style.css";
import { useStateContext } from "../context/stateContext";


const Modal = (props) => {
  const { currentUser, setCurrentUser, cartItems} = useStateContext()

  return (
    <div className="h-screen w-screen top-0 left-0 fixed z-10">
      <div
        className="h-screen w-screen top-0 left-0 bg-[#6c6c6ccc] blur-none fixed"
        onClick={() => props.setModal(false)}
      ></div>
      <div className="bg-white z-20 h-fit px-2 py-2 rounded-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl">
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
      
    </section>
      </div>
      <div id="recaptcha-container"></div>
      </div>
  );
};

export default Modal