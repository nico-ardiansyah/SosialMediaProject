import "../../../index.css";
import { HeartIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/16/solid";
import axios from "axios";

// component
import DetailPostModal from "../../DetailPost/DetailPostModal";
import CommentModal from "../../DetailPost/Comment/ReplyComment/CommentModal";

// hooks
import { useNavigationUserProfileHooks } from "../../Profile/Hooks/NavigationUserProfileHooks";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import React,{ useState } from "react";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("id");

const AllNotifications = ({ data }) => {
    const apiImage = import.meta.env.VITE_IMAGE_API_URL;
    const { setLoadPage, showCommentModal, setShowCommentModal, setErrorModal, setErrorMessage, setShowDetailPostModal, setSelectedPostId } = useNavigationUserProfileHooks();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [selectedNotificationId, setSelectedNotificationId] = useState(null);

    const ShowTimePost = (DatePost) => {
        const date = dayjs(DatePost);
        const diffInHours = dayjs().diff(date, "hour");
        if (diffInHours < 24) {
            return date.fromNow()
        } else {
            return date.format("DD MMM YYYY, HH:mm")
        }
    };

    const handleReadNotification = (notifId,e) => { 
        e.preventDefault();
        setLoadPage(false);

        axios.patch(`${apiUrl}/read-notification/${notifId}`, {}, {
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
    };

    const handleContentModal = (notif) => { 
        if (notif?.post) {
            setShowDetailPostModal(true)
            setSelectedPostId(notif?.post?._id)
        } else if (notif?.comment?.post) {
            setShowDetailPostModal(true)
            setSelectedPostId(notif?.comment?.post?._id)
        } else if (notif?.replyComment) {
            setShowCommentModal(true);
            setSelectedNotificationId(notif?.replyComment?.comment)
        }

    };

    return (
        <>
            {data?.notifications?.map((notification, i) => (
                <React.Fragment key={notification._id || i}>
                    <>
                        {notification?.isRead === false ? (
                            <div className="p-1 border border-white/10 rounded-lg bg-card">
                                <div className="flex border border-white/10 rounded-lg bg-black/30 gap-2 md:gap-5 p-2 cursor-pointer" onClick={(e) => {
                                    handleReadNotification(notification._id, e),
                                    handleContentModal(notification)
                                }}>
                                    {/* user profile */}
                                    <div className="flex justify-center items-center">
                                        {notification?.sender?.avatar?.fileId ? (
                                            <img src={`${apiImage}/${notification?.sender?.avatar?.fileId}` } alt="" className="w-10 h-10 object-cover object-center rounded-full"/>
                                        ) : (<div className="w-10 h-10 object-cover object-center rounded-full animate-pulse bg-gray-300"></div>
                                        ) }
                                    </div>

                                    {/* the information */}
                                    <div className="flex-col flex gap-2">
                                        <div className="flex gap-1 items-center">
                                            {notification?.type === "like" && (<HeartIcon className="w-5 h-5 text-red-500" />)}
                                            {notification?.type === "comment" && (<ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-blue-600" />)}
                                            {notification?.type === "replycomment" && (<ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-blue-600" />)}
                                            
                                            <span className="font-semibold text-[13px] md:text-lg">{notification?.message }</span>
                                        </div>

                                        <span className="font-light text-sm md:text-[15px]">{notification?.post?.content?.slice(0, 15) }...</span>

                                        <span className="text-[12px] md:text-[13px]" >{ShowTimePost(notification?.createdAt) }</span>
                                    </div>
                                </div>

                            </div>
                        ) : (
                                <div className="p-1 border border-white/10 rounded-lg bg-card cursor-pointer" onClick={() => handleContentModal(notification)}>
                                    <div className="flex border border-white/10 rounded-lg gap-2 md:gap-5 p-2">
                                        {/* user profile */}
                                        <div className="flex justify-center items-center">
                                            {notification?.sender?.avatar?.fileId ? (
                                                <img src={`${apiImage}/${notification?.sender?.avatar?.fileId}` } alt="" className="w-10 h-10 object-cover object-center rounded-full"/>
                                            ) : (<div className="w-10 h-10 object-cover object-center rounded-full animate-pulse bg-gray-300"></div>
                                            ) }
                                        </div>

                                        {/* the information */}
                                        <div className="flex-col flex gap-2">
                                            <div className="flex gap-3 items-center">
                                                {notification?.type === "like" && (<HeartIcon className="w-5 h-5 text-red-500" />)}
                                                {notification?.type === "comment" && (<ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-blue-600" />)}
                                                {notification?.type === "replycomment" && (<ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-blue-600" />)}
                                                <span className="font-semibold text-[13px] md:text-lg">{notification?.message}</span>
                                            </div>

                                            <span className="font-light text-sm md:text-[15px]">{notification?.post?.content?.slice(0, 15) }...</span>

                                            <span className="text-[12px] md:text-[13px]" >{ShowTimePost(notification?.createdAt) }</span>
                                        </div>
                                    </div>

                                </div>
                        ) }
                    </>
                </React.Fragment>
            ))}
            {showCommentModal && <CommentModal commentId={selectedNotificationId} />}
        </>


    )
};

export default AllNotifications;