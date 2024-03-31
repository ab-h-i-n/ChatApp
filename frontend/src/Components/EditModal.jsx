import React, { useContext, useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import InputBox from "./InputBox";
import SubmitButton from "./SubmitButton";
import { UserContext } from "../Context";

const EditModal = ({ title, changeKey, modalOpen, setModalOpen, defaultValue }) => {
  const id = secureLocalStorage.getItem("user");
  const inputRef = useRef();
  const [btnLoading, setBtnLoading] = useState(false);
  const [changedData, setChangedData] = useState({
    _id: id,
  });
  const { setUserData } = useContext(UserContext);

  const ApiUrl = import.meta.env.VITE_API_URL;

  const setDataToSend = () => {
    if (changeKey === "name") {
      setChangedData({
        ...changedData,
        name: inputRef.current.value,
      });
    } else if (changeKey === "about") {
      setChangedData({
        ...changedData,
        about: inputRef.current.value,
      });
    }
  };


  const saveChanges = () => {
    if (btnLoading) {
      return;
    }

    setBtnLoading(true);
    fetch(`${ApiUrl}/edit/${changeKey}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedData),
    })
      .then((responce) => responce.json())
      .then((json) => {
        if (json.error) {
          alert(`Error : ${json.error}`);
        } else {
          setUserData(json.data);
          alert("Saved Changes!");
        }
      })
      .then(() => {
        setBtnLoading(false);
        setModalOpen(false);
      });
  };

  return (
    <>
      {/* background  */}
      <div
        onClick={() => setModalOpen(false)}
        className={`fixed top-0 left-0 h-screen w-screen transition-all backdrop-blur-md z-50 ${
          modalOpen
            ? "opacity-1 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* modal  */}
      <div
        className={`z-[100] fixed bottom-0 left-[50%] translate-x-[-50%] w-full lg:w-[50%] grid gap-y-10 p-10 pb-20 bg-themeNavyDark rounded-t-3xl transition-all ${
          modalOpen
            ? "translate-y-[0px] opacity-1"
            : "translate-y-[100vh] opacity-0"
        }`}
      >
        <div className="grid gap-y-2">
          <span className="text-themeNavyLight font-medium ">{title}</span>
          <InputBox ref={inputRef} type={"text"} defaultValue={defaultValue} onChange={setDataToSend} />
        </div>
        <div onClick={()=>{
            saveChanges();
        }}>
          <SubmitButton text={"Save"} isLoading={btnLoading} />
        </div>
      </div>
    </>
  );
};

export default EditModal;
