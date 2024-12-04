/**
import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

export default function createSlice() {
  buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
  });
}
*/

import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

export const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
