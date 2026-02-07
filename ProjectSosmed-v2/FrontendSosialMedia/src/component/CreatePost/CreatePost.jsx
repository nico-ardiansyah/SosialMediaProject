import { useEffect, useState } from "react";
import "../../index.css";
import { PhotoIcon } from "@heroicons/react/24/outline";
import useAppServices from "../Profile/services/useAppServices";

// hooks
import useCreatePostServices from "./services/useCreatePostServices";

const CreatePost = ({ userId }) => {
    const apiImage = import.meta.env.VITE_IMAGE_API_URL;
    const { handleSubmitCreatePost, error, setError } = useCreatePostServices();
    const { GetAccessAppProfile } = useAppServices();
    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState([]);
    const [data, setData] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState([]);
    const [errorInputFile, setErrorInputFile] = useState("");

    const characterLimit = 300;
    let remainingChars = characterLimit - content.length;

    const handleImageUpload = (e) => {
        setError(null)
        const files = Array.from(e.target.files);

        // validasi max lenght files
        if (files.length >= 5) {
            setErrorInputFile("Maximum 5 pictures can be chosen");
            selectedImage(null)
            selectedImageUrl(null)
            return
        };

        const filesUrl = files?.map(file => URL.createObjectURL(file))
        setSelectedImageUrl(filesUrl);
        setSelectedImage(files);
    };

    useEffect(() => { 
        const fetch = async () => {
            const result = await GetAccessAppProfile(userId);
            setData(result)
        };

        fetch();

    },[userId])


    return (
        <>
            <section className="border border-white/10 w-full py-5 rounded-2xl bg-card p-4 flex justify-center items-center flex-col text-my-white font-poppins">
                <form action="" className="w-full flex flex-col gap-3">
                    {/* Header */}
                    <div className="p-2 flex items-center justify-center">
                        <span className="text-lg font-bold">Create New Post</span>
                    </div>

                    {/* profile */}
                    <div className="flex gap-3 items-center">
                        {data?.avatar?.fileId ? (
                            <img src={`${apiImage}/${data?.avatar?.fileId}`} alt="pict"  className="w-10 h-10 rounded-full object-cover object-center"/>
                        ) : (<div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />) }

                        <div className="flex-1 flex flex-col min-w-0">
                            <span className="text-sm break-words">@{data?.username }</span>
                        </div>
                    </div>

                    {/* text area */}
                    <div className="flex flex-col gap-1">
                        <textarea name="" id="" placeholder="Your Content" rows={6} className="border border-white/20 rounded-lg flex-1 focus:ring-my-green focus:outline-none focus:ring-3 p-1 font-extralight" onChange={(e) => setContent(e.target.value)} maxLength={characterLimit}>
                        </textarea>
                        <span className={`text-sm font-extralight ${remainingChars < 20 ? "text-red-600" : ""}`}>{remainingChars} character remaining</span>
                    </div>

                    {/* image priview */}
                    {selectedImage && (
                    <div className="flex overflow-x-auto scrollbar-hide max-h-fit gap-3">
                        {selectedImageUrl.map((imageUrl, i) => (
                            <img key={i} src={imageUrl} alt="selected image" className="w-full max-w-90 max-h-50 object-cover object-center rounded-lg"/>
                        ))}
                    </div>
                    )}
                    
                    {/* input files image error */}
                    {errorInputFile && <span className="text-red-600 text-[12px]">{errorInputFile}</span>}
                    {error && <span className=" text-red-600 text-[12px]">{error}</span>  }
                    <hr className="my-3" />
                    
                    {/* input action */}
                    <div className="flex justify-between">
                        {/* phote */}
                        <label htmlFor="imageinput" className="p-2 flex gap-3 items-center rounded-lg hover:bg-my-green transition-colors duration-500">
                            <PhotoIcon className="w-5 h-5 text-white"/>
                            <span className="font-extralight">Photo</span>
                        </label>
                        <input type="file" id="imageinput" className="hidden" multiple accept="image/*" onChange={handleImageUpload}/>

                        {/* button submit */}
                        <div className="bg-my-green rounded-lg" onClick={(e) => handleSubmitCreatePost(content, selectedImage, e)}>
                            <button type="submit" className="px-4 py-2 text-lg font-bold cursor-pointer">
                                Post
                            </button>
                        </div>

                    </div>

                </form>

            </section>
        </>
    )
};

export default CreatePost;