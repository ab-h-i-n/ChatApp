import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { SocketContext } from "../Context";
const FriendRequestsCard = () => {
  const { socket } = useContext(SocketContext);
  const user = secureLocalStorage.getItem("user");
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [receivedReq, setReceivedReq] = useState();

  const getFriendReq = () => {
    try {
      fetch(`${ApiUrl}/getfriendreq/${user}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            console.error(json.error);
          } else {
            setReceivedReq(json.data.received);
          }
        });
    } catch (error) {
      alert("Error : ".error);
    }
  };

  useEffect(() => {
    console.log(receivedReq);
  }, [receivedReq]);

  useEffect(() => {
    socket.on("friendRequest", () => {
      getFriendReq();
    });
    getFriendReq();
  }, []);

  return (
    <Link
      to={"/friendrequests"}
      className="cursor-pointer p-5 flex gap-x-5 items-center justify-between backdrop-brightness-125"
    >
      {/* icon  */}
      <img src="/friendReq.svg" alt="friendrequests" className="w-10" />
      {/* text  */}
      <div className="text-themeNavyLight font-semibold w-full">
        Friend requests
      </div>
      {/* count  */}
      <div className="flex items-center justify-center">
        {/* for animation  */}
        <div className={`w-8 aspect-square bg-themeOrange animate-ping absolute rounded-full ${receivedReq?.length == 0 ? 'hidden' : ''}`}></div>
        <div className="w-7 grid place-items-center aspect-square bg-themeOrange rounded-full text-white">
          {receivedReq?.length || "0"}
        </div>
      </div>
    </Link>
  );
};

export default FriendRequestsCard;
