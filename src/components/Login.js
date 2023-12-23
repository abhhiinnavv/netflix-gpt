import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header></Header>
      <div>
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/563192ea-ac0e-4906-a865-ba9899ffafad/6b2842d1-2339-4f08-84f6-148e9fcbe01b/IN-en-20231218-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="demo"
        />
        <form className="absolute w-3/12 p-10 bg-black bg-opacity-85 my-36 mx-auto left-0 right-0 rounded-lg text-white ">
          <h1 className=" text-3xl text-white mb-5">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full my-2 py-3 px-4 bg-gray-700  text-gray-400 rounded-sm"
            ></input>
          )}
          <input
            type="text"
            placeholder="Enter Email"
            className="w-full my-2 py-3 px-4 bg-gray-700  text-gray-400 rounded-sm"
          ></input>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full my-2 py-3 px-4 bg-gray-700 text-gray-400 rounded-sm"
          ></input>
          <button className="w-full my-5 py-3 px-4   bg-red-600 rounded-sm">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <p
            className="text-sm py-4 my-4 cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignIn
              ? "New to Netflix? SignUp now!"
              : "Already Registered. SignIn."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
