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
    loginReducerAsync: create.asyncThunk(
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
    logoutReducer: create.reducer((state, action) => {
      state.profile = null;
      state.authenticated = false;
      sessionStorage.removeItem("token");
    }),
  }),
});
/** 
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //setUser: (state, action) => {
    //  state.currentUser = action.payload;
    //  state.isAuth = true;
    //},
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        // Add user to the state array
        console.log("login.pending");
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("login.fulfilled");
        console.log(action.payload);
        // Add user to the state array
        state.currentUser = action.payload;
      });
  },
});

export const login = createAsyncThunk("user/login", async (payload) => {
  const response = await userAPI.login(payload);
  return response.data;
});
*/
export const { loginReducerAsync, logoutReducer } = userSlice.actions;

export default userSlice.reducer;
