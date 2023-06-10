const Popup = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 border  overflow-y-auto">
          <div className="flex min-h-screen items-center  justify-center px-4  pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0  border  transition-opacity"
              onClick={() => onClose(false)}
            >
              <div className="absolute inset-0  bg-slate-800 opacity-75"/>
            </div>

            <div className="inline-block transform border  border-yellow-400  overflow-hidden rounded-lg bg-neutral-950 px-7 pb-4  text-left align-bottom text-white shadow-xl transition-all sm:my-6 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <button
                className="mb-4 h-10 w-10 rounded-full border "
                onClick={() => onClose(false)}
              >
                X
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
