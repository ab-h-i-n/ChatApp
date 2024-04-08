import React, { useContext, useRef, useState } from "react";
import InputBox from "../Components/InputBox";
import SubmitButton from "../Components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const SignUpPage = () => {
  const [next, setNext] = useState(false);
  const [image, setImage] = useState("/add_profilephoto.svg");
  const [isLoading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const photoRef = useRef();

  const navigate = useNavigate();

  const ApiUrl = import.meta.env.VITE_API_URL;

  const handleNext = () => {
    if (isLoading) {
      return;
    }

    if (emailRef.current.value !== "" && passwordRef.current.value !== "") {
      setLoading(true);
      fetch(`${ApiUrl}/checkuserexist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
        }),
      })
        .then((responce) => {
          if (!responce.ok) {
            setNext(true);
          } else
            responce.json().then((error) => {
              alert(`Error : ${error.message}`);
            });
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      alert("Enter values for all fields!");
    }
  };

  const handleImageUpload = () => {
    if (photoRef.current.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target.result;
        setImage(base64String);
      };

      reader.readAsDataURL(photoRef.current.files[0]);
    }
  };

  const handleSignUp = () => {
    if (isLoading) {
      return;
    }

    setLoading(true);

    fetch(`${ApiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        profilePhoto: image,
      }),
    })
      .then((responce) => responce.json())
      .then((json) => {
        if (json.error) {
          alert(`Error : ${json.error}`);
        } else {
          secureLocalStorage.setItem("user", json.data._id);
          localStorage.setItem('hasLoggedIn',true);
          alert("User Created Succefully!");
          navigate("/");
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* form 1  */}
      <div
        className={`${
          next ? "translate-x-[-100vw]" : ""
        } transition-all absolute top-0 left-0 h-screen w-screen text-themeNavyLight overflow-hidden`}
      >
        {/* {email and pass form } */}
        <form className="max-w-[650px] grid gap-y-5 rounded-3xl px-5 py-10 lg:px-10 lg:py-14 w-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          {/* icon  */}
          <div className="grid gap-y-2 place-items-center">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 122.88 108.25"
              className="text-themeOrange fill-current w-32 "
            >
              <defs></defs>
              <title>chat-bubble</title>
              <path
                className="cls-1"
                d="M51.16,93.74c13,12.49,31.27,16.27,49.59,8.46l15.37,6L111,96.13c17.08-13.68,14-32.48,1.44-45.3a44.38,44.38,0,0,1-4.88,13.92A51.45,51.45,0,0,1,93.45,80.84a62.51,62.51,0,0,1-19.73,10,71.07,71.07,0,0,1-22.56,2.92ZM74.74,36.13a6.68,6.68,0,1,1-6.68,6.68,6.68,6.68,0,0,1,6.68-6.68Zm-44.15,0a6.68,6.68,0,1,1-6.68,6.68,6.68,6.68,0,0,1,6.68-6.68Zm22.08,0A6.68,6.68,0,1,1,46,42.81a6.68,6.68,0,0,1,6.68-6.68ZM54,0H54c14.42.44,27.35,5.56,36.6,13.49,9.41,8.07,15,19,14.7,31v0c-.36,12-6.66,22.61-16.55,30.11C79,82.05,65.8,86.4,51.38,86a64.68,64.68,0,0,1-11.67-1.4,61,61,0,0,1-10-3.07L7.15,90.37l7.54-17.92A43.85,43.85,0,0,1,4,59,36.2,36.2,0,0,1,0,41.46c.36-12,6.66-22.61,16.55-30.12C26.3,4,39.53-.4,54,0ZM53.86,5.2h0C40.59,4.82,28.52,8.77,19.69,15.46,11,22,5.5,31.28,5.19,41.6A31.2,31.2,0,0,0,8.61,56.67a39.31,39.31,0,0,0,10.81,13L21,70.87,16.68,81.05l13.08-5.14,1,.42a55.59,55.59,0,0,0,10.05,3.18A59,59,0,0,0,51.52,80.8c13.22.39,25.29-3.56,34.12-10.26C94.31,64,99.83,54.73,100.15,44.4v0c.3-10.32-4.65-19.85-12.9-26.92C78.85,10.26,67.06,5.6,53.87,5.2Z"
              />
            </svg>
            <span className="font-black text-2xl lg:text-3xl flex gap-1">
              Welcome to
              <h1 className="text-themeOrange ">Chat Box!</h1>
            </span>
          </div>

          {/* inputs  */}

          <InputBox
            type={"email"}
            placeholder={"Enter your email"}
            ref={emailRef}
          />
          <InputBox
            type={"password"}
            placeholder={"Enter your Password"}
            ref={passwordRef}
          />
          <div onClick={handleNext}>
            <SubmitButton text={"Next"} isLoading={isLoading} />
          </div>

          {/* login link  */}
          <span className="text-center">
            Already have an account?{" "}
            <Link
              to={!isLoading && "/login"}
              className={`${
                isLoading && "opacity-50"
              } text-themeOrange font-semibold`}
            >
              Login
            </Link>
          </span>
        </form>
      </div>
      {/* form 2  */}
      <div
        className={`${
          next ? "translate-x-0" : "translate-x-[100vw]"
        } transition-all absolute top-0 left-0 h-screen w-screen text-themeNavyLight overflow-hidden`}
      >
        {/* {email and pass form } */}
        <form className="max-w-[650px] grid gap-y-5 lg:gap-y-8 rounded-3xl px-5 py-10 lg:px-10 lg:py-14 w-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          {/* icon  */}
          <input
            type="file"
            className="hidden"
            id="photo"
            onChange={handleImageUpload}
            ref={photoRef}
          />
          <div className="flex justify-center">
            <label
              htmlFor="photo"
              className="cursor-pointer w-40 h-40 lg:w-60 lg:h-60 bg-themeNavyDark rounded-full flex items-center justify-center"
            >
              <img
                className=" object-cover w-40 h-40 lg:w-60 lg:h-60 rounded-full"
                src={image}
                alt="profile photo"
              />
            </label>
          </div>

          {/* inputs  */}

          <InputBox
            type={"text"}
            placeholder={"Enter your Name"}
            ref={nameRef}
          />
          <div className="flex gap-x-2">
            <div
              className="w-full"
              onClick={() => {
                setNext(false);
              }}
            >
              <div className={`w-full ${isLoading && "opacity-50"}`}>
                {" "}
                <SubmitButton text={"Back"} />
              </div>
            </div>
            <div className="w-full" onClick={handleSignUp}>
              <SubmitButton text={"Sign Up"} isLoading={isLoading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
