import React from "react";
import FriendRequestsCard from "../Components/FriendRequestsCard"
const Friends = () => {
  return (
    <div className="h-[83.5vh] lg:h-[85vh] bg-themeDark w-[100vw]">
      {/* friend requests  */}
      <FriendRequestsCard/>
    </div>
  );
};

export default Friends;
