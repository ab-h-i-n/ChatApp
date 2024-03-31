import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../Context";
import secureLocalStorage from "react-secure-storage";

const UserProfilePhoto = ({ thisUser, isOwner }) => {
  const photoRef = useRef();
  const ApiUrl = import.meta.env.VITE_API_URL;
  const id = secureLocalStorage.getItem("user");
  const { setUserData } = useContext(UserContext);
  const [isPhotoLoading, setPhotoLoading] = useState(false);

  const uploadProfilePhoto = () => {
    if (photoRef.current.files[0]) {
      setPhotoLoading(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64String = event.target.result;
        try {
          const response = await fetch(`${ApiUrl}/edit/profilePhoto`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: id,
              profilePhoto: base64String,
            }),
          });
          const json = await response.json();
          if (json.error) {
            alert(`Error: ${json.error}`);
          } else {
            setUserData(json.data);
            alert("Profile photo updated successfully!");
            setPhotoLoading(false);
          }
        } catch (error) {
          alert(`Error: ${error.message}`);
          setPhotoLoading(false);
        }
      };
      reader.readAsDataURL(photoRef.current.files[0]);
    } else {
      alert("No photo selected!");
      setPhotoLoading(false);
    }
  };

  return (
    <>
      <div className="relative z-10 w-52 aspect-square ">
        <div
          className={`${
            isPhotoLoading ? "" : "hidden"
          } backdrop-brightness-90 absolute w-[105%] aspect-square translate-x-[-5px] translate-y-[-5px] rounded-full backdrop-blur-sm`}
        >
          <div className="loader w-10 absolute top-[50%] left-[40%]"></div>
        </div>
        <img
          src={thisUser?.profilePhoto}
          alt="profile photo"
          className="w-full object-cover rounded-full aspect-square"
        />
        {isOwner && (
          <>
            {/* file input */}
            <input
              type="file"
              id="image"
              className="hidden"
              ref={photoRef}
              onChange={uploadProfilePhoto}
            />

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
