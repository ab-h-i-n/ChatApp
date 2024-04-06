import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import ChatsUserCard from "../Components/ChatsUserCard";

const AllChats = () => {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [chats,setChats] = useState();
  const me = secureLocalStorage.getItem("user");

  const fetchChats = () => {
    try {

      fetch(`${ApiUrl}/allchats/${me}`)
      .then(response => response.json())
      .then(json => {

        if(json.error){
          alert('Error : ',json.error)
        }else{
          setChats(json.data);
        }

      })
      
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(()=>{
    console.log("chats: ",chats);
  },[chats])

  useEffect(()=>{
    fetchChats();
  },[])

  return <div className="bg-themeDark h-full w-screen px-5 divide-y-[1px] divide-themeNavyDark">
    
  {
    chats?.map(user => (
      <ChatsUserCard user={user} />
    ))
  }

  </div>;
};

export default AllChats;
