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
    authenticateUser: create.asyncThunk(
      async (payload) => {
        const response = await userAPI.authenticate(payload);
        return response.data;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.authenticated = true;
          state.profile = action.payload.user;
        },
      }
    ),
    loginUser: create.asyncThunk(
      async (payload) => {
        const response = await userAPI.login(payload);
        return response.data;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
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

export const { loginUser, logoutUser, authenticateUser } = userSlice.actions;

export default userSlice.reducer;
