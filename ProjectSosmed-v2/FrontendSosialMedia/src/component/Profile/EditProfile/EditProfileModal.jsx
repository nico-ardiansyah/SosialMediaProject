import { useState } from "react";
import "../../../index.css";

// hooks
import useAppServices from "../services/useAppServices";
import { useNavigationUserProfileHooks } from "../Hooks/NavigationUserProfileHooks";



const EditProfileModal = ({ listMenu, data, post }) => {
    const { handleUploadAvatar, handleChangeName, handleDeleteMenu, handleChangeBio, handleEditPost, error } = useAppServices();
    const { setEditProfileModal, setEditPostModal } = useNavigationUserProfileHooks();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [contentPost, setContentPost] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [menuEdit, setMenuEdit] = useState(false);
    const apiImage = import.meta.env.VITE_IMAGE_API_URL;

    const handleInputImage = (e) => {
        const file = e.target.files[0]
        setSelectedImage(file)
        setSelectedImageUrl(URL.createObjectURL(file))
    };

    const bioLimit = 160;
    let bioRemainingChars = bioLimit - bio.length;
    
    const contentPostLimit = 300;
    let contentPostRemainingChars = contentPostLimit - contentPost.length;

    return (
        <>
            <div className=" bg-black/50 backdrop-blur-xs backdrop-grayscale rounded-lg z-5 p-3 flex flex-col gap-2 w-full max-w-80 h-fit font-bold md:max-w-96 fixed text-my-white" >
                <span className='self-center'>
                    {listMenu === "avatar" && "Profile Picture"}
                    {listMenu === "name" && "Name"}
                    {listMenu === "bio" && "Biography"}
                    {listMenu === "post" && "Edit Content Post" }
                </span>
                {/* avatar */}
                {listMenu === "avatar" && (
                    <>
                        <img src={selectedImageUrl || `${apiImage}/${data?.avatar?.fileId}`} alt="" className='w-full aspect-square object-cover object-center rounded-lg'/>
                    </>
                )}
                {/* name */}
                {listMenu === "name" && (
                    <>
                        <input type="text" className='h-10 p-1 rounded-lg border border-white/50 bg-black focus:ring-2 focus:ring-my-green focus:outline-none font-normal text-white' placeholder={data?.name || "Your name"} onChange={(e) => setName(e.target.value)} maxLength={50}/>
                    </>
                )}
                {/* bio */}
                {listMenu === "bio" && (
                    <>
                        <textarea name="" id="" placeholder={data?.bio || 'Your Bio'} className='p-1 rounded-lg border border-white/50 bg-black focus:ring-2 focus:ring-my-green focus:outline-none text-white font-normal' rows={7} onChange={(e)=> setBio(e.target.value)} maxLength={bioLimit}></textarea>
                        <span className={`text-sm font-extralight ${bioRemainingChars < 20 ? "text-red-600" : ""}`}>{bioRemainingChars} character remaining</span>
                    </>
                )}
                {/* post */}
                {listMenu === "post" && (
                    <>
                        <textarea name="" id="" placeholder={post?.content || 'Your Content'} className='p-1 rounded-lg border border-white/50 bg-black focus:ring-2 focus:ring-my-green focus:outline-none text-white font-normal' rows={7} onChange={(e)=> setContentPost(e.target.value)} maxLength={contentPostLimit}></textarea>
                        <span className={`text-sm font-extralight ${contentPostRemainingChars < 20 ? "text-red-600" : ""}`}>{contentPostRemainingChars} character remaining</span>
                    </>
                )}

                {/* menu */}
                {error && (
                    <>
                        <span className="text-sm font-light text-white">{error}</span>
                    </>
                )}
                <div className="h-9 relative rounded-tr-lg rounded-br-lg w-full text-sm md:text-lg">
                    <div className={`bg-card rounded-tr-lg rounded-br-lg flex justify-end items-center cursor-pointer absolute h-full p-2 z-4 border border-white/50 transition-all duration-700 ${menuEdit ? (listMenu === "avatar" ? 'w-[22%]' : (listMenu === "post" ? "w-[60%]" : "w-[40%]")) : `w-full`}`} onClick={(e) => setMenuEdit(val => !val)}>
                        Menu 
                    </div>
                    {listMenu === "avatar" && (
                        <>
                            <label className={ `bg-my-white rounded-tr-lg rounded-br-lg flex justify-end items-center cursor-pointer absolute h-full p-2 z-3 text-black border border-white/50 transition-all duration-900 ${menuEdit ? `w-[40%]` : 'w-full'}`} htmlFor='photo'>
                                Photo
                            </label>
                            <input type="file" className='hidden' onChange={(e) => handleInputImage(e)} id='photo' accept='image/*'/>
                        </>
                    )}
                    {listMenu === "avatar" && (
                        <>
                            <div className={`bg-my-green rounded-tr-lg rounded-br-lg flex justify-end items-center cursor-pointer absolute h-full p-2 z-2 border border-white/50 transition-all duration-[1050ms] ${menuEdit ? `w-[60%]` : `w-full`}`} onClick={(e)=> handleUploadAvatar(selectedImage, e)}>
                                Save
                            </div>
                        </>
                    )}
                    {listMenu === "name" && (
                        <>
                            <div className={`bg-my-green rounded-tr-lg rounded-br-lg flex justify-end items-center cursor-pointer absolute h-full p-2 z-2 border border-white/50 transition-all duration-[1050ms] ${menuEdit ? `w-[60%]` : `w-full`}`} onClick={(e)=> handleChangeName(name,e)}>
                                Save
                            </div>
                        </>
                    )}

                    {listMenu === "bio" && (
                        <>
                            <div className={`bg-my-green rounded-tr-lg rounded-br-lg flex justify-end items-center cursor-pointer absolute h-full p-2 z-2 border border-white/50 transition-all duration-[1050ms] ${menuEdit ? `w-[60%]` : `w-full`}`} onClick={(e)=> handleChangeBio(bio, e)}>
                                Save
                            </div>
                        </>
                    )}

                    {listMenu === "post" && (
                        <>
                            <div className={`bg-my-green rounded-tr-lg rounded-br-lg flex justify-end items-center cursor-pointer absolute h-full p-2 z-2 border border-white/50 transition-all duration-[1050ms] ${menuEdit ? `w-[80%]` : `w-full`}`} onClick={(e)=> {handleEditPost(contentPost, post?._id,e), setEditPostModal(false)}}>
                                Save
                            </div>
                        </>
                    )}
                    
                    {listMenu === "avatar" && (
                        <>
                            <div className={`bg-red-600 rounded-tr-lg rounded-br-lg flex justify-end items-center cursor-pointer absolute h-full p-2 z-1 border border-white/50 transition-all duration-[1150ms] ${menuEdit ? `w-[80%]` : `w-full`}`} onClick={(e) => handleDeleteMenu("delete-avatar",e)}>
                                Delete
                            </div>
                        </>
                    )}

                    {listMenu === "name" && (
                        <>
                            <div className={`bg-red-600 rounded-tr-lg rounded-br-lg flex justify-end items-center cursor-pointer absolute h-full p-2 z-1 border border-white/50 transition-all duration-[1150ms] ${menuEdit ? `w-[80%]` : `w-full`}`} onClick={(e) => handleDeleteMenu("delete-name",e)}>
                                Delete
                            </div>
                        </>
                    )}

                    {listMenu === "bio" && (
                        <>
                            <div className={`bg-red-600 rounded-tr-lg rounded-br-lg flex justify-end items-center cursor-pointer absolute h-full p-2 z-1 border border-white/50 transition-all duration-[1150ms] ${menuEdit ? `w-[80%]` : `w-full`}`} onClick={(e) => handleDeleteMenu("delete-bio",e)}>
                                Delete
                            </div>
                        </>
                    )}
                    
                    <div className="border border-white/50 rounded-tr-lg rounded-br-lg w-full flex justify-end items-center cursor-pointer absolute h-full p-2" onClick={() => {setEditProfileModal(false), setMenuEdit(val => !val), setEditPostModal(false), setSelectedImage(null), setSelectedImageUrl(null)}}>
                        Close
                    </div>
                </div>
            </div>
        </>
    )
};


export default EditProfileModal;