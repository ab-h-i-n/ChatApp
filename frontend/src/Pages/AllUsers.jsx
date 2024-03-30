import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import UserCard from "../Components/UserCard";

const AllUsers = () => {
  const user = secureLocalStorage.getItem("user");
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [allUsers,setAllUsers] = useState();

  const fetchAllUsers = () => {

    fetch(`${ApiUrl}/allusers`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        _id : user
      })
    })
    .then(responce => responce.json())
    .then(json => {
      setAllUsers(json.data);
    })

  }

  useEffect(()=>{
    fetchAllUsers();
  },[])

  useEffect(()=>{
    console.log(allUsers);
  },[allUsers])

  return <div className="h-[83.5vh] lg:h-[85vh] bg-themeDark w-[100vw] overflow-y-scroll divide-y-[1px] divide-themeNavyDark px-5">

    {
      allUsers?.map(OneUser => (
        <UserCard key={OneUser?._id} user={OneUser} />
      ))
    }
  </div>;
};

export default AllUsers;
