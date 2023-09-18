import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    userDetail: (state, action) => {
      const { userId, professionalId, username, image, mainRole, minutes } =
        action.payload;
      state.userId = userId;
      state.professionalId = professionalId;
      state.username = username;
      state.image = image;
      state.mainRole = mainRole;
      state.minutes = minutes;
    },
    updateKey: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearCoupon: (state) => {
      state.minutes = null;
    },
    clearToken: (state) => {
      state.token = null;
      state.userId = null;
      state.professionalId = null;
      state.username = null;
      state.image = null;
      state.mainRole = null;
      state.minutes = null;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const { setToken, userDetail, updateKey, clearToken, clearCoupon } =
  authSlice.actions;

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
