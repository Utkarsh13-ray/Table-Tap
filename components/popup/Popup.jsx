const Popup = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50  overflow-y-auto">
          <div className="flex min-h-screen items-center  justify-center px-4  pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0  transition-opacity"
              onClick={() => onClose(false)}
            >
              <div className="absolute inset-0  bg-slate-800 opacity-75"/>
            </div>

            <div className="min-h-[500px] inline-block transform overflow-hidden rounded-lg bg-[#edf1f4] px-7 pb-4  text-left align-bottom text-black shadow-xl transition-all sm:my-6 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <button className=" mb-4 h-10 w-10 rounded-full text-white bg-red-600" onClick={() => onClose(false)}>X</button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
