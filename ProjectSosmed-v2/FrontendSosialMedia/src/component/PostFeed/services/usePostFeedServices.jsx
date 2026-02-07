import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { useNavigationUserProfileHooks } from "../../Profile/Hooks/NavigationUserProfileHooks";

const usePostFeedServices = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { setLoadPage, setErrorModal, setErrorMessage, setLoading } = useNavigationUserProfileHooks();

    const GetAccessPostFeed = async() => {
        setLoading(true);

        try {
            const result = await axios.get(`${apiUrl}/post-feed`, {
                headers: {
                    "Content-Type" : "application/json"
                },
                withCredentials : true
            })
            return result?.data?.posts;
        } catch (e) {
            const msg = e?.response?.data?.message;
            setErrorModal(true)
            setErrorMessage(msg)
        } finally {
            setLoading(false)
        }

    };

    const handlePostLike = (postId, e) => {
        e.preventDefault();
        setLoadPage(false)
        setLoading(true);

        axios.post(`${apiUrl}/${postId}/liked-post`, {}, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        })
            .then(() => setLoadPage(true))
            .catch((e) => {
                const msg = e?.response?.data?.message;
                setErrorModal(true)
                setErrorMessage(msg)
            })
            .finally(() => setLoading(false))
    };

    const handleFollow = (userId,e) => { 
        e.preventDefault();
        setLoadPage(false);
        setLoading(true);

        axios.post(`${apiUrl}/${userId}/follow`, {}, {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials: true
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
        GetAccessPostFeed,
        handlePostLike,
        handleFollow
    }

}

export default usePostFeedServices;