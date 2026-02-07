import "../../../index.css";
import { ChatBubbleOvalLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

// Hooks
import useAuthServices from "../Services/useAuthServices";

const ForgotPassword = () => {
    const { handleSubmitForgotPassword, setEmail, errors } = useAuthServices();

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
                    <span className="text-white/40 font-poppins font-extralight text-sm">Sign In Your Email to Change Password</span>
                </div>

                {/* Form */}
                <div className="w-full flex-1 text-white/70">
                    <form action="" className="gap-5 flex flex-col">
                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-light">
                                Email Address
                            </label>
                            <div className="relative flex flex-col">
                                <EnvelopeIcon className="w-5 h-5 text-white absolute top-[25%] ml-2"/>
                                <input type="email" id="email" placeholder="Enter Your Email" required className="pl-10 h-10 border border-gray-200/50 rounded-lg font-light focus:ring-my-green focus:border-my-green focus:outline-none focus:ring-2 focus:shadow-[0_0_10px] focus:shadow-my-green" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            {errors?.email && <span className=" text-red-600 text-[12px]">{errors?.email}</span>  }
                        </div>


                        {/* Button Submit */}
                        <div className="w-full flex flex-col">
                            <div className="w-full h-10 bg-my-green rounded-lg flex justify-center items-center cursor-pointer" onClick={(e) => handleSubmitForgotPassword(e)}>
                                <button className="text-white cursor-pointer" type="submit">Send Code</button>
                            </div>
                        </div>
                    </form>
                    
                </div>

            </div>
        </>
    )
};

export default ForgotPassword;