import "../../index.css";


const LoadingAnimation = () => {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#00010F]/50 flex justify-center items-center z-999">
            <div className="border border-white/40 w-30 h-30 rounded-full flex justify-center items-center animate-ring md:w-45 md:h-45">
            </div>
            <span className='font-poppins text-sm font-semibold text-[#eceee1] text-shadow-md text-shadow-white/50 absolute flex md:text-lg'>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>L</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>o</span>
                <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>a</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>d</span>
                <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>i</span>
                <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>n</span>
                <span className="animate-bounce" style={{ animationDelay: '0.7s' }}>g</span>
            </span>
        </div>
    )
};

export default LoadingAnimation;