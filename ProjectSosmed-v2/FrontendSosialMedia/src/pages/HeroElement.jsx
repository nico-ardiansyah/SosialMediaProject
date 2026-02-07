import "../index.css";
import { useSearchParams, useParams, useNavigate } from "react-router";
import axios from "axios"

// component
import Navigation from "../component/Navbar/Navigation";
import PostFeed from "../component/PostFeed/PostFeed";
import UserProfile from "../component/Profile/UserProfile/UserProfile";
import CreatePost from "../component/CreatePost/CreatePost";
import Notification from "../component/Notification/Notification";
import ErrorModal from "../component/ErrorModal/ErrorModal";
import LoadingAnimation from "../component/LoadingAnimation/LoadingAnimation";
import DetailPostModal from "../component/DetailPost/DetailPostModal";

// hooks
import { useNavigationUserProfileHooks } from "../component/Profile/Hooks/NavigationUserProfileHooks";
import { useEffect, useState } from "react";

const HeroElement = () => {
    const [params] = useSearchParams();
    const menu = params.get("menu") || "profile";
    const { userProfileId, loadPage, setErrorModal, errorModal, loading, errorMessage, setErrorMessage, showDetailPostModal, selectedPostId, handleCloseDetailPost } = useNavigationUserProfileHooks();
    const apiUrl = import.meta.env.VITE_API_URL;
    const userId = localStorage.getItem("currentUserId");
    const [userID, setUserID] = useState();

    let components;
    // handle show component
    if (menu === "feed") {
        components = <PostFeed />;
    } else if (menu === "profile") {
        components = <UserProfile userId={userId || userID}/>;
    } else if (menu === "createpost") {
        components = <CreatePost userId={userId || userID} />
    } else if (menu === "notification") {
        components = <Notification userId={userId || userID} />
    } else if (menu === "userprofile") {
        components = <UserProfile userId={userProfileId}/>
    };

    useEffect(() => { 
        const fetch = async () => { 
            axios.get(`${apiUrl}/user-info`,
                { withCredentials: true }
            )
                .then(res => (
                    setUserID(res?.data?.id),
                    localStorage.setItem("currentUserId", res?.data?.id)
                ))
                .catch(e => {
                    const msg = e?.response?.data?.message;
                    if (msg) {
                        setErrorModal(true);
                        setErrorMessage(msg)
                    }

                })
        }; 

        fetch();

    }, [loadPage]);

    return (
        <>
            {loading && <LoadingAnimation />}
            {errorModal && <ErrorModal message={errorMessage} closeModal={setErrorModal} handleCloseAllModal={handleCloseDetailPost}  />}
            {/* Detail Post Modal */}
            {showDetailPostModal && <DetailPostModal postId={selectedPostId}/>}
            
            <Navigation userId={userId || userID} />
            {/* Hero Element */}
            <section className="fixed top-0 left-0 right-0 bottom-0 bg-transparent border-none flex justify-center items-center px-4 overflow-y-auto scrollbar-hide">
                {/* content element */}
                <div className="w-full max-w-[600px] bg-transparent border-none flex items-center flex-col gap-3 pt-20 max-h-full min-h-screen">
                    { components }
                </div>
            </section>
        </>
    )
}

export default HeroElement;