import "../../../index.css";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// hooks
import { useNavigationUserProfileHooks } from "../Hooks/NavigationUserProfileHooks";


const FollowModal = ({ data }) => {
    const { setFollowModal } = useNavigationUserProfileHooks()
    const apiImage = import.meta.env.VITE_IMAGE_API_URL
    return (
        <>
            <div className="fixed max-w-[500px] w-full bg-black border border-white/50 rounded-lg p-2 text-my-white z-20 max-h-[500px] flex flex-col">
                <XMarkIcon className="h-5 w-5 absolute right-0 top-0 cursor-pointer" onClick={() => setFollowModal(false)}/>
                <div className="overflow-y-auto scrollbar-hide">
                    {data?.map((user, i) => (
                    <React.Fragment key={user?._id || i} >
                        <div className="flex items-center gap-2 mb-2">
                            {user?.avatar?.fileId ? (
                                <img src={`${apiImage}/${user?.avatar?.fileId}`} alt="profile" className='rounded-full w-13 h-13 object-cover object-center'/>
                            ) : (<div className='rounded-full object-cover object-center w-13 h-13 animate-pulse' />)}
                            {user?.username ? (
                                <div className="flex-1 min-w-0 flex flex-col text-lg">
                                    <span className="break-words font-semibold">{user?.name || user?.username}</span>
                                    <span className="break-words">@{user?.username}</span>
                                </div>
                            ) : (
                                <div className="flex-1 min-w-0 flex flex-col text-lg animate-pulse">
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                ))}
                </div>
            </div>
        </>
    )
};


export default FollowModal;