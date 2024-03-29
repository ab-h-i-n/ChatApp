import React from "react";

const ProfileIcon = ({ src }) => {
  return (
    <div className="w-12 aspect-square rounded-full overflow-hidden">
      <img src={src} className="w-full h-full object-cover" />
    </div>
  );
};

export default ProfileIcon;
