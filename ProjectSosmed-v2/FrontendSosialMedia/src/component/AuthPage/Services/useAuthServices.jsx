import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

// hooks
import { useAuthHooks } from "../Hooks/AuthHooks";


const useAuthServices = () => {
    const { handleSignUpVerification, handleSignUpSuccessfully, handleChangePassword, handleChangePasswordSuccessfully, setErrorModal, setLoading, setErrorMessage } = useAuthHooks();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        verificationError: '',
        forgotPasswordError : '',
        codeError: ''
    });

    // sign in function
    const handleSubmitSignIn = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        axios.post(`${apiUrl}/auth/signin`, {
            email,
            password
        }, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials: true
        })
            .then((res) => {
                navigate("/app?menu=profile")
            })
            .catch((err) => {
                const result = err?.response?.data;
                setErrors(prev => ({
                    ...prev,
                    ...(result?.email && { email: result.email }),
                    ...(result?.password && { password: result.password }),
                }));
                
                if (result?.message) {
                    setErrorModal(true),
                    setErrorMessage(result?.message)
                }
            })
            .finally(() => setLoading(false))
    };

    // sign up function
    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);
        
        axios.post(`${apiUrl}/auth/signup`, {
            email,
            password,
            confirmPassword,
            username
        }, {
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then(() => {
                handleSignUpVerification(),
                localStorage.setItem('EMAIL', email)
            })
            .catch(err => {
                const result = err?.response?.data;
                setErrors(prev => ({
                    ...prev,
                    ...(result.username && { username: result.username }),
                    ...(result.email && { email: result.email }),
                    ...(result.password && { password: result.password }),
                    ...(result.confirmPassword && { confirmPassword: result.confirmPassword }),
                }));

                if (result?.message) {
                    setErrorModal(true),
                    setErrorMessage(result?.message)
                };
            })
            .finally(() => setLoading(false))
    };

    // Resend code verify function
    const handleResendCodeRequest = (e) => {
        e.preventDefault();
        setErrors(null);

        const EMAIL = localStorage.getItem("EMAIL");

        axios.post(`${apiUrl}/resend-code`, {
            email : EMAIL
        }, {
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then()
            .catch(err => {
                const result = err?.response?.data;
                if (result?.message) {
                    setErrorModal(true)
                    setErrorMessage(result?.message)
                };
            })
    }

    // sign up verify function
    const handleSubmitSignUpVerification = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        const EMAIL = localStorage.getItem('EMAIL');

        axios.post(`${apiUrl}/signup/verify`, {
            email: EMAIL,
            code
        }, {
            headers : "application/json"
        })
            .then(() => {
                handleSignUpSuccessfully();
                localStorage.removeItem("EMAIL");
            })
            .catch((err) => {
                const result = err?.response?.data;
                
                setErrors(prev => ({ 
                    ...prev,
                    ...(result?.code && { codeError: result.code })
                }));

                if (result?.message) {
                    setErrorModal(true),
                    setErrorMessage(result?.message)
                };
            })
            .finally(() => setLoading(false))
    };

    // request forgot pass function
    const handleSubmitForgotPassword = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);
        
        axios.post(`${apiUrl}/forgot-password`, {
            email
        }, {
            headers : "application/json"
        })
            .then(() => {
                handleChangePassword()
                localStorage.setItem("EMAIL", email)
            })
            .catch((err) => {
                const result = err?.response?.data;
                if (result?.email) return setErrors(err => ({ ...err, email: result?.email }))
                if (result?.message) {
                    setErrorModal(true);
                    setErrorMessage(result?.message)
                }
            })
            .finally(() => setLoading(false))
    };

    // change new pass function
    const handleCreateNewPassword = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        const EMAIL = localStorage.getItem("EMAIL");
        axios.post(`${apiUrl}/reset-password`, {
            email: EMAIL,
            code,
            password,
            confirmPassword
        })
            .then(() => {
                handleChangePasswordSuccessfully();
                localStorage.removeItem("EMAIL")
            })
            .catch((err) => { 
                const result = err?.response?.data;
                setErrors(prev => ({
                    ...prev,
                    ...(result?.code && { codeError : result.code}),
                    ...(result?.password && { password: result.password }),
                    ...(result?.confirmPassword && { confirmPassword : result.confirmPassword})
                }));

                if (result?.message) {
                    setErrorModal(true);
                    setErrorMessage(result?.message)
                };
            })
            .finally(() => setLoading(false));
    };

    return {
        errors,
        handleSubmitSignIn,
        setEmail,
        setPassword,
        setConfirmPassword,
        setUsername,
        handleSubmitSignUp,
        handleSubmitSignUpVerification,
        setCode,
        handleSubmitForgotPassword,
        handleCreateNewPassword,
        handleResendCodeRequest,
    }
    
};

export default useAuthServices;