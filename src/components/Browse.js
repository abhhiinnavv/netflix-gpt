import React from "react";
import Header from "./Header";
import { NETFLIX_BG } from "../utils/constants";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header></Header>
      <div>
        {/*<img className="absolute w-screen h-auto" src={NETFLIX_BG} alt="demo" />*/}
        <MainContainer className="absolute"></MainContainer>
        <SecondaryContainer className="absolute"></SecondaryContainer>
      </div>
    </div>
  );
};

export default Browse;
