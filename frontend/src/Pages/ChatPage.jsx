import React, { useState } from "react";
import ChatPageHeader from "../Components/ChatPageHeader";
import ChatsContainer from "../Components/ChatsContainer";
import ChatInputBox from "../Components/ChatInputBox";
import HomePage from "./HomePage";

const ChatPage = () => {
  const [user, setUser] = useState();

  return (
    <div className="lg:grid lg:grid-cols-[600px,1fr] overflow-hidden ">
      <div className="lg:min-w-[600px] lg:h-screen hidden lg:block">
        <HomePage/>
      </div>
      <div className="h-screen w-full grid grid-rows-[100px,1fr]">
        <ChatPageHeader user={user} setUser={setUser} />
        <ChatsContainer user={user} />
      </div>
    </div>
  );
};

export default ChatPage;
