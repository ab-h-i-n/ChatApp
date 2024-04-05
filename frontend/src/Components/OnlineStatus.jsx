import React from "react";

const OnlineStatus = ({ onlineStatus,borderColor }) => {
  return (
    <div
      className={`${
        onlineStatus ? "bg-green-600" : "bg-red-600"
      } ${ borderColor || 'border-themeDark'} absolute w-5 h-5 border-4  rounded-full bottom-0 right-0 `}
    ></div>
  );
};

export default OnlineStatus;
