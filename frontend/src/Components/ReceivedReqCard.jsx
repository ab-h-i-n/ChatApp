import React, { useEffect, useState } from "react";
import ProfileIcon from "./ProfileIcon";
import SubmitButton from "./SubmitButton";
import secureLocalStorage from "react-secure-storage";

const ReceivedReqCard = ({ req }) => {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [userDetails, setUserDetails] = useState();
  const [isRBtnLoading, setRBtnLoading] = useState(false);
  const [isABtnLoading, setABtnLoading] = useState(false);
  const user = secureLocalStorage.getItem("user");

  const getUserDetails = () => {
    try {
      fetch(`${ApiUrl}/getuserprofile/${req.from}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            console.error(json.error);
          } else {
            setUserDetails(json.data);
          }
        });
    } catch (error) {
      alert(`Error : ${error}`);
    }
  };

  const handleReject = () => {
    setRBtnLoading(true);
    fetch(`${ApiUrl}/rejectfriendreq`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: user,
        sender_id: req.from,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          console.error(json.error);
        } else {
          alert(json.data);
        }
        setRBtnLoading(false);
      });
  };

  const handleAccept = () => {
    setABtnLoading(true);
    fetch(`${ApiUrl}/acceptfriendreq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: user,
        sender_id: req.from,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          console.error(json.error);
        } else {
          alert(json.data);
        }
        setABtnLoading(false);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, [req]);

  return (
    <div className="py-7 flex items-center gap-x-5">
      {/* icon  */}
      <div>
        <ProfileIcon src={userDetails?.profilePhoto} />
      </div>
      {/* name and time  */}
      <div className="flex flex-col justify-center gap-1">
        <p className="text-themeNavyLight font-medium">{userDetails?.name}</p>
        <p className="text-xs text-themeNavyLight font-light">
          {req?.createdAt}
        </p>
      </div>
      {/* accept reject button  */}
      <div className="flex gap-x-3">
        <div
          className={`${
            isRBtnLoading
              ? "opacity-50 pointer-events-none"
              : "opacity-1 pointer-events-auto"
          }`}
          onClick={handleAccept}
        >
          <SubmitButton text={"Accept"} isLoading={isABtnLoading} />
        </div>
        <div
          className={`${
            isABtnLoading
              ? "opacity-50 pointer-events-none"
              : "opacity-1 pointer-events-auto"
          }`}
          onClick={handleReject}
        >
          <SubmitButton text={"Reject"} isLoading={isRBtnLoading} />
        </div>
      </div>
    </div>
  );
};

export default ReceivedReqCard;
