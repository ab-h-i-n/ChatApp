import React, { useContext } from "react";
import ProfileIcon from "./ProfileIcon";
import { UserContext } from "../Context";
import { Link } from "react-router-dom";
import Tabs from "./Tabs";

const Header = ({ activeTab, setActiveTab }) => {
  const { userData } = useContext(UserContext);

  return (
    <div className="bg-themeNavyDark">
      <div className="p-[1.5rem] flex items-center justify-between">
        {/* logo  */}
        <div className="text-4xl font-semibold text-themeOrange">ChatBox</div>
        {/* profile button  */}
        <Link to={`/user/${userData._id}`} className="bg-themeNavyLight p-1 rounded-full">
          <ProfileIcon src={userData.profilePhoto} />
        </Link>
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Header;
