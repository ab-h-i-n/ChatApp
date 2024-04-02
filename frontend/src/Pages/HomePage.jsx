import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { SocketContext, UserContext } from "../Context";
import secureLocalStorage from "react-secure-storage";
import MainScreen from "../Components/MainScreen";
import { io } from "socket.io-client";

const HomePage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("activeTab")
  );
  const { socket, setSocket } = useContext(SocketContext);

  const user = secureLocalStorage.getItem("user");

  const ApiUrl = import.meta.env.VITE_API_URL;

  const fetchUser = () => {
    fetch(`${ApiUrl}/getuser/${user}`)
      .then((responce) => responce.json())
      .then((json) => {
        if (json.error) {
          alert(`Error : ${json.error}`);
        } else {
          setUserData(json.data);
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    
    if (!socket) {
      const newSocket = io(ApiUrl, {
        auth: {
          token: user,
        },
      });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected Id : ", newSocket.id);
      });
    }

    fetchUser();
  }, []);

  useEffect(() => {
    const activetab = sessionStorage.getItem("activeTab");
    setActiveTab(parseInt(activetab));
  }, [activeTab]);

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="loader w-20 "></div>
        </div>
      ) : (
        <div className={`xl:max-w-[600px] h-screen grid grid-rows-[150px,1fr]`}>
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />
          <MainScreen activeTab={activeTab} />
        </div>
      )}
    </>
  );
};

export default HomePage;
