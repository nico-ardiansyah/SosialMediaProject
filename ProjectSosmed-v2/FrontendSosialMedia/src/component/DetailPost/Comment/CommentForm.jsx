import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import TextareaAutosize from "react-textarea-autosize"

// hooks
import { useNavigationUserProfileHooks } from "../../Profile/Hooks/NavigationUserProfileHooks";

// services
import useDetailPostServices from "../Services/DetailPostServices";


const CommentForm = ({ postId }) => {
    const [content, setContent] = useState("");
    const { handleUploadComment, error, setError } = useDetailPostServices();
    const { setShowComment } = useNavigationUserProfileHooks();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);

    const characterLimit = 500;
    let remainingChars = characterLimit - content.length;

    const handleImageUpload = (e) => {
        setError(null)
        const filesUrl = URL.createObjectURL(e.target.files[0])
        setSelectedImageUrl(filesUrl);
        setSelectedImage(e.target.files[0]);
    };

    const handleDeleteInput = () => {
        setSelectedImageUrl(null);
        setSelectedImage(null);
        setContent(null)
    };

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-15 bg-transparent px-4 text-white" onClick={() => { handleDeleteInput(), setShowComment(false)}}>
                <form className="p-3 flex flex-col rounded-lg w-full max-w-[500px] bg-black border border-white/50 self-end" onClick={(e) => e.stopPropagation()}>
                    <h1 className="self-center">Comment</h1>
                    {/* Profile */}
                    <TextareaAutosize placeholder="Your Comment" minRows={2} maxRows={25} maxLength={characterLimit} className="border border-white/50 rounded-lg focus:ring-my-green focus:outline-none focus:ring-3 p-1 font-extralight" onChange={(e) => setContent(e.target.value)} />
                    <span className={`text-sm font-extralight ${remainingChars < 20 ? "text-red-600" : ""}`}>{remainingChars} character remainng</span>

                    <hr className="border border-white/50 my-5" />

                    {selectedImage && (
                    <div className="flex overflow-x-auto scrollbar-hide max-h-fit gap-3 mb-4">
                        <img src={selectedImageUrl} alt="selected image" className="w-full max-w-90 max-h-50 object-cover object-center rounded-lg"/>
                    </div>
                    )}

                    {error && (
                        <span className="text-sm font-light text-white">{error}</span>
                    )}
                    
                    {/* input action */}
                    <div className="flex justify-between">
                        {/* phote */}
                        <label htmlFor="imageinput" className="p-2 flex gap-3 items-center rounded-lg hover:bg-my-green transition-colors duration-500 cursor-pointer">
                            <PhotoIcon className="w-5 h-5 text-white"/>
                            <span className="font-extralight">Photo</span>
                        </label>
                        <input type="file" id="imageinput" className="hidden" accept="image/*" onChange={handleImageUpload}/>

                        {/* button submit */}
                        <div className="bg-my-green rounded-lg">
                            <button type="submit" className="px-4 py-2 text-lg font-bold cursor-pointer" onClick={(e) => handleUploadComment(postId, content ,selectedImage,e)}>
                                Comment
                            </button>
                        </div>

                    </div>

                </form>
            </div>
        </>
    )
};
    

export default CommentForm;