import React from "react";
import SendReqCard from "../Components/SendReqCard";

const FriendReqSend = ({ sendedReq }) => {
  return (
    <div className="h-full overflow-y-auto w-screen px-5 divide-y-[1px] divide-themeNavy">
      {sendedReq?.slice().reverse().map((req) => (
        <SendReqCard key={req._id} req={req} />
      ))}
    </div>
  );
};

export default FriendReqSend;
