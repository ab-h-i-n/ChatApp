import React from "react";

const UserProfilePhoto = ({thisUser,isOwner}) => {
  return (
    <>
      <div className="relative z-10 w-52 aspect-square ">
        <img
          src={thisUser?.profilePhoto}
          alt="profile photo"
          className="w-full object-cover rounded-full aspect-square"
        />
        {isOwner && (
          <>
            {/* file input */}
            <input type="file" id="image" className="hidden" />

            {/* side image for add photo */}
            <label
              htmlFor="image"
              className="cursor-pointer absolute bottom-0 right-0 aspect-square w-16 flex justify-center items-center rounded-full z-50 bg-themeOrange"
            >
              <img
                src="/add_profilephoto_dark.svg"
                alt="add_profilephoto"
                className="w-8"
              />
            </label>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfilePhoto;
