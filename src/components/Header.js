import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        //localStorage.clear();
        //navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        localStorage.clear();
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data and update Redux store

        if (user && user.displayName) {
          const displayName = await user.displayName;
          localStorage.setItem("displayName", displayName);
          setName(localStorage.getItem("displayName"));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(name);

  return (
    <div className="absolute w-screen h-auto px-2 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-48"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="demo"
      />

      {/*<Provider store={AppStore}>{user && <p>{displayName}</p>}</Provider>*/}

      {user && (
        <div className="flex px-2 py-2">
          {name && (
            <p className="my-4 mx-4 text-white font-bold text-xl">
              Welcome, {name}
            </p>
          )}
          <div className="flex justify-between">
            <img
              className="relative w-12 h-12"
              src="https://i.imgur.com/WM6zTNc.png"
              alt="default"
            ></img>
            <button
              className="absolute text-xs text-white shadow-xl mt-5"
              onClick={handleSignOut}
            >
              (Sign Out)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
