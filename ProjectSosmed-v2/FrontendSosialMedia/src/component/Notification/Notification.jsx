import React,{ useEffect, useState } from "react";
import "../../index.css";

// hooks
import { useNavigationUserProfileHooks } from "../Profile/Hooks/NavigationUserProfileHooks";

// component
import AllNotifications from "./AllNotifications/AllNotifications";
import UnreadNotifications from "./UnreadNotifications/UnreadNotifications";

// services
import useAppServices from "../Profile/services/useAppServices";


const Notification = ({ userId }) => {
    const [active, setActive] = useState("all");
    const { GetAccessAppProfile } = useAppServices();
    const [data, setData] = useState();
    const { loadPage } = useNavigationUserProfileHooks();

    useEffect(() => { 
        const fetchProfile = async () => {
            const data = await GetAccessAppProfile(userId);
            setData(data);
        };
        fetchProfile();

    
    }, [loadPage]);

    return (
        <>
            <section className=" w-full flex flex-col text-my-white font-poppins gap-5">
                <div className="w-full flex border border-white/10 rounded-lg bg-card p-7">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-extrabold text-3xl">Notifications</h1>
                        <span>You have {data?.notifications?.filter(notif => notif?.isRead === false ).length } unread notifications</span>
                    </div>
                </div>

                {/* nafigation */}
                <div className="border border-white/10 h-13 flex gap-2 p-1 justify-around w-full max-w-2/3 bg-card rounded-lg">
                    <div className={`cursor-pointer max-w-1/2 border border-white/10 w-full rounded-lg flex justify-center items-center ${active === "all" ? "bg-black/50" : null}`} onClick={() => setActive("all")}>
                        <span>All</span>
                    </div>
                    <div className={`cursor-pointer max-w-1/2 border border-white/10 w-full rounded-lg flex justify-center items-center relative ${active === "unread" ? "bg-black/50" : null}`} onClick={() => setActive("unread")}>
                        {data?.notifications?.filter(notif => notif?.isRead === false).length > 0 && (<div className="absolute bg-red-500 w-2 h-2 rounded-full top-1 right-1"></div>)}
                        <span>Unread ({data?.notifications?.filter(notif => notif?.isRead === false ).length })</span>
                    </div>
                </div>


                {/* list notification */}
                {active === "all" ? <AllNotifications data={data} /> : <UnreadNotifications data={ data } />}
                
                
            </section>
        </>
    );
};


export default Notification;