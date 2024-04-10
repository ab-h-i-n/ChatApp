import React, { useContext, useRef } from "react";
import { SocketContext } from "../Context";
import secureLocalStorage from "react-secure-storage";

const ChatInputBox = ({ user }) => {
  const { socket } = useContext(SocketContext);
  const MsgRef = useRef();
  const user_id = secureLocalStorage.getItem("user");

  const handleSendMsg = (e) => {
    e.preventDefault();

    socket.emit("sendmsg", {
      msg: MsgRef.current.value,
      sender_id: user_id,
      receiver_id: user?._id,
    });

    MsgRef.current.value = "";
  };

  return (
    <div className="fixed bottom-5 w-full lg:pr-[600px] flex justify-center">
      <form
        onSubmit={handleSendMsg}
        className="w-full max-w-[1000px] grid grid-cols-[1fr,50px] px-5 gap-x-2 "
      >
        {/* input box  */}
        <input
          type="text"
          ref={MsgRef}
          className="rounded-full bg-themeNavyDark px-3 py-2 text-themeWhite outline-none focus:ring-2 ring-themeOrange"
          placeholder="Message"
        />

        {/* send button  */}
        <button
          type="submit"
          className="bg-themeOrange w-[50px] grid place-content-center aspect-square rounded-full"
        >
          <img src="/sendIcon.svg" alt="send" className="w-7" />
        </button>
      </form>
    </div>
  );
};

export default ChatInputBox;
