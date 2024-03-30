import React, { useEffect, useRef } from "react";
import AllChats from "./AllChats";
import AllUsers from "./AllUsers";

const MainScreen = ({ activeTab }) => {
  const allChatsRef = useRef(null);
  const allUsersRef = useRef(null);

  useEffect(() => {
    if (activeTab === 0) {
      allChatsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeTab === 1) {
      allUsersRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <div className="w-full flex overflow-hidden">
      <div ref={allChatsRef} className="w-full">
        <AllChats />
      </div>
      <div ref={allUsersRef} className="w-full">
        <AllUsers />
      </div>
    </div>
  );
};

export default MainScreen;
