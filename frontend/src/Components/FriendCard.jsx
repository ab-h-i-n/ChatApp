import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import { SocketContext } from "../Context";
import secureLocalStorage from "react-secure-storage";
import OnlineStatus from "./OnlineStatus"

const FriendCard = ({ user,setLoading }) => {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [thisUser, setThisUser] = useState();
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const fetchUser = () => {
    fetch(`${ApiUrl}/getuser/${user}`)
      .then((responce) => responce.json())
      .then((json) => {
        if (json.error) {
          alert(`Error : ${json.error}`);
        } else {
          setThisUser(json.data);
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  const handleChat = () => {
    navigate(`/chat/${thisUser?._id}/${thisUser?.name}`);
  };

  useEffect(() => {
    socket.on("userUpdate", () => {
      fetchUser();
    });
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(thisUser);
  }, [thisUser]);

  return (
    <div>
      <div className="py-5 flex gap-x-5 justify-between items-center">
        <Link to={`/user/${thisUser?._id}`} className="relative">
          <ProfileIcon src={thisUser?.profilePhoto} />

          {/* status  */}
          <OnlineStatus onlineStatus={thisUser?.onlineStatus}/>
        </Link>
        <div className="flex flex-col w-full justify-start">
          {/* name  */}
          <div className="text-themeWhite font-semibold">
            {thisUser?.name}
          </div>
          {/* about  */}
          <div className="text-themeNavyLight font-medium text-xs">
            {thisUser?.about}
          </div>
        </div>

        {/* add friend icon  */}

        <div onClick={handleChat} className="p-2 cursor-pointer">
          <img className="w-11 " src="/chat.svg" alt="chat" />
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
