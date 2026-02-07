import "../../../index.css";
import { HeartIcon as HeartIconOutline, ChatBubbleLeftRightIcon, PencilSquareIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid} from "@heroicons/react/16/solid"
import { useNavigationUserProfileHooks } from "../Hooks/NavigationUserProfileHooks";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

// component
import EditProfileModal from "../EditProfile/EditProfileModal";

// hooks
import useAppServices from "../services/useAppServices";
import { useSearchParams } from "react-router";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("id");


const UserPost = ({ data }) => {
    const { handleDeletePost, handlePostLike } = useAppServices();
    const { setShowDetailPostModal, setEditPostModal, editPostModal, setSelectedPostId } = useNavigationUserProfileHooks();
    const [listMenu, setListMenu] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);
    const [showMenuDeletePost, setShowMenuDeletePost] = useState(null);
    const apiImage = import.meta.env.VITE_IMAGE_API_URL;
    const [params] = useSearchParams();
    const curentUserId = localStorage.getItem("currentUserId");

    // user sesion is true = is user own account
    const [userSesion, setUserSesion] = useState(true);

    const ShowTimePost = (DatePost) => {
        const date = dayjs(DatePost);
        const diffInHours = dayjs().diff(date, "hour");
        if (diffInHours < 24) {
            return date.fromNow()
        } else {
            return date.format("DD MMM YYYY, HH:mm")
        }
    };


    const handleShowMenuDeletePost = (postId) => {
        if (showMenuDeletePost === null) {
            setShowMenuDeletePost(postId);
        } else {
            setShowMenuDeletePost(null);
        }
    };

    useEffect(() => {
        const menu = params.get("menu");
        if (menu === "profile") {
            setUserSesion(true)
        } else if (menu === "userprofile") {
            setUserSesion(false)
        }
    },[])

    return (
        <>
            {data?.posts?.map((post, i) => (
                <React.Fragment key={post?._id || i} >
                    <div className="border border-white/30 w-full rounded-lg bg-card flex items-center text-my-white font-bold gap-3 font-poppins p-4">
                        <div className="w-full flex gap-1 flex-col relative min-w-0">
                            {/* profile */}
                            <div className="w-full flex gap-2 items-center mb-5">
                                {/* foto profile */}
                                {post?.author?.avatar?.fileId ? (
                                    <img src={`${apiImage}/${post?.author?.avatar?.fileId}`} alt="user" className="w-10 h-10 rounded-full object-center object-cover" />
                                ) : (<div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />) }
                                
                                {/* username */}
                                <div className="flex-1 flex flex-col justify-center min-w-0 font-normal">
                                    <span className="text-lg break-words">@{post?.author?.username}</span>
                                    <span className="text-sm">{ShowTimePost(post?.createdAt) }</span>
                                </div>
                                {userSesion && (
                                    <span className="cursor-pointer" onClick={() => handleShowMenuDeletePost(post?._id)}>•••</span>
                                )}
                            </div>

                            {/* menu delete post */}
                            {userSesion && (
                                <>
                                    {showMenuDeletePost === post?._id ? (
                                        <div className="absolute border border-white/50 rounded-lg flex flex-col justify-center items-center p-2 gap-1 bg-card right-0 top-19 font-normal">
                                            {new Date(post?.editExpAt).getTime() > Date.now() && (
                                                <>
                                                    <button className='rounded-lg text-white p-2 text-sm hover:bg-my-green transition-colors duration-500 flex gap-2 justify-center items-center cursor-pointer' onClick={() => {setEditPostModal(true), setListMenu("post"), setSelectedPost(val => post)}}>
                                                        <PencilSquareIcon className='w-5 h-5 text-white'/>
                                                        Edit Post
                                                    </button>
                                                </>
                                            )}
                                            <button className='rounded-lg text-white p-2 text-sm w-full hover:bg-my-green transition-colors duration-500 flex gap-2 justify-center items-center cursor-pointer' onClick={(e) => handleDeletePost(post?._id, e)}>
                                                <ArrowLeftStartOnRectangleIcon className='w-5 h-5 text-white'/>
                                                Delete
                                            </button>
                                        </div>
                                    ) : null}
                                </>
                            ) }
                            


                            {/* content */}
                            {post?.content && (<span className="text-sm font-normal break-words">{post?.content }</span>) }
                            
                            {/* picture */}
                                {post?.files && (
                                    <div className="flex max-w-fit overflow-x-auto scrollbar-hide gap-3 mb-3 mt-2">
                                        {post?.files?.map((file, i )=> (
                                            <img key={file._id || i} src={`${apiImage}/${file?.fileId}`} alt="content-picture" className="rounded-lg max-w-80 w-full max-h-80 object-cover object-center"/>
                                        ))}
                                    </div>
                                ) }

                            <hr />

                            {/* Menu Action */}
                            <div className="w-full h-10 flex items-center pl-1 gap-2">
                                <div className="flex gap-2 rounded-lg hover:bg-my-green p-1 items-center justify-center transition-colors duration-500 cursor-pointer" onClick={(e) => handlePostLike(post?._id, e)}>
                                    {post?.likes?.includes(curentUserId) ? <HeartIconSolid className="w-5 h-5 text-red-500" /> : <HeartIconOutline className="w-5 h-5 text-white" />}
                                    <span className="text-sm font-extralight md:text-[15px]">{post?.likes?.length }</span>
                                </div>

                                <div className="flex gap-2 rounded-lg hover:bg-my-green p-1 items-center justify-center transition-colors duration-500 cursor-pointer" onClick={() => { setShowDetailPostModal(true); setSelectedPostId(post?._id)}}>
                                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                                    <span className="text-sm font-extralight md:text-[15px]">{post?.comments?.length }</span>
                                </div>

                                <div className="flex-1 flex justify-end items-center">
                                    
                                </div>

                            </div>

                        </div>

                        {/* Show Detail Post */}

                    </div>

                </React.Fragment>
            )) }
            {editPostModal && <EditProfileModal data={data} listMenu={listMenu} post={selectedPost} />}
        </>
    )
}

export default UserPost;