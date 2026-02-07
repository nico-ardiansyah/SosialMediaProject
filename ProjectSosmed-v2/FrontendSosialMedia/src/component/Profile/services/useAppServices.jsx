import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

// hooks
import { useNavigationUserProfileHooks } from "../Hooks/NavigationUserProfileHooks";

const useAppServices = () => {
    const { setLoadPage, setErrorModal, setLoading, setErrorMessage } = useNavigationUserProfileHooks();
    const apiUrl = import.meta.env.VITE_API_URL;
    const Navigate = useNavigate();
    const [error, setError] = useState("");

    const GetAccessAppProfile = async (userId) => {
        if (userId) {
            setLoading(true);

            try {
                const result = await axios.get(`${apiUrl}/${userId}/profile`, {
                    withCredentials : true,
                });
                return result?.data?.user;
            } catch (e) {
                const msg = e?.response?.data?.message;
                setErrorMessage(msg)
                setErrorModal(true)
            } finally {
                setLoading(false)
            }
        }
    };

    const handleDeletePost = (postId, e) => {
        e.preventDefault();
        setLoading(true);
        setLoadPage(false);

        axios.delete(`${apiUrl}/delete-post/${postId}`, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials: true
        })
            .then(() => setLoadPage(true))
            .catch((e) => {
                const msg = e?.response?.data?.message;
                setErrorModal(true);
                setErrorMessage(msg)
            })
            .finally(() => {
                setLoading(false)
            })
    };

    const handlePostLike = (postId, e) => {
        e.preventDefault();
        setLoadPage(false);
        setLoading(true);

        axios.post(`${apiUrl}/${postId}/liked-post`, {}, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials : true,
        })
            .then(() => setLoadPage(true))
            .catch((e) => {
                const msg = e?.response?.data?.message;
                setErrorModal(true);
                setErrorMessage(msg)
            })
    };

    const handleUploadAvatar = (file,e) => { 
        e.preventDefault();
        setLoadPage(false);
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        axios.post(`${apiUrl}/upload-avatar`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            },
            withCredentials : true,
        })
            .then(() => setLoadPage(true))
            .catch(e => {
                const er = e?.response?.data?.error;
                const msg = e?.response?.data?.message;

                if (er) {
                    setError(er)
                };

                if (msg) {
                    setErrorModal(true)
                    setErrorMessage(msg)
                }
            })
            .finally(() => setLoading(false))
    };

    const handleChangeName = (name,e) => { 
        e.preventDefault();
        setLoadPage(false);
        setLoading(true);

        axios.post(`${apiUrl}/change-name`, {name}, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials : true,
        })
            .then(() => setLoadPage(true))
            .catch(e => {
                const er = e?.response?.data?.message;
                const msg = e?.response?.data?.message;

                if (er) setError(er)

                if (msg) {
                    setErrorModal(true)
                    setErrorMessage(msg)
                }
            })
            .finally(() => setLoading(false))
    };

    const handleChangeBio = (bio, e) => { 
        e.preventDefault();
        setLoadPage(false);
        setLoading(true);

        axios.post(`${apiUrl}/change-bio`, {bio}, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials : true,
        })
            .then(() => setLoadPage(true))
            .catch(e => {
                const er = e?.response?.data?.error;
                const msg = e?.response?.data?.message;

                if (er) setError(er)
                
                if (msg) {
                    setErrorModal(true)
                    setErrorMessage(msg)
                }
            })
            .finally(() => setLoading(false))
    };

    const handleDeleteMenu = (deleteMenu,e) => { 
        e.preventDefault();
        setLoadPage(false);

        axios.delete(`${apiUrl}/${deleteMenu}`, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials : true,
        })
            .then(() => setLoadPage(true))
            .catch(e => {
                const er = e?.response?.data?.error;
                if (er) {
                    setError(er)
                };

                const msg = e?.response?.data?.message;
                if (msg) {
                    setErrorModal(true);
                    setErrorMessage(msg)
                }
            })

    };

    const handleEditPost = (content,postId, e) => { 
        e.preventDefault();
        setLoadPage(false);
        setLoading(true);

        axios.put(`${apiUrl}/update-post/${postId}`, { content }, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials : true,
        })
            .then(() => setLoadPage(true))
            .catch(e => {
                const er = e?.response?.data?.error;
                const msg = e?.response?.data?.message;

                if (er) setError(er)
                
                if (msg) {
                    setErrorModal(true);
                    setErrorMessage(msg)
                }

            })
            .finally(() => setLoading(false))
    };

    const handleSignOut = () => {
        setLoading(true);
        axios.post(`${apiUrl}/auth/sign-out`, {}, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials: true,
        })
            .then(() => {
                localStorage.removeItem("currentUserId")
                Navigate("/")
            })
            .catch(e => { 
                const msg = e?.response?.data?.message;
                if (msg) {
                    setErrorModal(true)
                    setError(msg)
                }
            })
            .finally(() => setLoading(false))
    };

    return {
        GetAccessAppProfile,
        handleDeletePost,
        handlePostLike,
        handleUploadAvatar,
        handleChangeName,
        handleChangeBio,
        handleDeleteMenu,
        handleEditPost,
        handleSignOut,
        error
    };

};

export default useAppServices;