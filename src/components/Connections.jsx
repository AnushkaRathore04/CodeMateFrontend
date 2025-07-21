import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true} );
            dispatch(addConnections(res.data.data));
        }catch(err){

        }
    }

    useEffect(() => {
        fetchConnections();
    },[]);

    if(!connections) return;

    if(connections.length === 0) return <h1>No Connections Found</h1>;

    return (
  <div className="text-center my-10">
    <h1 className="font-bold text-2xl">Connections</h1>
    <div className="flex flex-col gap-6 items-center mt-8">
      {connections.map((connection, index) => {
        const { firstName, lastName, photoUrl, age, gender, about } = connection;
        return (
          <div
            key={index}
            className="card bg-base-200 shadow-md rounded-xl p-6 w-96 flex flex-col items-center"
          >
            <img
              src={photoUrl}
              alt="User"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-lg font-semibold text-white">{firstName} {lastName}</h2>
            <p className="text-sm text-gray-300">{age} {gender}</p>
            <p className="text-sm text-gray-400 mt-2 text-center">{about}</p>
          </div>
        );
      })}
    </div>
  </div>
);
};
export default Connections