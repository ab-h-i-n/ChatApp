import React, { forwardRef } from "react";

const InputBox = forwardRef(({ type, placeholder }, ref) => {
  return (
    <>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="lg:py-3 lg:text-xl p-2 transition-all duration-300 rounded bg-themeNavy outline-none focus:ring-2 text-white focus:ring-themeOrange hover:ring-themeOrange"
      />
    </>
  );
});

export default InputBox;
