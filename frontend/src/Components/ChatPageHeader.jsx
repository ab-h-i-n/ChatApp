import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import { SocketContext } from "../Context";
import OnlineStatus from "./OnlineStatus";

const ChatPageHeader = ({ user, setUser }) => {
  const { socket } = useContext(SocketContext);
  const ApiUrl = import.meta.env.VITE_API_URL;
  const { id, username } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const fetchUser = () => {
    try {
      fetch(`${ApiUrl}/getuser/${id}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            alert(`Error : ${json.error}`);
          } else {
            setUser(json.data);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.on("userUpdate", () => {
      fetchUser();
    });
    fetchUser();
  }, []);

  return (
    <div className="bg-themeNavyDark px-3 py-7 flex items-center gap-5 text-themeNavyLight">
      <div onClick={handleGoBack} className="flex gap-x-1">
        <img src={`/backIcon.svg`} alt="back" className="w-8" />
        <div className="relative">
          <ProfileIcon src={user?.profilePhoto} />
          <OnlineStatus onlineStatus={user?.onlineStatus} borderColor={'border-themeNavyDark'} />
        </div>
      </div>
      <div>
        <div className="font-semibold text-xl text-themeWhite">{username}</div>
        <div className="font-semibold text-xs">
          {user?.onlineStatus ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
};

export default ChatPageHeader;
