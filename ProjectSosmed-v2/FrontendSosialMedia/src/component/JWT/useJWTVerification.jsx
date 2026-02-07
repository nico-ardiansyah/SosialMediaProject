import { useNavigate } from "react-router";
import axios from "axios";

const useJWTVerification = () => {
    const Navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const jwtVerify = async () => { 
        try { 
            const result = await axios.get(`${apiUrl}/user-info`, {
                withCredentials : true,
            })
            return result
        } catch (e) {
            Navigate("/")
        }
    };

    return {
        jwtVerify
    }

};

export default useJWTVerification;