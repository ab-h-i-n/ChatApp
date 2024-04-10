import React, { useEffect, useRef } from "react";
import AllChats from "../Pages/AllChats";
import AllUsers from "../Pages/AllUsers";
import Friends from "../Pages/Friends";

const MainScreen = ({ activeTab }) => {
  const allChatsRef = useRef(null);
  const allUsersRef = useRef(null);
  const friends = useRef(null);

  useEffect(() => {
    if (activeTab === 0) {
      allChatsRef.current.scrollIntoView(); // add { behavior: "smooth" } to makae smooth
    } else if (activeTab === 1) {
      friends.current.scrollIntoView();
    } else if (activeTab === 2) {
      allUsersRef.current.scrollIntoView();
    }
  }, [activeTab]);

  return (
    <div className="flex overflow-hidden  ">
      <div ref={allChatsRef} className="w-full max-w-[600px] ">
        <AllChats />
      </div>
      <div ref={friends} className="w-full max-w-[600px]">
        <Friends />
      </div>
      <div ref={allUsersRef} className="w-full max-w-[600px]">
        <AllUsers />
      </div>
    </div>
  );
};

export default MainScreen;
