import { useState } from "react";
import "../../../index.css";
import { useNavigationUserProfileHooks } from "../Hooks/NavigationUserProfileHooks";

const NavigationProfile = () => {
    const { handleShowPost, handleShowMedia, showMenu } = useNavigationUserProfileHooks();

    return (
        <>
            <div className="w-full">
                <div className="border border-white/30 max-w-90 rounded-lg bg-card flex p-2 items-center text-white font-bold gap-3 font-poppins">
                    <div className={`transition-colors duration-500 cursor-pointer w-full max-w-40 h-8 flex justify-center items-center rounded-lg ${showMenu === "post" ? "bg-my-green" : ""}`} onClick={handleShowPost}>
                        Post
                    </div>
                    <div className={`transition-colors duration-500 cursor-pointer w-full max-w-40 h-8 flex justify-center items-center rounded-lg ${showMenu === "media" ? "bg-my-green" : ""}`} onClick={handleShowMedia}>
                        Media
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavigationProfile;