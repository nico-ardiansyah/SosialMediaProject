import { useState } from "react";
import "../../../index.css";
import { ChatBubbleOvalLeftIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, UserIcon } from "@heroicons/react/24/outline";

// Hooks
import useAuthServices from "../Services/useAuthServices";


const SignUp = () => {
    const { setUsername, setPassword, setConfirmPassword, handleSubmitSignUp, setEmail, errors } = useAuthServices();
    const [showPassword, setShowPassword] = useState("password");
    const [showConfirmPassword, setShowConfirmPassword] = useState("password");
    
    const handleShowPassword = () => {
        if (showPassword === "password") {
            setShowPassword("text");
        } else {
            setShowPassword("password");
        }
    };
    
    const handleShowConfirmPassword = () => {
        if (showConfirmPassword === "password") {
            setShowConfirmPassword("text");
        } else {
            setShowConfirmPassword("password");
        }
    };


    return (
        <>
            <div className="w-[80%] flex flex-col justify-center items-center font-poppins animate-slide-right text-black">
                <div className="flex flex-col items-center">
                    <div className="flex gap-2 items-center mb-3">
                        <ChatBubbleOvalLeftIcon className="w-10 h-10 bg-my-green text-white rounded-lg p-2" />
                        <span className="font-extrabold text-3xl flex">
                            <h1 className="text-4xl italic">M</h1>
                            <h1 className="text-2xl italic">A</h1>
                            <h1 className="text-2xl self-end">N</h1>
                            <h1 className="text-2xl self-center italic">D</h1>
                            a
                            <h1 className="text-3xl">L</h1>
                            a
                        </span>
                    </div>
                    <span className="font-poppins font-extralight text-sm">Create Your Account</span>
                </div>

                {/* Form */}
                <div className="w-full flex-1">
                    <form className="gap-3 flex flex-col">
                        {/* Username */}
                        <div className="flex flex-col">
                            <label htmlFor="username" className="font-light">
                                Username
                            </label>
                            <div className="relative flex flex-col">
                                <UserIcon className="w-5 h-5 absolute top-[25%] ml-2"/>
                                <input type="text" id="username" placeholder="Enter Your Username" required className="pl-10 h-10 border-3 border-gray-700 rounded-lg font-light focus:ring-my-green focus:border-my-green focus:outline-none focus:ring-2 focus:shadow-[0_0_10px] focus:shadow-my-green" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            {errors?.username && <span className=" text-red-600 text-[12px]">{errors?.username}</span>}
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-light">
                                Email Address
                            </label>
                            <div className="relative flex flex-col">
                                <EnvelopeIcon className="w-5 h-5 absolute top-[25%] ml-2"/>
                                <input type="email" id="email" placeholder="Enter Your Email" required className="pl-10 h-10 border-3 border-gray-700 rounded-lg font-light focus:ring-my-green focus:border-my-green focus:outline-none focus:ring-2 focus:shadow-[0_0_10px] focus:shadow-my-green" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            {errors?.email && <span className=" text-red-600 text-[12px]">{errors?.email}</span>}
                        </div>


                        {/* Password Input */}
                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-light">
                                Password
                            </label>
                            <div className="relative flex flex-col">
                                <LockClosedIcon className="w-5 h-5 absolute top-[25%] ml-2"/>
                                <input type={showPassword} id="password" placeholder="Enter Your Password" required className="pl-10 h-10 border-3 border-gray-700 rounded-lg font-light focus:ring-my-green focus:border-my-green focus:outline-none focus:ring-2 focus:shadow-[0_0_10px] focus:shadow-my-green" onChange={(e) => setPassword(e.target.value)}/>
                                <div className="absolute top-[25%] right-2" onClick={handleShowPassword}>
                                    {showPassword === "password" ? (
                                        <EyeSlashIcon className="w-5 h-5 " />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 " />
                                    ) }
                                </div>
                            </div>
                            {errors?.password && <span className=" text-red-600 text-[12px]">{ errors?.password }</span>  }
                        </div>

                        {/* Confirm Password Input */}
                        <div className="flex flex-col">
                            <label htmlFor="confirmpassword" className="font-light">
                                Confirm Password
                            </label>
                            <div className="relative flex flex-col">
                                <LockClosedIcon className="w-5 h-5 absolute top-[25%] ml-2"/>
                                <input type={showConfirmPassword} id="confirmpassword" placeholder="Enter Your Password" required className="pl-10 h-10 border-3 border-gray-700 rounded-lg font-light focus:ring-my-green focus:border-my-green focus:outline-none focus:ring-2 focus:shadow-[0_0_10px] focus:shadow-my-green" onChange={(e) => setConfirmPassword(e.target.value)}/>
                                <div className="absolute top-[25%] right-2" onClick={handleShowConfirmPassword}>
                                    {showConfirmPassword === "password" ? (
                                        <EyeSlashIcon className="w-5 h-5 " />
                                    ) : (
                                        <EyeIcon className="w-5 h-5 " />
                                    ) }
                                </div>

                            </div>
                            {errors?.confirmPassword && <span className=" text-red-600 text-[12px]">{ errors?.confirmPassword }</span>  }
                        </div>

                        {/* Button Submit */}
                        <div className="w-full flex flex-col">
                            <div className="w-full h-10 bg-my-green rounded-lg flex justify-center items-center cursor-pointer" onClick={(e) => handleSubmitSignUp(e)}>
                                <button className="cursor-pointer text-white">Sign Up</button>
                            </div>
                        </div>
                    </form>
                    
                </div>

            </div>
        </>
    )
};

export default SignUp;