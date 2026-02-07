import axios from "axios";
import { useNavigate } from "react-router";

// hooks
import { useNavigationUserProfileHooks } from "../../Profile/Hooks/NavigationUserProfileHooks";
import { useState } from "react";

const useDetailPostServices = () => { 
    const apiUrl = import.meta.env.VITE_API_URL;
    const { setLoadPage, setLoading, setErrorModal, setErrorMessage, setShowComment } = useNavigationUserProfileHooks();
    const [error, setError] = useState("");


    const GetDetailPost = async (postId) => {
        setLoading(true);
        try {
            const result = await axios.get(`${apiUrl}/post-detail/${postId}`, {
                headers: {
                    "Content-Type" : "application/json"
                },
                withCredentials: true
            })
            return result?.data?.post;
        } catch (e) {
            const msg = e?.response?.data?.message;
            setErrorModal(true)
            setErrorMessage(msg)
        } finally { setLoading(false) }
    };

    const handleUploadComment = (postId, content, selectedImage, e) => {
        e.preventDefault();
        setLoading(true);
        setLoadPage(false);

        const formData = new FormData();
        formData.append("content", content);
        formData.append("file", selectedImage)
        axios.post(`${apiUrl}/${postId}/upload-comment`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            },
            withCredentials : true
        })
            .then(() => {
                setShowComment(false)
                setLoadPage(true)
            })
            .catch(e => {
                const er = e?.response?.data?.error;
                if (er) setError(er)
                
                const msg = e?.response?.data?.message;
                if (msg) {
                    setErrorModal(true)
                    setErrorMessage(msg)
                }
            })
            .finally(() => setLoading(false))
    };

    const handleLikedComment = (commentId, e) => { 
        e.preventDefault();
        setLoadPage(false);
        setLoading(true)

        axios.post(`${apiUrl}/${commentId}/liked-comment`, {}, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        })
            .then(() => setLoadPage(true))
            .catch(e => {
                const msg = e?.response?.data?.message;
                setErrorModal(true)
                setErrorMessage(msg)
            })
            .finally(() => setLoading(false))
    };

    const handleDeletedComment = (commentId, e) => { 
        e.preventDefault()
        setLoadPage(false);
        setLoading(true)

        axios.delete(`${apiUrl}/delete-comment/${commentId}`, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        })
            .then(() => setLoadPage(true))
            .catch(e => {
                const msg = e?.response?.data?.message;
                setErrorModal(true)
                setErrorMessage(msg)
            })
            .finally(() => setLoading(false))
    };

    return {
        GetDetailPost,
        handleUploadComment,
        handleLikedComment,
        handleDeletedComment,
        error,
        setError
    }
};


export default useDetailPostServices;