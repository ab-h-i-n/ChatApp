import React, { useState } from "react";
import Tabitem from "./Tabitem";
const Tabs = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (index) => {
    setActiveTab(index);

    sessionStorage.setItem("activeTab", index.toString());
  };

  const tabItems = ["Chats", "Friends", "All Users"];

  return (
    <>
      <div className="z-[50] font-semibold grid grid-cols-3 relative">
        {tabItems.map((item, index) => (
          <Tabitem key={`${item}_${index}`} item={item} index={index} activeTab={activeTab} handleTabClick={handleTabClick} />
        ))}
        <div
          id="bar"
          className={`bg-themeOrange h-1 w-[33.33%] absolute bottom-0 transition-all `}
          style={{ left: `${activeTab * 33.33}%` }}
        ></div>
      </div>
    </>
  );
};

export default Tabs;
