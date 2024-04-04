import React, { useContext, useEffect, useState } from "react";
import HeaderWithBack from "../Components/HeaderWithBack";
import { SocketContext } from "../Context";
import secureLocalStorage from "react-secure-storage";
import FriendReqMainScreen from "../Components/FriendReqMainScreen";
import FriendReqTab from "../Components/FriendReqTab";

const FriendRequestPage = () => {
  const { socket } = useContext(SocketContext);
  const user = secureLocalStorage.getItem("user");
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [receivedReq, setReceivedReq] = useState();
  const [sendedReq, setSendedReq] = useState();
  const [activeTab, setActive] = useState(0);

  const getFriendReq = () => {
    try {
      fetch(`${ApiUrl}/getfriendreq/${user}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            console.error(json.error);
          } else {
            setReceivedReq(json.data.received);
            setSendedReq(json.data.send);
          }
        });
    } catch (error) {
      alert("Error : ".error);
    }
  };

  useEffect(() => {
    console.log("recived", receivedReq);
    console.log("sended", sendedReq);
  }, [receivedReq, sendedReq]);

  useEffect(() => {
    socket.on("friendRequest", () => {
      console.log("Updating friend requests!");
      getFriendReq();
    });
    getFriendReq();
  }, []);

  return (
    <div className=" bg-themeDark h-screen grid grid-rows-[88px,50px,1fr]">
      <HeaderWithBack text={"Friend Requests"} />
      <FriendReqTab activeTab={activeTab} setActive={setActive} />
      <FriendReqMainScreen
        activeTab={activeTab}
        sendedReq={sendedReq}
        receivedReq={receivedReq}
      />
    </div>
  );
};

export default FriendRequestPage;
