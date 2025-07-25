import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try{await axios.post(BASE_URL + "/logout",{},{withCredentials: true});
        dispatch(removeUser());
        return navigate("/login");
        }catch(err){
            
        }
    }

    return (
        <div className="navbar bg-base-200 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">CodeMate</Link>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

                {user && (
                    <div className="dropdown dropdown-end mx-5 flex">
                        <p className="px-4">Welcome, {user.firstName}</p>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User photo"
                                    src={user.photoUrl} 
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <Link to="/connections">Connections</Link>
                            <li>
                            </li>
                            <Link to="/requests">Requests</Link>
                            <li>

                                <a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
