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
    <div className="w-full flex overflow-hidden sticky top-24 lg:top-28">
      <div ref={allChatsRef} className="w-full ">
        <AllChats />
      </div>
      <div ref={friends} className="w-full">
        <Friends />
      </div>
      <div ref={allUsersRef} className="w-full">
        <AllUsers />
      </div>
    </div>
  );
};

export default MainScreen;
