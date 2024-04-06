import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import {SocketContext} from "../Context";
import OnlineStatus from "./OnlineStatus"

const ChatsUserCard = ({user}) => {
    const ApiUrl = import.meta.env.VITE_API_URL;
  const [thisUser, setThisUser] = useState();
  const [isLoading,setLoading] = useState();
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const fetchUser = () => {
    setLoading(true);
    fetch(`${ApiUrl}/getuser/${user.friend_id}`)
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
    <>
      <div onClick={handleChat} className="py-5 flex gap-x-5 justify-between items-center">
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
      </div>
    </>
  )
}

export default ChatsUserCard

