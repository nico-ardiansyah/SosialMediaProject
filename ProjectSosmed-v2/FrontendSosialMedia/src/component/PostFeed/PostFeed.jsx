import "../../index.css";
import { HeartIcon as HeartIconOutline, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/16/solid";
import DetailPostModal from "../DetailPost/DetailPostModal";
import React,{ useEffect, useState } from "react";
import { useNavigationUserProfileHooks } from "../Profile/Hooks/NavigationUserProfileHooks";
import usePostFeedServices from "./services/usePostFeedServices";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("id");


const PostFeed = () => {
    const { setShowDetailPostModal, loadPage, handleShowUserProfile, setSelectedPostId } = useNavigationUserProfileHooks();
    const { GetAccessPostFeed, handlePostLike, handleFollow } = usePostFeedServices();
    const [data, setData] = useState(null);
    const apiImage = import.meta.env.VITE_IMAGE_API_URL;
    const currentUserId = localStorage.getItem("currentUserId");

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
        const FetchPostFeed = async () => {
            const data = await GetAccessPostFeed();
            setData(data);
        };

        FetchPostFeed();
    }, [loadPage])


    return (
        <>
            {data?.map((post, i) => (
                <React.Fragment key={post?._id || i}>
                    <section className="border border-white/10 w-full py-5 rounded-2xl bg-card p-4 flex justify-center items-center flex-col text-my-white font-poppins">
                        <div className="w-full flex flex-col">
                            {/* profile */}
                            <div className="w-full flex gap-2 items-center mb-10">
                                {/* foto profile */}
                                {post?.author?.avatar?.fileId ? (
                                    <img src={`${apiImage}/${post?.author?.avatar?.fileId}`} alt="user" className="w-10 h-10 rounded-full object-center object-cover" />
                                ) : (<div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />) }
                                
                                {/* username */}
                                <div className="flex flex-col justify-center cursor-pointer flex-1 min-w-0 font-extralight" onClick={()=> handleShowUserProfile(post?.author?._id)}>
                                    <span className="break-words text-lg">@{post?.author?.username}</span>
                                    <span className="text-sm">{ShowTimePost(post?.createdAt)}</span>
                                </div>

                                {post?.author?._id?.toString() !== currentUserId && (
                                    <>
                                        {post?.author?.followers?.some(id => id.toString() === currentUserId ) ? (
                                            <button className="p-1 text-sm rounded-lg bg-my-white shadow-sm shadow-black border border-white/50 hover:bg-my-green transition-all duration-500 text-black font-semibold cursor-pointer hover:scale-110" onClick={(e) => handleFollow(post?.author?._id,e)}>
                                                Unfollow
                                            </button>
                                        ) : (
                                            <button className="p-1 text-sm rounded-lg bg-my-white shadow-sm shadow-black border border-white/50 hover:bg-my-green transition-all duration-500 text-black font-semibold cursor-pointer hover:scale-110" onClick={(e) => handleFollow(post?.author?._id,e)}>
                                                Follow
                                            </button>
                                        ) }
                                    </>
                                ) }
                                

                            </div>

                            {/* content */}
                            <div className="w-full flex flex-col gap-5 justify-center mb-7 min-w-0">
                                {post?.content && (<span className="text-sm break-words" >{post?.content}</span>)}
                                {post?.files?.length >= 1 ? (
                                    <div className="flex max-w-fit overflow-x-auto scrollbar-hide gap-3">
                                        {post?.files?.map((file, i) => (
                                            <img key={file?._id || i} src={`${apiImage}/${file?.fileId}`} alt="content-picture" className="rounded-lg max-w-90 w-full max-h-50 object-cover object-center" />
                                        ))}
                                    </div>
                                ) : null}
                            </div>

                            <hr className="mb-1" />

                            {/* Menu Action */}
                            <div className="w-full h-10 flex items-center pl-3 gap-5">
                                <div className="flex gap-2 rounded-lg hover:bg-my-green p-1 items-center justify-center transition-colors duration-500 cursor-pointer" onClick={(e) => handlePostLike(post?._id, e)}>
                                    {post?.likes?.includes(currentUserId) ? <HeartIconSolid className="w-5 h-5 text-red-500" /> : <HeartIconOutline className="w-5 h-5 text-white" />}
                                    <span className="">{post?.likes?.length}</span>
                                </div>

                                <div className="flex gap-2 rounded-lg hover:bg-my-green p-1 items-center justify-center transition-colors duration-500 cursor-pointer" onClick={() => { setShowDetailPostModal(true), setSelectedPostId(post?._id) }}>
                                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                                    <span className="">{post?.comments?.length}</span>
                                </div>
                            </div>

                        </div>

                    </section>
                </React.Fragment>
            ))};
        </>
    );
};

export default PostFeed;