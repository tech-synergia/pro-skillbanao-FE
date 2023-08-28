import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    userDetail: (state, action) => {
      const { userId, professionalId, username } = action.payload;
      state.userId = userId;
      state.professionalId = professionalId;
      state.username = username;
    },
    updateKey: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearToken: (state) => {
      state.token = null;
      state.userId = null;
      state.professionalId = null;
      state.username = null;
    },
  },
});

export const { setToken, userDetail, updateKey, clearToken } =
  authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
