import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
const AppStore = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
});

export default AppStore;
