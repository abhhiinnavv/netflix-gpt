import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/Validate";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage(null);
  };

  const email = useRef(null);
  const password = useRef(null);
  const displayName = useRef(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleFormClick = () => {
    //validate data

    console.log(email.current.value);
    console.log(password.current.value);
    const message = validateData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    //signin/up
    if (!isSignIn) {
      //signup
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: displayName.current.value,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //signin
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
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

        <motion.form
          drag
          dragElastic={0.5} // Adjust the elasticity as needed
          dragConstraints={{
            left: -500,
            right: 500,
            top: -200,
            bottom: 200,
          }}
          onSubmit={(e) => e.preventDefault()}
          className="absolute w-3/12 p-10 bg-black bg-opacity-85 my-36 mx-auto left-0 right-0 rounded-lg text-white "
        >
          <h1 className=" text-3xl text-white mb-5">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              ref={displayName}
              type="text"
              placeholder="Enter Full Name"
              className="w-full my-2 py-3 px-4 bg-gray-700  text-gray-400 rounded-sm"
            ></input>
          )}
          <input
            ref={email}
            type="text"
            placeholder="Enter Email"
            className="w-full my-2 py-3 px-4 bg-gray-700  text-gray-400 rounded-sm"
          ></input>
          <input
            ref={password}
            type="password"
            placeholder="Enter password"
            className="w-full my-2 py-3 px-4 bg-gray-700 text-gray-400 rounded-sm"
          ></input>
          <p className="text-red-600">{errorMessage}</p>
          <button
            className="w-full my-5 py-3 px-4   bg-red-600 rounded-sm"
            onClick={handleFormClick}
          >
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
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
