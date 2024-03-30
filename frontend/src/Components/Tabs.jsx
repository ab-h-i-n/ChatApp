import React, { useState } from "react";

const Tabs = ({activeTab,setActiveTab}) => {

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = ["Chats", "All Users"];

  const Tabitem = ({ item, index }) => {
    return (
      <div
        className={`${
          activeTab === index ? "text-themeOrange" : ""
        } bg-themeNavyDark select-none text-themeNavyLight py-3 hover:brightness-150 text-center transition-all cursor-pointer`}
        onClick={() => handleTabClick(index)}
      >
        {item}
      </div>
    );
  };

  return (
    <div>
      <div className="font-semibold grid grid-cols-2 relative">
        {tabItems.map((item, index) => (
          <Tabitem key={`${item}_${index}`} item={item} index={index} />
        ))}
        <div
          id="bar"
          className={`bg-themeOrange h-1 w-[50%] absolute bottom-0 transition-all `}
          style={{
            left :`${activeTab *50}%`
          }}
        ></div>
      </div>
    </div>
  );
};

export default Tabs;
