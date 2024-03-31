import React from "react";

const FriendRequestsCard = () => {
  return (
    <div className="cursor-pointer p-5 flex gap-x-5 items-center justify-between backdrop-brightness-125">
      {/* icon  */}
      <img src="/friendReq.svg" alt="friendrequests" className="w-10" />
      {/* text  */}
      <div className="text-themeNavyLight font-semibold w-full">
        Friend requests
      </div>
      {/* count  */}
      <div className="flex items-center justify-center">
        {/* for animation  */}
        <div className="w-8 aspect-square bg-themeOrange animate-ping absolute rounded-full"></div>
        <div className="w-7 grid place-items-center aspect-square bg-themeOrange rounded-full text-white">{`0`}</div>
      </div>
    </div>
  );
};

export default FriendRequestsCard;
