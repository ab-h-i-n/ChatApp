import React, { useEffect, useRef } from 'react'
import FriendReqReceived from '../Pages/FriendReqReceived';
import FriendReqSend from '../Pages/FriendReqSend';

const FriendReqMainScreen = ({activeTab,sendedReq,receivedReq}) => {
    const sendReqRef = useRef();
    const recievedReqRef = useRef();

    useEffect(()=>{

        if(activeTab == 0){
            recievedReqRef.current.scrollIntoView();
        }else{
            sendReqRef.current.scrollIntoView();
        }

    },[activeTab])
  return (
    <div className='flex h-full overflow-hidden'>
        <div ref={recievedReqRef}>
            <FriendReqReceived receivedReq={receivedReq}/>
        </div>
        <div ref={sendReqRef} >
            <FriendReqSend sendedReq={sendedReq}/>
        </div>
    </div>
  )
}

export default FriendReqMainScreen