import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderWithBack = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-themeNavyDark px-3 py-7 sticky top-0 flex items-center gap-5 text-themeNavyLight">
      <div onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="font-semibold text-xl">{text}</div>
    </div>
  );
};

export default HeaderWithBack;
