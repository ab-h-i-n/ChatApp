import React from "react";
import ReceivedReqCard from "../Components/ReceivedReqCard";

const FriendReqReceived = ({ receivedReq }) => {
  return (
    <div className="h-full overflow-y-auto w-screen px-5 divide-y-[1px] divide-themeNavy">
      {receivedReq?.map((req,index) => (
        <ReceivedReqCard key={req._id} req={req} />
      ))}
    </div>
  );
};

export default FriendReqReceived;
