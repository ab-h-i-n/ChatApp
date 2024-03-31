import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { UserContext } from "../Context";
import secureLocalStorage from "react-secure-storage";
import MainScreen from "../Components/MainScreen";
import io from "socket.io-client";

const HomePage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

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
    const socket = io(ApiUrl, {
      auth: {
        token: user,
      },
    });

    socket.on("connect",()=>{
      console.log("connected");
    });

  },[]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="loader w-20 "></div>
        </div>
      ) : (
        <div className={`xl:max-w-[600px]`}>
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />
          <MainScreen activeTab={activeTab} />
        </div>
      )}
    </>
  );
};

export default HomePage;
