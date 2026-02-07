import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useNavigationUserProfileHooks } from "../../Profile/Hooks/NavigationUserProfileHooks";


const useCreatePostServices = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const Navigate = useNavigate();
    const [error, setError] = useState(null);
    const { setErrorMessage, setLoading, setErrorModal } = useNavigationUserProfileHooks();

    const handleSubmitCreatePost = (content, selectedImage, e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();

        formData.append("content", content);
        selectedImage.forEach((file) => {
            formData.append("files", file)
        });

        axios.post(`${apiUrl}/upload-post`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials : true
        })
            .then(() => Navigate("/app?menu=profile"))
            .catch((e) => {
                const er = e?.response?.data?.error;
                const msg = e?.response?.data?.message;

                if (er) {
                    setError(er)
                }

                if (msg) {
                    setErrorModal(true)
                    setErrorMessage(msg)
                }
            })
            .finally(() => setLoading(false))
    };

    return {
        handleSubmitCreatePost,
        error,
        setError
    }

};

export default useCreatePostServices;