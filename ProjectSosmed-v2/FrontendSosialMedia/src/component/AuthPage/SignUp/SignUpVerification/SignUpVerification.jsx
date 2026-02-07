import "../../../../index.css";
import { ChatBubbleOvalLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

// services
import useAuthServices from "../../Services/useAuthServices";
import { useState } from "react";
import { useEffect } from "react";

const SignUpVerification = () => {
    const { setCode, handleSubmitSignUpVerification, errors, handleResendCodeRequest } = useAuthServices();
    const [countdown, setCountdown] = useState(120);

    useEffect(() => { 
        if (countdown <= 0) return

        const interval = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    },[countdown])


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
                    <span className="text-black/40 font-poppins font-extralight text-sm">Verified Your Account </span>
                    {countdown >= 1 ? <span className="text-black">Resend code available in {countdown}s</span> : null}
                    {countdown === 0 ? <span className="text-black">Send code <span className="text-my-green cursor-pointer" onClick={(e) => {handleResendCodeRequest(e), setCountdown(120)}}>again</span></span> : null }
                </div>

                {/* Form */}
                <div className="w-full flex-1 text-black/70">
                    <form action="" className="gap-5 flex flex-col">
                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label htmlFor="text" className="font-light">
                                Code
                            </label>
                            <div className="relative flex flex-col">
                                <EnvelopeIcon className="w-5 h-5 text-black absolute top-[25%] ml-2"/>
                                <input type="text" id="code" placeholder="Enter Your Code" required className="pl-10 h-10 border-3 border-gray-700 rounded-lg font-light focus:ring-my-green focus:border-my-green focus:outline-none focus:ring-2 focus:shadow-[0_0_10px] focus:shadow-my-green" onChange={(e) => setCode(e.target.value)}/>
                            </div>
                            {errors?.codeError && <span className=" text-red-600 text-[12px]">{errors?.codeError}</span>}
                        </div>


                        {/* Button Submit */}
                        <div className="w-full flex flex-col">
                            <div className="w-full h-10 bg-my-green rounded-lg flex justify-center items-center cursor-pointer" onClick={(e) => handleSubmitSignUpVerification(e)}>
                                <button className="text-white cursor-pointer" type="submit">Done</button>
                            </div>
                        </div>
                    </form>
                    
                </div>

            </div>
        </>
    )
}

export default SignUpVerification;