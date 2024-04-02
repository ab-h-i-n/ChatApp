import React, { useContext, useEffect, useState } from 'react'
import HeaderWithBack from "../Components/HeaderWithBack"
import { SocketContext } from '../Context';
import secureLocalStorage from "react-secure-storage";

const FriendRequestPage = () => {
  const { socket } = useContext(SocketContext);
  const user = secureLocalStorage.getItem("user");
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [receivedReq,setReceivedReq] = useState();

  const getFriendReq = () => {

    try{

      fetch(`${ApiUrl}/getfriendreq/${user}`)
      .then(response => response.json())
      .then(json => {

          if(json.error){
            console.error(json.error);
          }else{

            setReceivedReq(json.data.received);

          }

      })

    }catch(error){

      alert('Error : '.error)

    }
    
  }

  useEffect(()=>{
    console.log(receivedReq);
  },[receivedReq])

  useEffect(()=>{
    socket.on("friendRequest",(data) =>{
      console.log('New Friend request!' ,data);
      getFriendReq();
    })
    getFriendReq();
  },[])

  return (
    <div className='min-h-screen bg-themeDark'>
        <HeaderWithBack text={'Friend Requests'}/>

    </div>
  )
}

export default FriendRequestPage