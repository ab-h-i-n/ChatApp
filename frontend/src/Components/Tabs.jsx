import React, { useState } from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (index) => {
    setActiveTab(index);

    sessionStorage.setItem("activeTab", index.toString());
  };

  const tabItems = ["Chats", "Friends", "All Users"];

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
    <>
      <div className="z-[50] font-semibold grid grid-cols-3 relative">
        {tabItems.map((item, index) => (
          <Tabitem key={`${item}_${index}`} item={item} index={index} />
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
