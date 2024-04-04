import React, { useEffect, useState } from "react";
import ProfileIcon from "./ProfileIcon";

const SendReqCard = ({ req }) => {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [userDetails, setUserDetails] = useState();
  const [isLoading, setLoading] = useState();

  const getUserDetails = () => {
    try {
      fetch(`${ApiUrl}/getuserprofile/${req.to}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            console.error(json.error);
          } else {
            setUserDetails(json.data);
          }
        });
    } catch (error) {
      alert(`Error : ${error}`);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [req]);

  return (
    <div className="py-7 flex items-center gap-x-5 justify-between">
      {/* icon  */}
      <div><ProfileIcon src={userDetails?.profilePhoto} /></div>
      {/* name and time  */}
      <div className="w-full flex flex-col justify-center gap-1 items-start">
        <p className="text-themeNavyLight font-medium">{userDetails?.name}</p>
        <p className="text-xs text-themeNavyLight font-light">
          {req?.createdAt}
        </p>
      </div>
      {/* staus  */}
      <div className="flex items-center gap-x-3 relative">
        <div className={`absolute w-4 aspect-square rounded-full animate-ping ${req?.isRejected ? "bg-[#ff2929]" : " bg-[#ffad29]"}`}></div>
        <div className={`w-4 aspect-square rounded-full ${req?.isRejected ? "bg-[#ff2929]" : "bg-[#ffe629] "}`}></div>
        <p className="text-xs font-medium text-themeNavyLight">{req?.isRejected ? "Rejected" : "Pending..."}</p>
      </div>
    </div>
  );
};

export default SendReqCard;
