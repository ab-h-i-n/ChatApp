import React, { useEffect, useState } from 'react'
import secureLocalStorage from "react-secure-storage";

const Chat = ({chat}) => {
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const me = secureLocalStorage.getItem("user");

    useEffect(()=>{

        if(chat.sender == me){
            setIsCurrentUser(true);
        }

    },[chat])

  return (
    <>

        <div className={`text-themeWhite flex ${isCurrentUser ? 'justify-end' : ''}`}>
            <div className={`rounded-xl px-3 p-1 max-w-[200px] ${isCurrentUser ? 'bg-themeOrange justify-end rounded-br-none' : 'bg-themeNavyLight rounded-bl-none'} `}>{chat.message}</div>
        </div>

    </>
  )
}

export default Chat