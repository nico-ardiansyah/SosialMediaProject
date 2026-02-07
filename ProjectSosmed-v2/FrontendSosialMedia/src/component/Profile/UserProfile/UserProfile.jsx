import '../../../index.css';
import { CameraIcon, PencilSquareIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';

// Hooks
import { useNavigationUserProfileHooks } from '../Hooks/NavigationUserProfileHooks';
import useAppServices from '../services/useAppServices';

// Component
import NavigationProfile from '../Navigation/NavigationProfile';
import UserPost from '../Post/UserPost';
import UserMedia from '../Post/UserMedia';
import FollowModal from '../Follow/FollowModal';
import EditProfileModal from '../EditProfile/EditProfileModal';

const UserProfile = ({ userId }) => {
    const [data, setData] = useState({});
    const { GetAccessAppProfile, handleSignOut } = useAppServices();
    const { loadPage, followModal, setFollowModal, editProfileModal, setEditProfileModal, showMenu } = useNavigationUserProfileHooks();
    const [showSettings, setShowSettings] = useState(false);
    const apiImage = import.meta.env.VITE_IMAGE_API_URL;
    const [params] = useSearchParams();
    const [dataFollow, setDataFollow] = useState([]);

    const [listMenu, setListMenu] = useState("");

    // user sesion is true = is user own account
    const [userSesion, setUserSesion] = useState(true);

    const handleShowSettings = () => {
        if (showSettings === false) {
            setShowSettings(true)
        } else {
            setShowSettings(false)
        };
    };


    useEffect(() => {
        const menu = params.get("menu");
        if (menu === "profile") {
            setUserSesion(true)
        } else if (menu === "userprofile") {
            setUserSesion(false)
        }

        const fetchProfile = async () => {
            const data = await GetAccessAppProfile(userId);
            setData(data);
        };

        fetchProfile();

    }, [loadPage, userId])
    

    return (
        <>
            <section className="border border-white/10 w-full py-5 rounded-2xl bg-card p-4 flex justify-center items-center flex-col text-my-white font-poppins">
                {/* edit Modal */}
                {editProfileModal && <EditProfileModal listMenu={listMenu} data={data} postId={""}/> }
                
                <div className="w-full flex flex-col">
                    {/* user picture */}
                    <div className="h-50 relative mb-15">
                        {/* banner */}
                        <div className="w-full h-full relative rounded-lg flex bg-black/50 overflow-hidden">
                            <div className="dot bg-red-500 w-3 h-3 left-[10%]" style={{animationDelay: '0s'}}></div>
                            <div className="dot bg-blue-500 w-4 h-4 left-[20%]" style={{animationDelay: '1s'}}></div>
                            <div className="dot bg-green-500 w-2 h-2 left-[30%]" style={{animationDelay: '2.5s'}}></div>
                            <div className="dot bg-yellow-500 w-3 h-3 left-[40%]" style={{animationDelay: '1.8s'}}></div>
                            <div className="dot bg-pink-500 w-2 h-2 left-[50%]" style={{animationDelay: '3.2s'}}></div>
                            <div className="dot bg-purple-500 w-3 h-3 left-[60%]" style={{animationDelay: '0.75s'}}></div>
                            <div className="dot bg-cyan-500 w-4 h-4 left-[70%]" style={{animationDelay: '2.2s'}}></div>
                            <div className="dot bg-orange-500 w-2 h-2 left-[80%]" style={{animationDelay: '1.3s'}}></div>
                            <div className="dot bg-lime-500 w-3 h-3 left-[90%]" style={{animationDelay: '2.9s'}}></div>
                            <div className="dot bg-rose-500 w-2 h-2 left-[15%]" style={{animationDelay: '0.5s'}}></div>
                            <div className="dot bg-red-500 w-3 h-3 left-[10%]" style={{animationDelay: '0s'}}></div>
                            <div className="dot bg-blue-500 w-4 h-4 left-[20%]" style={{animationDelay: '1s'}}></div>
                            <div className="dot bg-green-500 w-2 h-2 left-[30%]" style={{animationDelay: '2.5s'}}></div>
                            <div className="dot bg-yellow-500 w-3 h-3 left-[40%]" style={{animationDelay: '1.8s'}}></div>
                            <div className="dot bg-pink-500 w-2 h-2 left-[50%]" style={{animationDelay: '3.2s'}}></div>
                            <div className="dot bg-purple-500 w-3 h-3 left-[60%]" style={{animationDelay: '0.75s'}}></div>
                            <div className="dot bg-cyan-500 w-4 h-4 left-[70%]" style={{animationDelay: '2.2s'}}></div>
                            <div className="dot bg-orange-500 w-2 h-2 left-[80%]" style={{animationDelay: '1.3s'}}></div>
                            <div className="dot bg-lime-500 w-3 h-3 left-[90%]" style={{animationDelay: '2.9s'}}></div>
                            <div className="dot bg-rose-500 w-2 h-2 left-[15%]" style={{ animationDelay: '0.5s' }}></div>
                            <span className="text-4xl font-extrabold w-full flex justify-center items-center text-shadow-lg text-shadow-white/30 font-alfa-slab-one text-white/20 md:text-6xl">
                                M A N D A L A
                            </span>
                        </div>

                        {/* profile picture */}
                        <div className="absolute rounded-full bottom-[-40px] left-6 w-24 h-24">
                            {userSesion && <CameraIcon className='w-7 h-7 text-white bg-my-green p-1 rounded-lg absolute right-1 bottom-0 z-1 cursor-pointer' onClick={() => {setEditProfileModal(true), setListMenu("avatar")}}/> }
                            {data?.avatar?.fileId ? (
                                <img src={`${apiImage}/${data?.avatar?.fileId}`} alt="profile" className='rounded-full object-cover object-center absolute w-full h-full'/>
                            ) : (<div className='rounded-full object-cover object-center absolute w-full h-full animate-pulse' />)}
                        </div>
                    </div>

                    {/* username */}
                    <div className="w-full flex mb-3 relative">
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <span className='text-lg md:text-[20px] break-words'>
                                {data?.name || data?.username}
                            </span>
                            <span className='font-extralight text-sm md:text-lg'>@{data?.username }</span>
                        </div>
                        {/* menu setting */}
                        {userSesion && (
                            <>
                                <button className="flex p-1 gap-3 rounded-lg border border-white/50 bg-black/30 hover:bg-my-green cursor-pointer h-fit" onClick={handleShowSettings}>
                                    <Cog6ToothIcon className=' text-white w-5 h-5 cursor-pointer'/>
                                    <span className='text-white font-light md:flex hidden cursor-pointer'>Settings</span>
                                </button>
                            </>
                        ) }

                        {/* Menu Settings */}
                        {showSettings && (
                            <div className="absolute border border-white/50 rounded-lg flex flex-col justify-center items-center p-2 gap-1 bg-card right-0 bottom-[-110px]">
                                <button className='rounded-lg text-white p-2 text-sm hover:bg-my-green transition-colors duration-500 flex gap-2 justify-center items-center w-full cursor-pointer' onClick={() => {setEditProfileModal(true), setListMenu("name")}}>
                                    <PencilSquareIcon className='w-5 h-5 text-white'/>
                                    Edit Name
                                </button>
                                <button className='w-full rounded-lg text-white p-2 text-sm hover:bg-my-green transition-colors duration-500 flex gap-2 justify-center items-center cursor-pointer' onClick={() => {setEditProfileModal(true), setListMenu("bio")}}>
                                    <PencilSquareIcon className='w-5 h-5 text-white'/>
                                    Edit Bio
                                </button>
                                <button className='rounded-lg text-white p-2 text-sm w-full hover:bg-my-green transition-colors duration-500 flex gap-2 justify-center items-center cursor-pointer' onClick={handleSignOut}>
                                    <ArrowLeftStartOnRectangleIcon className='w-5 h-5 text-white'/>
                                    Log Out
                                </button>
                            </div>
                        )}

                    </div>

                    {/* Biographi */}
                    {data?.bio && (
                        <>
                            <div className="w-full mb-3 flex-1 min-w-0">
                                <span className='font-light leading-1 text-sm md:text-lg whitespace-pre-line break-words'>{data?.bio }</span>
                            </div>
                        </>
                    )}

                    {/* Followed info */}
                    <div className="w-full flex gap-8 pl-3 flex-wrap">
                        <div className="flex flex-col justify-center items-center">
                            <span className='font-medium'>{data?.posts?.length }</span>
                            <span className='text-sm'>Posts</span>
                        </div>
                        {data?.followers?.length > 0 ? (
                            <div className="flex flex-col justify-center items-center rounded-lg hover:bg-my-green p-1 transition-all duration-300 hover:scale-110 cursor-pointer" onClick={() => {setFollowModal(val => !val), setDataFollow(data?.followers)}}>
                                <span className='font-medium'>{data?.followers?.length }</span>
                                <span className='text-sm'>Followers</span>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-center items-center rounded-lg hover:bg-my-green p-1 transition-all duration-300 hover:scale-110 cursor-pointer">
                                <span className='font-medium'>{data?.followers?.length }</span>
                                <span className='text-sm'>Followers</span>
                            </div>
                        )}
                        {data?.following?.length > 0 ? (
                            <div className="flex flex-col justify-center items-center rounded-lg hover:bg-my-green p-1 transition-all duration-300 hover:scale-110 cursor-pointer" onClick={() => {setFollowModal(val => !val), setDataFollow(data?.following)}}>
                                <span className='font-medium'>{data?.following?.length }</span>
                                <span className='text-sm' >Following</span>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-center items-center rounded-lg hover:bg-my-green p-1 transition-all duration-300 hover:scale-110 cursor-pointer">
                                <span className='font-medium'>{data?.following?.length }</span>
                                <span className='text-sm' >Following</span>
                            </div>
                        )}
                    </div>

                </div>


            </section>

            {/* Navigation */}
            <NavigationProfile />
            
            {/* component post / media */}
            {showMenu === "post" ? <UserPost data={data} /> : <UserMedia data={data} />}
            
            {/* follow Modal */}
            {followModal && <FollowModal data={dataFollow} />}
            

        </>
    )
}

export default UserProfile;