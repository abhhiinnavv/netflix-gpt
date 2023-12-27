import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const AppStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default AppStore;
