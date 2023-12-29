import React from "react";
import { FaPlay } from "react-icons/fa";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" px-[6%] pt-[18%] absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="font-bold text-3xl w-1/4">{title}</h1>
      <p className="text-xl py-6 w-1/4">{overview}</p>
      <div className="flex">
        <button className="bg-white text-black w-wrap text-xl rounded-md px-10 py-4 mx-4 flex hover:bg-opacity-60">
          <FaPlay className="mx-2 mt-1" />
          Play
        </button>
        <button className="bg-gray-500 text-white  w-wrap text-xl rounded-md px-10 py-4 bg-opacity-70 hover:bg-opacity-50">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
