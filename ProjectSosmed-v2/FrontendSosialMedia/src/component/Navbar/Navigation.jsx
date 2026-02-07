import { useEffect, useState } from 'react';
import '../../index.css';
import { ChatBubbleOvalLeftIcon, HomeIcon, PlusIcon, UserIcon, BellAlertIcon } from "@heroicons/react/24/outline";
import { useNavigationHooks } from './Hooks/NavigationHooks';
import { useNavigationUserProfileHooks } from '../Profile/Hooks/NavigationUserProfileHooks';
import { useSearchParams } from 'react-router';
import useAppServices from '../Profile/services/useAppServices';


const Navigation = ({ userId }) => {
    const { handleNavigationFeed, handleNavigationCreatePost, handleNavigationProfile, handleNavigationNotification } = useNavigationHooks();
    const [params] = useSearchParams();
    const menu = params.get("menu") || "profile";
    const { handleCloseDetailPost, loadPage } = useNavigationUserProfileHooks();
    const { GetAccessAppProfile } = useAppServices();
    const [data, setData] = useState(null);
    const apiImage = import.meta.env.VITE_IMAGE_API_URL;

    useEffect(() => { 
        const fetch = async () => {
            const result = await GetAccessAppProfile(userId);
            setData(result);
        };

        fetch();

    }, [loadPage, userId])
    

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 backdrop-blur-xs backdrop-grayscale flex justify-center bg-[#1e1f1e]/50 px-4 text-my-white border-b border-b-white/30 z-5" onClick={handleCloseDetailPost}>
                <section className="w-full h-15 flex justify-between items-center">
                    {/* Brand */}
                    <div className="gap-3 items-center hidden md:flex">
                        <div className="flex items-center bg-my-green p-2 justify-center rounded-lg">
                            <ChatBubbleOvalLeftIcon className='w-5 h-5 text-white'/>
                        </div>
                        <span className="font-extrabold text-3xl flex">
                            <h1 className="text-4xl italic">M</h1>
                            <h1 className="text-2xl italic">A</h1>
                            <h1 className="text-2xl self-end">N</h1>
                            <h1 className="text-2xl self-center italic">D</h1>
                            a
                            <h1 className="text-3xl">L</h1>
                            a
                        </span>
                    </div>

                    {/* Navigation Menu */}
                    {/* Feed */}
                    <div className=" flex items-center cursor-pointer" onClick={handleNavigationFeed}>
                        <div className={`flex items-center p-2 justify-center rounded-lg gap-3 transition-all duration-700 ${menu === "feed" ? "bg-my-green" : "bg-transparent"} hover:bg-green-700`}>
                            <HomeIcon className='w-5 h-5 text-white' />
                            <span className='font-semibold text-white hidden md:flex'>Feed</span>
                        </div>
                    </div>

                    {/* Post */}
                    <div className="flex items-center cursor-pointer" onClick={handleNavigationCreatePost}>
                        <div className={`flex items-center p-2 justify-center rounded-lg gap-3 transition-all duration-700 ${menu === "createpost" ? "bg-my-green" : "bg-transparent"} hover:bg-green-700` }>
                            <PlusIcon className='w-5 h-5 text-white' />
                            <span className='font-semibold text-white hidden md:flex'>Post</span>
                        </div>
                    </div>

                    {/* Notification */}
                    <div className="flex items-center cursor-pointer" onClick={handleNavigationNotification}>
                        <div className={`relative flex items-center p-2 justify-center rounded-lg gap-3 transition-all duration-700 ${menu === "notification" ? "bg-my-green" : "bg-transparent"} hover:bg-green-700`}>
                            {data?.notifications?.filter(notif => notif?.isRead === false).length > 0 && (<div className="absolute w-3 h-3 bg-red-500 rounded-full right-0 top-0 text-white flex justify-center items-center"></div>) }
                            <BellAlertIcon className='w-5 h-5 text-white' />
                            <span className='font-semibold text-white hidden md:flex'>Notification</span>
                        </div>
                    </div>

                    {/* Profile */}
                    <div className="flex items-center cursor-pointer" onClick={handleNavigationProfile}>
                        <div className={`flex items-center p-2 justify-center rounded-lg gap-3 transition-all duration-700 ${menu === "profile" ? "bg-my-green" : "bg-transparent"} hover:bg-green-700`}>
                            <UserIcon className='w-5 h-5 text-white' />
                            <span className='font-semibold text-white hidden md:flex'>Profile</span>
                        </div>
                    </div>

                    {/* Foto Profile */}
                    <div className="flex items-center">
                        {data?.avatar?.fileId ? (
                            <img src={`${apiImage}/${data?.avatar?.fileId}`} alt="profile" className='w-10 h-10 object-cover object-center rounded-full' />
                        ) : (<div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />) }
                    </div>

                </section>
            </nav>
        </>
    )
}

export default Navigation;