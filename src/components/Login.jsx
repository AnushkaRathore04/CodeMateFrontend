import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId,setEmailId] = useState("anushka@gmail.com");{/* hooks created */}
    const [password,setPassword]= useState("Anushka@123");
    const [error,setError]= useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try{const res = await axios.post(BASE_URL + "/login",{
            emailID:emailId,
            password,
        },
        {withCredentials:true}
    );
    dispatch(addUser(res.data));
    return navigate("/");
         }
        catch(err){
          setError(err?.response?.data || "Something went wrong");
          
        }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-2xl px-8 py-10 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={emailId}
              className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200" >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account? <span className="text-blue-600 font-medium cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
