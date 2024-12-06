//import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "../../API/userAPI.js";
import { createSlice } from "../../utils/customCreateSlice.js";

const initialState = {
  loading: false,
  profile: null,
  authenticated: false,
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
          case "register":
            response = await userAPI.register(payload.data);
            break;
        }
        return response.data;
      },
      {
        pending: (state, action) => {
          console.log(action);
          state.loading = true;
        },
        rejected: (state, action) => {
          console.log(action);
          state.loading = false;
        },
        fulfilled: (state, action) => {
          console.log(action);
          state.loading = false;
          state.authenticated = true;
          state.profile = action.payload.user;
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

export const { authorizeUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
