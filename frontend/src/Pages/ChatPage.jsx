import React, { useState } from 'react'
import ChatPageHeader from '../Components/ChatPageHeader'
import ChatsContainer from '../Components/ChatsContainer';
import ChatInputBox from '../Components/ChatInputBox';

const ChatPage = () => {
  const [user,setUser] = useState();



  return (
    <div className='h-screen grid grid-rows-[100px,1fr]'>
      <ChatPageHeader user={user} setUser={setUser} />
      <ChatsContainer user={user}/>
      <ChatInputBox user={user} />
    </div>
  )
}

export default ChatPage