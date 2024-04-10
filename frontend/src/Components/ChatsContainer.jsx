import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context";
import secureLocalStorage from "react-secure-storage";
import { useParams } from "react-router-dom";
import Chat from "./Chat";
import ChatInputBox from "./ChatInputBox";

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

  useEffect(() => {
    if (chat) {
      const chatContainer = document.querySelector(".chat-container");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [chat]);

  return (
    <>
      <div className="p-3 flex flex-col gap-y-3 overflow-y-auto pb-28 chat-container">
        {chat?.messages.map((c) => (
          <Chat key={c._id} chat={c} />
        ))}
      </div>
      <ChatInputBox user={user} />
    </>
  );
};


export default ChatsContainer;
