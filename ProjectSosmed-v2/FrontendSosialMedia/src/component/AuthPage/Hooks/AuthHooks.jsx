import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [showMenu, setShowMenu] = useState('signin');
    const [errorModal, setErrorModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleShowSignIn = () => {
        setShowMenu("signin");
    };

    const handleShowSignUp = () => {
        setShowMenu("signup");
    };

    const handleShowForgotPassword = () => {
        setShowMenu("forgotpassword");
    };

    const handleChangePassword = () => {
        setShowMenu("changepassword");
    };

    const handleSignUpVerification = () => {
        setShowMenu("signupverification");
    };

    const handleSignUpSuccessfully = () => {
        setShowMenu("signupsuccessfully");
    };

    const handleChangePasswordSuccessfully = () => {
        setShowMenu("changepasswordsuccessfully");
    };
    
    return (
        <AuthContext.Provider
            value={{
                showMenu,
                handleShowForgotPassword,
                handleShowSignIn,
                handleShowSignUp,
                handleChangePassword,
                handleSignUpVerification,
                handleSignUpSuccessfully,
                handleChangePasswordSuccessfully,
                errorModal,
                setErrorModal,
                loading,
                setLoading,
                errorMessage,
                setErrorMessage
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthHooks = () => useContext(AuthContext);