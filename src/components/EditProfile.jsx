import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast,setShowToast] = useState(false);

  const saveProfile = async() => {
    setError("");
    try{
        const res= await axios.patch(BASE_URL+"/profile/edit" , 
            { firstName, lastName, photoUrl, age, gender, about },
            {withCredentials:true}
        );
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        },2000);
    }catch(err){
        setError(err.message);
    }
  }

  return (
    <div>
    <div className="flex justify-center my-10 gap-10 items-start bg-base-100 p-10">

    {/* Edit Profile Card */}
    <div className="flex justify-center mx-10 ">
    <div className="bg-base-300 shadow-md rounded-2xl px-8 py-10 w-96 min-h-[620px] flex flex-col justify-between">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">Edit Profile</h2>
        <form className="space-y-5 flex-grow">
          <div>
            <label className="block mb-1 text-sm text-gray-200">FirstName</label>
            <input
              type="text"
              value={firstName}
              className="w-full border border-gray-300 text-gray-100 bg-base-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-200">LastName</label>
            <input
              type="text"
              value={lastName}
              className="w-full border border-gray-300 text-gray-100 bg-base-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-200">Photo URL</label>
            <input
              type="text"
              value={photoUrl}
              className="w-full border border-gray-300 text-gray-100 bg-base-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your PhotoUrl"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-200">Age</label>
            <input
              type="number"
              value={age}
              className="w-full border border-gray-300 text-gray-100 bg-base-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-200">Gender</label>
            <input
              type="text"
              value={gender}
              className="w-full border border-gray-300 text-gray-100 bg-base-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your gender"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-200">About</label>
            <input
              type="text"
              value={about}
              className="w-full border border-gray-300 text-gray-100 bg-base-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="About you"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <p className="text-red-500">{error}</p>
          <button type="submit" 
          className="btn btn-primary w-full" 
          onClick={(e) => {
            e.preventDefault();
            saveProfile();
            }}
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
    {/* User Card */}
    <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
    {showToast && (<div className="toast toast-top toast-end">
        <div className="alert alert-success">
            <span>Profile saved successfully</span>
        </div>
    </div>)}
    </div>
  );
};

export default EditProfile;
