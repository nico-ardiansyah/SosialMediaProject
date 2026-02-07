import "../index.css";


// Hooks
import { useAuthHooks } from "../component/AuthPage/Hooks/AuthHooks";

// component
import SignUp from "../component/AuthPage/SignUp/SignUp";
import SignIn from "../component/AuthPage/SignIn/SignIn";
import ForgotPassword from "../component/AuthPage/ForgotPassword/ForgotPassword";
import ChangePassword from "../component/AuthPage/ForgotPassword/ChangePassword/ChangePassword";
import SignUpVerification from "../component/AuthPage/SignUp/SignUpVerification/SignUpVerification";
import SignUpVerificationSuccess from "../component/AuthPage/SignUp/SignUpVerification/SignUpVerificationSuccess";
import ChangePasswordSuccessfully from "../component/AuthPage/ForgotPassword/ChangePassword/ChangePasswordSuccesfully";
import ErrorModal from "../component/ErrorModal/ErrorModal";
import LoadingAnimation from "../component/LoadingAnimation/LoadingAnimation";

const MainPage = () => {
    const { showMenu, handleShowSignIn, handleShowSignUp, loading, errorModal, setErrorModal, errorMessage } = useAuthHooks();

    let components;
    if (showMenu === "signin") {
        components = <SignIn />;
    } else if (showMenu === "signup") {
        components = <SignUp />;
    } else if (showMenu === "forgotpassword") {
        components = <ForgotPassword />;
    } else if (showMenu === "changepassword") {
        components = <ChangePassword />;
    } else if (showMenu === "signupverification") {
        components = <SignUpVerification />;
    } else if (showMenu === "signupsuccessfully") {
        components = <SignUpVerificationSuccess />;
    } else if (showMenu === "changepasswordsuccessfully") {
        components = <ChangePasswordSuccessfully />
    }

    let backgroundColor;
    if (showMenu === "signin") {
        backgroundColor = "bg-black"
    } else if (showMenu === "signup" || showMenu === "signupverification" || showMenu === "signupsuccessfully") {
        backgroundColor = "bg-white"
    } else if (showMenu === "forgotpassword" || showMenu === "changepassword" || showMenu === "changepasswordsuccessfully") {
        backgroundColor = "bg-[#00695C]"
    };

    return (
        <>
            {loading && <LoadingAnimation />}
            {errorModal && <ErrorModal message={errorMessage} closeModal={setErrorModal} handleCloseAllModal={""} />}
            <div className="fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center border-none bg-emerald-950/20 text-white font-semibold p-4">
                <div className="w-full max-w-lg h-[90%] bg-neutral-900 rounded-lg border border-white/20 flex flex-col">
                    <div className={`h-10 flex justify-center rounded-t-lg transition-all duration-500 ${showMenu === "signin" ? "bg-black" : "bg-white"}`}>
                        <div className={`cursor-pointer w-1/2 flex justify-center items-center rounded-br-md rounded-tl-lg bg-black text-white ${showMenu === "signin" ? "" : "border-b border-b-white/20 border-r border-r-white/20 "}`} onClick={handleShowSignIn}>
                            <span>Sign In</span>
                        </div>
                        <div className={`cursor-pointer w-1/2 flex justify-center items-center rounded-bl-md rounded-tr-lg bg-white text-black ${showMenu === "signup" ? "" : "border-b border-b-white/20 border-l border-l-white/20"}`} onClick={handleShowSignUp}>
                            <span>Sign Up</span>
                        </div>
                    </div>

                    {/* form */}
                    <div className={`w-full flex-1 flex justify-center items-center rounded-b-lg transition-all duration-500 ${backgroundColor}`}>
                        {/* route */}
                        {components }
                    </div>
                </div>
            </div>
        </>
    )
}


export default MainPage;