//import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "../../API/userAPI.js";
import { createSlice } from "../../utils/customCreateSlice.js";
import resourceMsg from "../../utils/resourceMsg.js";

const initialState = {
  loading: false,
  profile: null,
  authenticated: false,
  verified: false,
  isError: false,
  userMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    authorizeUser: create.asyncThunk(
      async (payload) => {
        const authType = payload.type;
        let response = {
          data: null,
        };
        switch (authType) {
          case "authFromToken":
            response = await userAPI.authFromToken();
            break;
          case "login":
            response = await userAPI.login(payload.data);
            break;
        }
        return response.data;
      },
      {
        fulfilled: (state, action) => {
          console.log(action);
          state.loading = false;
          state.authError = !action.payload.success;
          state.userMessage = resourceMsg(action.payload.message);
          if (action.payload.success) {
            state.authenticated = true;
            state.profile = action.payload.user;
            sessionStorage.setItem("token", action.payload.token);
          }
        },
      }
    ),
    registerUser: create.asyncThunk(
      async (payload) => {
        const response = await userAPI.register(payload.data);
        return response.data;
      },
      {
        fulfilled: (state, action) => {
          console.log(action);
          state.loading = false;
          state.isError = !action.payload.success;
          state.userMessage =
            resourceMsg(action.payload.message) || action.payload.message;
        },
      }
    ),
    logoutUser: create.reducer((state, action) => {
      state.profile = null;
      state.authenticated = false;
      sessionStorage.removeItem("token");
    }),
  }),
});

export const { authorizeUser, registerUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
