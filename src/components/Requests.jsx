import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status,_id) => {
    try{
        const res = await axios.post(BASE_URL+"/request/review/"+ status +"/"+_id,
            {},
            {withCredentials:true}
        );
        dispatch(removeRequest(_id));
    }catch(err){

    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) return <h1 className="text-center mt-10">No Request Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl">Requests</h1>
      <div className="flex flex-col gap-6 items-center mt-8">
        {requests.map((request, index) => {
          const user = request.fromUserId;
          if (!user) return null;

          const { _id,firstName, lastName, photoUrl, age, gender, about } = user;

          return (
            <div
                key={index}
                className="w-[700px] bg-base-300 shadow-md rounded-xl p-4 flex items-start justify-between gap-4"
                >
            <div>
                <img
                    src={photoUrl}
                    alt="User"
                    className="w-15 h-15 rounded-full object-cover"
                />
            </div>

            <div className="flex flex-col flex-1">
            <div className="text-white font-semibold text-base">{firstName} {lastName}</div>
            <div className="text-sm text-gray-400 mt-1">{about}</div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
                <button 
                    className="btn btn-sm btn-success"
                    onClick={() => reviewRequest("accepted",request._id)}>
                        Accept
                </button>
                <button 
                    className="btn btn-sm btn-error" 
                    onClick={() => reviewRequest("rejected",request._id)}>
                        Reject
                </button>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
