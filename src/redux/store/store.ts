import { configureStore } from "@reduxjs/toolkit";
import worldviewReducer from "../mapSlice/mapSlice";

export const store = configureStore({
  reducer: {
    worldview: worldviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
