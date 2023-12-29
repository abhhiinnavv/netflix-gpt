import React from "react";
import { CDN_MOVIES } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <>
      <img className="px-2" src={CDN_MOVIES + posterPath} alt="demo"></img>
    </>
  );
};

export default MovieCard;
