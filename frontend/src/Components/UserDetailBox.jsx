import React, { useEffect, useState } from "react";

const UserDetailBox = ({ thisUser, title, value, isEditable, isOwner }) => {
  const [icon, setIcon] = useState("/user.svg");

  useEffect(() => {
    if (title == "Name") {
      setIcon("/user.svg");
    } else if (title == "About") {
      setIcon("/info.svg");
    } else if (title == "Email") {
      setIcon("/email.svg");
    }
  }, [title]);

  return (
    <>
      {/* name  container*/}
      <div className="flex items-center justify-between gap-x-5 py-5">
        {/* icon  */}
        <img src={icon} alt="icon" className="w-10" />

        {/* details container */}

        <div className="w-full flex flex-col justify-start">
          {/* title  */}
          <div className="text-themeNavyLight font-medium">{title}</div>
          {/* value  */}
          <div className="text-white font-medium">{value}</div>
        </div>

        {/* edit icon  */}
        {isEditable && isOwner ? (
          <img src="/pen.svg" alt="edit" className="w-6" />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default UserDetailBox;
