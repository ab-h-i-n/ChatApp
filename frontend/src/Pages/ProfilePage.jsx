import React, { useContext, useEffect, useState } from "react";
import HeaderWithBack from "../Components/HeaderWithBack";
import secureLocalStorage from "react-secure-storage";
import { useNavigate, useParams } from "react-router-dom";
import UserDetailBox from "../Components/UserDetailBox";
import UserProfilePhoto from "../Components/UserProfilePhoto";
import SubmitButton from "../Components/SubmitButton";
import { SocketContext, UserContext } from "../Context";

const ProfilePage = () => {
  const [isOwner, setOwner] = useState(false);
  const user = secureLocalStorage.getItem("user");
  const { id } = useParams();
  const [thisUser, setThisUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const {userData} = useContext(UserContext);
  const {socket,setSocket} = useContext(SocketContext);


  const ApiUrl = import.meta.env.VITE_API_URL;

  const fetchUser = () => {
    setLoading(true);
    fetch(`${ApiUrl}/getuser/${id}`)
      .then((responce) => responce.json())
      .then((json) => {
        if (json.error) {
          alert(`Error : ${json.error}`);
        } else {
          setThisUser(json.data);
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  const handleLogOut = () => {
    if (btnLoading) {
      return;
    }

    try {
      setBtnLoading(true);
      socket.disconnect();
      secureLocalStorage.clear();
      setSocket(null);
    } catch (error) {
      alert("Error" + error);
    } finally {
      setBtnLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (user == id) {
      setOwner(true);
    }
  }, []);

  // useEffect(() => {
  //   console.log(thisUser);
  // }, [thisUser]);

  useEffect(() => {
    fetchUser();
  }, [userData]);

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="loader w-20 "></div>
        </div>
      ) : (
        <div className="min-h-screen bg-themeDark">
          <HeaderWithBack text={"Profile"} />

          {/* profile photo container  */}
          <div className="flex justify-center py-5">
            {/* profile photo  */}
            <UserProfilePhoto thisUser={thisUser} isOwner={isOwner} />
          </div>

          {/* user details container  */}
          <div className="px-5 mt-5 grid divide-y-[1px] divide-themeNavyDark lg:px-[600px]">
            <UserDetailBox
              thisUser={thisUser}
              title={"Name"}
              value={thisUser.name}
              isEditable={true}
              isOwner={isOwner}
            />
            <UserDetailBox
              thisUser={thisUser}
              title={"About"}
              value={thisUser.about}
              isEditable={true}
              isOwner={isOwner}
            />
            {isOwner ? (
              <UserDetailBox
                thisUser={thisUser}
                title={"Email"}
                value={thisUser.email}
                isEditable={false}
                isOwner={isOwner}
              />
            ) : (
              ""
            )}
          </div>

          {isOwner && (
            <div
              onClick={handleLogOut}
              className="fixed bottom-10 w-full flex justify-center"
            >
              <div className="max-w-40">
                <SubmitButton text={"Log Out"} isLoading={btnLoading} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
