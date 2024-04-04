import React, { useContext, useEffect, useState } from "react";
import ProfileIcon from "./ProfileIcon";
import { Link, json } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const AllUserCard = ({ user }) => {
  const [isFriend, setFriend] = useState(false);
  const user_id = secureLocalStorage.getItem("user");
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setLoading] = useState(false);

  const handleAddFriend = () => {
    setLoading(true);

    try {
      fetch(`${ApiUrl}/sendfriendreq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: user_id,
          to: user._id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            alert(`Error : ${json.error}`);
          } else {
            alert(`${json.data}`);
          }
        }).then(()=>{
          setLoading(false);
        })
    } catch (error) {
      console.error("Error adding friend!");
      setLoading(false);
    }
  };

  useEffect(() => {
    const friend = user?.friendList.find((frnd) => frnd.friend_id == user_id);

    if (friend) {
      setFriend(true);
    } else {
      setFriend(false);
    }
  }, [user]);

  return (
    <div className="py-5 flex gap-x-5 justify-between items-center">
      <Link to={`/user/${user._id}`} className="relative">
        <ProfileIcon src={user?.profilePhoto} />

        {/* status  */}
        <div
          className={`${
            user?.onlineStatus ? "bg-green-600" : "bg-red-600"
          } absolute w-5 h-5 border-4 border-themeDark rounded-full bottom-0 right-0 `}
        ></div>
      </Link>
      <div className="flex flex-col w-full justify-start">
        {/* name  */}
        <div className="text-themeNavyLight font-semibold">{user?.name}</div>
        {/* about  */}
        <div className="text-themeNavyLight font-medium text-xs">
          {user?.about}
        </div>
      </div>

      {/* add friend icon  */}
      {!isFriend && (
        <div
          className="p-2 cursor-pointer"
          onClick={!isLoading ? handleAddFriend : undefined}
        >
          {isLoading ? (
            <div className="loader-small w-5"></div>
          ) : (
            <img className="w-11 " src="/AddFriend.svg" alt="addFriend" />
          )}
        </div>
      )}
    </div>
  );
};

export default AllUserCard;
