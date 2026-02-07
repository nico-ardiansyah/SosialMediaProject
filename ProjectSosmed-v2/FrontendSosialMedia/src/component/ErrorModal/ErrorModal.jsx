import { useNavigate } from "react-router";
import "../../index.css";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const ErrorModal = ({ message, closeModal, handleCloseAllModal }) => { 
    const Navigate = useNavigate();

    const handleCloseModal = () => { 
        if (handleCloseAllModal) {
            handleCloseAllModal()
        }
        localStorage.removeItem("currentUserId")
        closeModal(false);
        Navigate("/");
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/10 backdrop-blur-xs z-20 flex justify-center items-center px-3">
                <div className="w-full max-w-[350px] shadow-[0px_0px_15px] shadow-red-500/50 border border-white/50 rounded-lg ring-1 ring-red-500/30 bg-white/50 flex flex-col gap-3">
                    <div className="flex p-2 items-center gap-3">
                        <div className="flex justify-center items-center w-13 h-13 rounded-lg shadow-[0px_0px_10px] shadow-red-500/50 bg-white/50">
                            <ExclamationCircleIcon className="w-8 h-8 font-semibold text-black" />
                        </div>
                        <span className="font-extrabold font-bebas-neue text-3xl text-shadow-[0px_0px_1px] text-shadow-red-300 text-black">Error</span>
                    </div>
                    <div className="min-w-0 p-3 flex-1 content-center text-center">
                        <span className="break-words font-poppins text-black/90 font-semibold">{message}</span>
                    </div>
                    <div className="flex justify-center items-center hover:scale-110 transition-all duration-700 mb-5" onClick={handleCloseModal}>
                        <button className="rounded-lg w-[80%] h-10 font-bold hover:bg-white/80 hover:ring-black/50 hover:ring-3 hover:shadow-white hover:shadow-[0px_0px_10px] transition-all duration-700 text-lg text-black cursor-pointer">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};


export default ErrorModal;