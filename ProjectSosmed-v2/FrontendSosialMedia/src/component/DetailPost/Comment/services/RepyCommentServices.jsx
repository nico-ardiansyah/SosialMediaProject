import axios from "axios";
import { useNavigationUserProfileHooks } from "../../../Profile/Hooks/NavigationUserProfileHooks";
import { useState } from "react";

const useReplyCommentServices = () => { 
    const apiUrl = import.meta.env.VITE_API_URL;
    const { setLoadPage, setErrorModal, setErrorMessage, setLoading, setShowReplycommentForm } = useNavigationUserProfileHooks();
    const [error, setError] = useState("");

    const GetCommentAccess = async (commentId) => {
        setLoading(true);
        try {
            
            const result = await axios.get(`${apiUrl}/comment/${commentId}`, {
                headers: {
                    "Content-Type" : "application/json"
                },
                withCredentials : true
            })
            return result?.data?.comment;
        } catch (e) {
            const msg = e?.response?.data?.message;
            setErrorModal(true)
            setErrorMessage(msg)
        } finally {setLoading(false)}
        
    };

    const handleUploadReplycomment = (content,selectedImage,commentId,e) => { 
        e.preventDefault();
        setLoadPage(false);
        setLoading(true);


        const formData = new FormData();
        formData.append("content", content);
        formData.append("file", selectedImage)

        axios.post(`${apiUrl}/${commentId}/upload-replycomment`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            },
            withCredentials : true
        })
            .then(() => {
                setShowReplycommentForm(false)
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

    const handleLikeReplycomment = (replycommentId,e) => { 
        e.preventDefault();
        setLoadPage(false);
        setLoading(true)

        axios.post(`${apiUrl}/${replycommentId}/liked-replycomment`, {}, {
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

    const handleDeleteReplycomment = (replycommentId, e) => { 
        e.preventDefault();
        setLoadPage(false);
        setLoading(true)

        axios.delete(`${apiUrl}/${replycommentId}/delete-replycomment`, {
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
        GetCommentAccess,
        handleUploadReplycomment,
        handleLikeReplycomment,
        handleDeleteReplycomment,
        error,
        setError
    }
};


export default useReplyCommentServices;