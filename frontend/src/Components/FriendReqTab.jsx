import React from "react";
import Tabitem from "./Tabitem";

const FriendReqTab = ({ activeTab, setActive }) => {
    const tabItems = ['Recieved','Send']
    const handleTabClick = (index) => {
        setActive(index);
    }
  return (
    <div className="z-[50] font-semibold grid grid-cols-2 relative">
      {tabItems.map((item, index) => (
        <Tabitem
          key={`${item}_${index}`}
          item={item}
          index={index}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />
      ))}
      <div
        id="bar"
        className={`bg-themeOrange h-1 w-[50%] absolute bottom-0 transition-all `}
        style={{ left: `${activeTab * 50}%` }}
      ></div>
    </div>
  );
};

export default FriendReqTab;
