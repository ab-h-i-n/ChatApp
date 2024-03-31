import React from "react";
import ProfileIcon from "./ProfileIcon";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user._id}`} className="py-5 flex gap-x-5">
      <div className="relative">
        <ProfileIcon src={user?.profilePhoto} />

        {/* status  */}
        <div className={`${user?.onlineStatus ? 'bg-green-600' : 'bg-red-600'} absolute w-5 h-5 border-4 border-themeDark rounded-full bottom-0 right-0 `}></div>
      </div>
      <div className="flex flex-col">
        {/* name  */}
        <div className="text-themeNavyLight font-semibold">{user?.name}</div>
        {/* about  */}
        <div className="text-themeNavyLight font-medium text-xs">
          {user?.about}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
