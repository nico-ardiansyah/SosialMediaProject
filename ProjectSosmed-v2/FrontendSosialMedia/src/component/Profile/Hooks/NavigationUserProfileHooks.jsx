import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const NavigationUserProfileContext = createContext();

export const NavigationUserProfileProvider = ({ children }) => {
    const [showMenu, setShowMenu] = useState("post");
    const [showDetailPostModal, setShowDetailPostModal] = useState(false);
    const [loadPage, setLoadPage] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [showReplycommentForm, setShowReplycommentForm] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [, setSearchParams] = useSearchParams();
    const [userProfileId, setUserProfileId] = useState(null);
    const [followModal, setFollowModal] = useState(false);
    const [editProfileModal, setEditProfileModal] = useState(false);
    const [editPostModal, setEditPostModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedPostId, setSelectedPostId] = useState(null);

    const handleShowPost = () => {
        setShowMenu("post");
    };

    const handleShowMedia = () => {
        setShowMenu("media");
    };


    const handleShowUserProfile = (userId) => { 
        setSearchParams({ menu: "userprofile" });
        setUserProfileId(userId)
    };

    const handleCloseDetailPost = () => {
        setShowDetailPostModal(false);
        setShowCommentModal(false);
        setFollowModal(false);
        setEditProfileModal(false);
        setEditPostModal(false);
        setShowComment(false)
    };

    const isAnyModalOpen = showDetailPostModal ||
            followModal ||
            editPostModal ||
            editProfileModal ||
            showCommentModal ||
            showComment;

    useEffect(() => {
        const handleCloseAllModals = () => {
            setShowDetailPostModal(false);
            setShowCommentModal(false);
            setFollowModal(false);
            setEditProfileModal(false);
            setEditPostModal(false);
            setShowComment(false);
        };
        
        
        if (isAnyModalOpen && window.history.state?.modal !== true) {
            window.history.pushState({ modal: true }, "");
        }

        const handleCLoseModal = () => { 
            if (isAnyModalOpen) {
                handleCloseAllModals();
            }
        };

        window.addEventListener("popstate", handleCLoseModal);

        return () => { window.removeEventListener("popstate", handleCLoseModal) };

    },[isAnyModalOpen]);


    return (
        <NavigationUserProfileContext.Provider
            value={{
                showMenu,
                handleShowPost,
                handleShowMedia,
                handleCloseDetailPost,
                loadPage,
                setLoadPage,
                showComment,
                setShowComment,
                showDetailPostModal,
                setShowDetailPostModal,
                setShowCommentModal,
                showCommentModal,
                showReplycommentForm,
                setShowReplycommentForm,
                userProfileId,
                handleShowUserProfile,
                followModal,
                setFollowModal,
                editProfileModal,
                setEditProfileModal,
                setEditPostModal,
                editPostModal,
                errorModal,
                setErrorModal,
                loading,
                setLoading,
                errorMessage,
                setErrorMessage,
                setSelectedPostId,
                selectedPostId
            }}
        >
            {children}
        </NavigationUserProfileContext.Provider>
    )
};

export const useNavigationUserProfileHooks = () => useContext(NavigationUserProfileContext);