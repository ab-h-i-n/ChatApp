import React from "react";

const SubmitButton = ({ text, isLoading }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
      }}
      type="submit"
      className={`text-center flex justify-center w-full cursor-pointer ${
        isLoading && "opacity-50"
      } bg-themeOrange hover:brightness-150 focus:brightness-150 text-white py-2 px-3 lg:py-3 lg:text-xl rounded font-medium transition-all duration-150`}
    >
      {isLoading ? <div className="loader w-10 m-2"></div> : text}
    </button>
  );
};

export default SubmitButton;
