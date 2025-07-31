import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    signupLoading: false,
    loginLoading: false,
    user: null,
  },
  reducers: {
    setSignupLoading: (state, action) => { state.signupLoading = action.payload },
    setLoginLoading: (state, action) => { state.loginLoading = action.payload },
    setUser: (state, action) => { state.user = action.payload },
  },
});

export const { setSignupLoading, setLoginLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
