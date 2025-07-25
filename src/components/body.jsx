import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";


const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if(userData) return;
        try{
            const res = await axios.get(BASE_URL + "/profile/view" ,{
            withCredentials: true,
            });
            dispatch(addUser(res.data));

        }catch(err){
            if(err.response && err.response.status === 401){
                navigate("/login");
            }
        }
    };

    useEffect(() => {
            fetchUser();
    }, []);

    return(
        <div>
            <NavBar/>
            <Outlet/>{/* any children-routs of body will render over here*/}
            <Footer/>
        </div>
    )
}
export default Body;