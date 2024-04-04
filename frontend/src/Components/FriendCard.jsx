import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import { SocketContext } from "../Context";

const FriendCard = ({ user }) => {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [thisUser, setThisUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const { socket } = useContext(SocketContext);

  const fetchUser = () => {
    setLoading(true);
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
      <div
        className="py-5 flex gap-x-5 justify-between items-center"
      >
        <Link to={`/user/${thisUser?._id}`} className="relative">
          <ProfileIcon src={thisUser?.profilePhoto} />

          {/* status  */}
          <div
            className={`${
              thisUser?.onlineStatus ? "bg-green-600" : "bg-red-600"
            } absolute w-5 h-5 border-4 border-themeDark rounded-full bottom-0 right-0 `}
          ></div>
        </Link>
        <div className="flex flex-col w-full justify-start">
          {/* name  */}
          <div className="text-themeNavyLight font-semibold">
            {thisUser?.name}
          </div>
          {/* about  */}
          <div className="text-themeNavyLight font-medium text-xs">
            {thisUser?.about}
          </div>
        </div>

        {/* add friend icon  */}

        <div className="p-2 cursor-pointer">
          <img className="w-11 " src="/chat.svg" alt="chat" />
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
