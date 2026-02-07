import "../../index.css";
import { XCircleIcon, HeartIcon as HeartIconOutline, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, PhotoIcon } from "@heroicons/react/16/solid";
import React,{ useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("id");


// hooks
import { useNavigationUserProfileHooks } from "../Profile/Hooks/NavigationUserProfileHooks";


// services
import useDetailPostServices from "./Services/DetailPostServices";

// component
import CommentForm from "./Comment/CommentForm";
import CommentModal from "./Comment/ReplyComment/CommentModal";


const DetailPostModal = ({ postId }) => {
    const currentUserId = localStorage.getItem("currentUserId")
    const { GetDetailPost, handleLikedComment, handleDeletedComment } = useDetailPostServices();
    const [selectedComment, setSelectedComment] = useState(null);
    const { handleCloseDetailPost, setShowComment, showComment, loadPage, showCommentModal, setShowCommentModal, handleShowUserProfile } = useNavigationUserProfileHooks();
    const [data, setData] = useState(null);
    const apiImage = import.meta.env.VITE_IMAGE_API_URL;

    const ShowTimePost = (DatePost) => {
        const date = dayjs(DatePost);
        const diffInHours = dayjs().diff(date, "hour");
        if (diffInHours < 24) {
            return date.fromNow()
        } else {
            return date.format("DD MMM YYYY, HH:mm")
        }
    };


    useEffect(() => { 
        const fetch = async() => { 
            const result = await GetDetailPost(postId);
            setData(result);
        };


        fetch();

    }, [loadPage]);
    
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-xs flex justify-center items-center pt-15 overflow-hidden px-4 font-poppins text-white z-10" onClick={handleCloseDetailPost}>
                <div className="w-full max-w-[500px] h-[95%] border border-white/20 rounded-lg bg-black/90 overflow-y-auto scrollbar-hide p-4" onClick={(e) => e.stopPropagation()}>
                    {/* user profile */}
                    <div className="flex gap-3 items-center border-b border-b-white mb-2 pb-2">
                        {/* foto profile */}
                        {data?.author?.avatar?.fileId ? (
                            <img src={`${apiImage}/${data?.author?.avatar?.fileId}`} alt="profile" className="w-10 h-10 rounded-full object-cover object-center" />
                        ) : (<div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />) }
                        
                        {/* username */}
                        <div className="flex-1 flex flex-col justify-center min-w-0 cursor-pointer" onClick={() => handleShowUserProfile(data?.author?._id)}>
                            <span className="text-lg break-words">@{data?.author?.username}</span>
                            <span className="text-sm">{ShowTimePost(data?.createdAt)}</span>
                        </div>
    
    
                    </div>
    
    
                    {/* content */}
                    <div className="flex gap-3 flex-col min-w-0">
                        {/* Content text */}
                        {data?.content ? (<span className="font-normal text-sm break-words">{data?.content}</span>) : null}
    
                        {/* content picture */}
                        <div className="flex max-w-fit overflow-x-auto scrollbar-hide gap-3">
                            {data?.files && (
                                data?.files?.map((file, i) => (
                                    <img key={file?._id || i} src={`${apiImage}/${file?.fileId}`} alt="content" className="rounded-lg max-w-80 w-full max-h-80 object-cover object-center" />
                                ))
                            )}
                        </div>
    
                        <div className="border-t border-t-white border-b border-b-white p-1 flex gap-5">
                            <div className="flex items-center gap-3 p-2 rounded-lg" >
                                {data?.likes?.includes(currentUserId) ? <HeartIconSolid className="w-5 h-5 text-red-500" /> : <HeartIconOutline className="w-5 h-5 text-white" />}
                                <span>{data?.likes?.length}</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-my-green transition-colors duration-500 cursor-pointer" onClick={() => setShowComment(true)}>
                                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                <span>{data?.comments?.length}</span>
                            </div>
                        </div>
    
                        {/* comment */}
                        {data?.comments?.map((comment, i) => (
                            <React.Fragment key={comment?._id || i}>
                                <div className="flex gap-2">
                                    {/* picture */}
                                    <img src={`${apiImage}/${comment?.author?.avatar?.fileId}`} alt="pict" className="w-9 h-9 rounded-full object-cover object-center" />
                                    
                                    {/* comment */}
                                    <div className="flex-1 flex flex-col min-w-0">
                                        {/* username */}
                                        <span className="text-lg break-words cursor-pointer" onClick={() => handleShowUserProfile(comment?.author?._id)}>@{comment?.author?.username}</span>

                                        {/* comment content */}
                                        <div className=" bg-card rounded-lg p-2 flex h-fit flex-1">
                                            <span className="text-sm font-normal break-words w-full">{comment?.content}</span>
                                        </div>

                                        {/* image */}
                                        {comment?.file && (
                                            <img src={`${apiImage}/${comment?.file?.fileId}`} alt="comment picture" className="rounded-lg max-w-90 w-full max-h-50 object-cover object-center my-1"/>
                                        ) }
                                        {/* user action */}
                                        <div className="flex h-5 items-center p-1 gap-2">
                                            <span className="text-[13px] cursor-pointer" onClick={(e) => handleLikedComment(comment?._id,e)}>Like({comment?.likes?.length})</span>
                                            <span className="text-[13px] cursor-pointer" onClick={() => {setShowCommentModal(true), setSelectedComment(comment)}}>Reply({comment?.replyComments?.length}) </span>
                                            {comment?.author?._id?.includes(currentUserId) && (<span className="text-[13px] cursor-pointer" onClick={(e) => handleDeletedComment(comment?._id, e)}>Delete</span>) }
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
    
    
                    </div>
    
                </div>
            </div>
            {/* comment */}
            {showComment && <CommentForm postId={data?._id} />}
            {/* replycomment */}
            {showCommentModal && <CommentModal commentId={selectedComment?._id} />}
        </>

    );


};


export default DetailPostModal;