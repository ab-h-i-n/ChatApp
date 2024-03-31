import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";

const UserDetailBox = ({ thisUser, title, value, isEditable, isOwner }) => {
  const [icon, setIcon] = useState("/user.svg");
  const [editKey, setEditKey] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (title == "Name") {
      setIcon("/user.svg");
      setEditKey("name");
    } else if (title == "About") {
      setEditKey("about");
      setIcon("/info.svg");
    } else if (title == "Email") {
      setIcon("/email.svg");
    }
  }, [title]);

  return (
    <>
      <EditModal
        title={title}
        changeKey={editKey}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        defaultValue={value}
      />
      {/* name  container*/}
      <div className="flex items-center justify-between gap-x-5 py-5">
        {/* icon  */}
        <img src={icon} alt="icon" className="w-10" />

        {/* details container */}

        <div className="w-full flex flex-col justify-start">
          {/* title  */}
          <div className="text-themeNavyLight font-medium">{title}</div>
          {/* value  */}
          <div className="text-white font-medium">{value}</div>
        </div>

        {/* edit icon  */}
        {isEditable && isOwner ? (
          <div onClick={handleEdit} className="cursor-pointer hover:brightness-200">
            <img src="/pen.svg" alt="edit" className="w-6" />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default UserDetailBox;
