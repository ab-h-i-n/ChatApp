import React, { useContext } from "react";
import ProfileIcon from "./ProfileIcon";
import { UserContext } from "../Context";
import { Link } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(UserContext);

  return (
    <div className="fixed top-0 w-full bg-themeNavyDark p-5 flex items-center justify-between">
      {/* logo  */}
      <div className="text-4xl font-semibold text-themeOrange">ChatBox</div>
      {/* profile button  */}
      <Link to={'/profile'} className="bg-themeNavyLight p-1 rounded-full">
        <ProfileIcon src={userData.profilePhoto} />
      </Link>
    </div>
  );
};

export default Header;
