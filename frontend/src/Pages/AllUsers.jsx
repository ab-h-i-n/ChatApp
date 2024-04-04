import React, { useContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import AllUserCard from "../Components/AllUserCard";
import { SocketContext } from "../Context";

const AllUsers = () => {
  const user = secureLocalStorage.getItem("user");
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setLoading] = useState(true);
  const { socket } = useContext(SocketContext);

  const fetchAllUsers = () => {
    setLoading(true);
    fetch(`${ApiUrl}/allusers`, {
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
        setAllUsers(json.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    socket.on("userUpdate", () => {
      console.log("fetching....");
      fetchAllUsers();
    });
    fetchAllUsers();
  }, []);

  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);

  return (
    <div className="relative h-full w-screen bg-themeDark overflow-y-scroll divide-y-[1px] divide-themeNavyDark px-5">
      {isLoading ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="loader w-20"></div>
        </div>
      ) : (
        allUsers?.map((OneUser) => (
          <AllUserCard key={OneUser?._id} user={OneUser}  />
        ))
      )}
    </div>
  );
};

export default AllUsers;
