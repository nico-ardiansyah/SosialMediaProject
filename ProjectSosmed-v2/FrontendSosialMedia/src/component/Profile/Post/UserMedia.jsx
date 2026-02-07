import React, { useEffect, useState } from "react";
import "../../../index.css";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("id");

// hooks
import { useNavigationUserProfileHooks } from "../Hooks/NavigationUserProfileHooks";

const UserMedia = ({ data }) => {
    const { setShowDetailPostModal, setSelectedPostId } = useNavigationUserProfileHooks();
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

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 p-2 gap-3">
                {data?.posts?.map((post, i) => (
                    <React.Fragment key={post?._id || i}>
                        {post?.files?.length > 0 && (
                            <div className="aspect-square flex" key={post?.files?.[0]?._id || 0}>
                                <img src={`${apiImage}/${post?.files?.[0]?.fileId}`} alt="media" className="object-cover object-center rounded-lg w-full h-full hover:scale-105 transition-transform duration-500" onClick={ () => {setShowDetailPostModal(true), setSelectedPostId(post?._id)}}/>
                            </div>
                        )}
                    </React.Fragment>
                ) )}
            </div>
        </>
    )
};

export default UserMedia;