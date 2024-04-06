import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context";
import secureLocalStorage from "react-secure-storage";
import { useParams } from "react-router-dom";
import Chat from "./Chat";

const ChatsContainer = ({ user }) => {
  const { id } = useParams();
  const { socket } = useContext(SocketContext);
  const me = secureLocalStorage.getItem("user");
  const [chat, setChat] = useState();
  const ApiUrl = import.meta.env.VITE_API_URL;

  const fetchChat = () => {
    const roomId = me < id ? me + id : id + me;

    try {
      fetch(`${ApiUrl}/getChat/${roomId}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            alert(`Error : ${json.error}`);
          } else {
            setChat(json.data);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(chat);
  }, [chat]);

  useEffect(() => {
    fetchChat();
    socket.on("chat-update", (data) => {
      setChat(data);
    });
  }, []);

  return <div className="p-3 flex flex-col gap-y-3">

    {
      chat?.messages.map(c => (

        <Chat key={c._id} chat={c}/>

      ))
    }

  </div>;
};

export default ChatsContainer;
