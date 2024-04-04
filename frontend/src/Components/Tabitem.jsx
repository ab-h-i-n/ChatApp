import React from "react";

const Tabitem = ({index , activeTab , handleTabClick , item}) => {
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

export default Tabitem;
