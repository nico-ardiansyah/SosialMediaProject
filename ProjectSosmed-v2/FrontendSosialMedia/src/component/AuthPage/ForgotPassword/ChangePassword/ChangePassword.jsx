import { useState } from "react";
import "../../../../index.css";
import { ChatBubbleOvalLeftIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import useAuthServices from "../../Services/useAuthServices";
import { useEffect } from "react";


const ChangePassword = () => {
    const { setCode, setConfirmPassword, setPassword, handleCreateNewPassword, errors, handleResendCodeRequest } = useAuthServices();
    const [showPassword, setShowPassword] = useState("password");
    const [showConfirmPassword, setShowConfirmPassword] = useState("password");
    const [countdown, setCountdown] = useState(120);

    useEffect(() => {
        if (countdown <= 0) return

        const interval = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [countdown])



    const handleShowConfirmPassword = () => {
        if (showConfirmPassword === "password") {
            setShowConfirmPassword("text");
        } else {
            setShowConfirmPassword("password");
        }
    };
    const handleShowPassword = () => {
        if (showPassword === "password") {
            setShowPassword("text");
        } else {
            setShowPassword("password");
        }
    };

    return (
        <>
            <div className="w-[80%] flex flex-col justify-center items-center text-[#dad8d8] font-poppins py-3 mb-7 animate-popup">
                <div className="flex flex-col items-center mb-5 gap-3">
                    <div className="flex gap-2 items-center mb-3">
                        <ChatBubbleOvalLeftIcon className="w-10 h-10 bg-my-green text-white rounded-lg p-2" />
                        <span className="text-white font-extrabold text-3xl flex">
                            <h1 className="text-4xl italic">M</h1>
                            <h1 className="text-2xl italic">A</h1>
                            <h1 className="text-2xl self-end">N</h1>
                            <h1 className="text-2xl self-center italic">D</h1>
                            a
                            <h1 className="text-3xl">L</h1>
                            a
                        </span>
                    </div>
                    <span className="text-white font-bold font-poppins text-2xl">Change Password</span>
                    <span className="text-white/40 font-poppins font-extralight text-sm">Set New Password For Your Account</span>
                    {countdown >= 1 ? <span className="text-white">Resend code available in {countdown}s</span> : null}
                    {countdown === 0 ? <span className="text-white">Send code <span className="text-my-green cursor-pointer" onClick={(e) => {handleResendCodeRequest(e), setCountdown(120)}}>again</span></span> : null }
                </div>

                {/* Form */}
                <div className="w-full flex-1 text-white/70">
                    <form action="" className="gap-5 flex flex-col">
                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label htmlFor="code" className="font-light">
                                Code
                            </label>
                            <div className="relative flex flex-col">
                                <EnvelopeIcon className="w-5 h-5 text-white absolute top-[25%] ml-2"/>
                                <input type="text" id="code" placeholder="Enter Your Code" required className="pl-10 h-10 border border-gray-200/50 rounded-lg font-light focus:ring-my-green focus:border-my-green focus:outline-none focus:ring-2 focus:shadow-[0_0_10px] focus:shadow-my-green" onChange={(e) => setCode(e.target.value)}/>
                            </div>
                            {errors?.codeError && <span className=" text-red-600 text-[12px]">{errors?.codeError}</span>}
                        </div>
                        
                        {/* Password */}
                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-light">
                                New Password
                            </label>
                            <div className="flex flex-col relative">
                                <LockClosedIcon className="w-5 h-5 text-white absolute top-[25%] ml-2"/>
                                <input type={showPassword} id="password" placeholder="Enter Your New Password" required className="pl-10 h-10 border border-gray-200/50 rounded-lg font-light focus:ring-my-green focus:border-my-green focus:outline-none focus:ring-2 focus:shadow-[0_0_10px] focus:shadow-my-green" onChange={(e) =>setPassword(e.target.value)}/>
                                <div className="absolute top-[25%] right-2" onClick={handleShowPassword}>
                                    {showPassword === "password" ? (
                                        <EyeSlashIcon className="w-5 h-5 text-white " />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 text-white " />
                                    ) }
                                </div>
                            </div>
                            {errors?.password && <span className=" text-red-600 text-[12px]">{errors?.password}</span>  }
                        </div>

                        {/* Confirm password */}
                        <div className="flex flex-col">
                            <label htmlFor="confirmpassword" className="font-light">
                                Confirm Password
                            </label>
                            <div className="flex flex-col relative">
                                <LockClosedIcon className="w-5 h-5 text-white absolute top-[25%] ml-2"/>
                                <input type={showConfirmPassword} id="confirmpassword" placeholder="Confirm Your Password" required className="pl-10 h-10 border border-gray-200/50 rounded-lg font-light focus:ring-my-green focus:border-my-green focus:outline-none focus:ring-2 focus:shadow-[0_0_10px] focus:shadow-my-green" onChange={(e) => setConfirmPassword(e.target.value)}/>
                                <div className="absolute top-[25%] right-2" onClick={handleShowConfirmPassword}>
                                    {showConfirmPassword === "password" ? (
                                        <EyeSlashIcon className="w-5 h-5 text-white " />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 text-white " />
                                    ) }
                                </div>
                            </div>
                            {errors?.confirmPassword && <span className=" text-red-600 text-[12px]">{errors?.confirmPassword}</span>  }
                        </div>


                        {/* Button Submit */}
                        <div className="w-full flex flex-col">
                            <div className="w-full h-10 bg-my-green rounded-lg flex justify-center items-center cursor-pointer" onClick={(e) => handleCreateNewPassword(e)}>
                                <button className="text-white cursor-pointer" type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                    
                </div>

            </div>
        </>
    )
};

export default ChangePassword;