import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId,setEmailId] = useState("");{/* hooks created */}
    const [password,setPassword]= useState("");
    const [firstName,setFirstName]= useState("");
    const [lastName,setLastName]= useState("");
    const [isLoginForm,setIsLoginForm]= useState(true);
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

    const handleSignup = async (e) => {
        e.preventDefault();
        
        try{const res = await axios.post(BASE_URL + "/signup",{
            firstName,
            lastName,
            emailID:emailId,
            password,
        },
        {withCredentials:true}
        );
        console.log("Signup response", res.data);
        dispatch(addUser(res.data.data));
        return navigate("/profile");
         }
        catch(err){
          setError(err?.response?.data || "Something went wrong");
        }
    };

  return (
    <div className="min-h-screen bg-grey-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-2xl px-8 py-10 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{isLoginForm ? "Welcome Back" : "Welcome"}</h2>

        <form className="space-y-5" onSubmit={handleLogin}>

          {!isLoginForm && <><div>
            <label className="block mb-1 text-sm text-gray-600">First Name</label>
            <input
              type="firstName"
              value={firstName}
              className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Last Name</label>
            <input
              type="lastName"
              value={lastName}
              className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div></>}
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200" onClick={isLoginForm? handleLogin : handleSignup}>
            {isLoginForm ? "Login" : "SignUp"}
          </button>
        </form>

        <p
          className="text-sm text-center text-gray-500 mt-6 cursor-pointer"
          onClick={() => setIsLoginForm((value) => !value)}
        >
        {isLoginForm ? (
          <>
          New User? <span className="text-blue-500 ml-1 underline">Sign Up</span>
          </>
          ) : (
          <>
          Existing User? <span className="text-blue-500 ml-1 underline">Login</span>
          </>
        )}
        </p>
      </div>
    </div>
  );
};

export default Login;
