import { useState, createContext, useContext } from "react";
import { useSearchParams } from "react-router";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [, setSearchParams] = useSearchParams();

    const handleNavigationProfile = () => {
        setSearchParams({ menu: "profile" });
    };
    const handleNavigationFeed = () => {
        setSearchParams({ menu: "feed" });
    };
    const handleNavigationNotification = () => {
        setSearchParams({ menu: "notification" });
    };
    const handleNavigationCreatePost = () => {
        setSearchParams({ menu: "createpost" });
    };
    
    return (
        <NavigationContext.Provider
            value={{
                handleNavigationCreatePost,
                handleNavigationFeed,
                handleNavigationNotification,
                handleNavigationProfile
            }}
        >

            {children}
    
        </NavigationContext.Provider>
    );
};


export const useNavigationHooks = () => useContext(NavigationContext) ;