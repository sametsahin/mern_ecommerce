import { createAsyncThunk } from "@reduxjs/toolkit";

//reset error action
export const resetErrAction = createAsyncThunk("reset-err-action", () => {
  return {};
});

//reset success action
export const resetSuccessAction = createAsyncThunk(
  "reset-success-action",
  () => {
    return {};
  }
);
