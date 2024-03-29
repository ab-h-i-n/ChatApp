import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { UserContext } from "../Context";
import secureLocalStorage from "react-secure-storage";

const HomePage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  const user = secureLocalStorage.getItem("user");

  const ApiUrl = import.meta.env.VITE_API_URL;

  const fetchUser = () => {
    fetch(`${ApiUrl}/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: user,
      }),
    })
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
    fetchUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="loader w-20 "></div>
        </div>
      ) : (
        <div>
          <Header />
        </div>
      )}
    </>
  );
};

export default HomePage;
