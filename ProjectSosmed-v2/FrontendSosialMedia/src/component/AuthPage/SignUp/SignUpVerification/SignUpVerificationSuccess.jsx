import "../../../../index.css";
import { ChatBubbleOvalLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

// hooks
import { useAuthHooks } from "../../Hooks/AuthHooks";

const SignUpVerificationSuccess = () => {
    const { handleShowSignIn } = useAuthHooks();

    return (
        <>
            <div className="w-[80%] flex flex-col justify-center items-center text-black font-poppins py-3 mb-7 animate-popup">
                <div className="flex flex-col items-center mb-5 gap-3">
                    <div className="flex gap-2 items-center mb-3">
                        <ChatBubbleOvalLeftIcon className="w-10 h-10 bg-my-green text-white rounded-lg p-2" />
                        <span className="text-black font-extrabold text-3xl flex">
                            <h1 className="text-4xl italic">M</h1>
                            <h1 className="text-2xl italic">A</h1>
                            <h1 className="text-2xl self-end">N</h1>
                            <h1 className="text-2xl self-center italic">D</h1>
                            a
                            <h1 className="text-3xl">L</h1>
                            a
                        </span>
                    </div>
                    <span className="text-black font-bold font-poppins text-2xl">Create New Account</span>
                    <span className="text-black/40 font-poppins font-extralight text-sm">Your Account Created Successfuly</span>
                    <CheckBadgeIcon className="w-15 h-15 text-my-green"/>
                </div>

                {/* Form */}
                <div className="w-full flex flex-col">
                    <div className="w-full h-10 bg-my-green rounded-lg flex justify-center items-center cursor-pointer" onClick={handleShowSignIn}>
                        <button className="text-white cursor-pointer" type="submit">Back to Sign In</button>
                    </div>
                </div>

            </div>
        </>
    )
};

export default SignUpVerificationSuccess;