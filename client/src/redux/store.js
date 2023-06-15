import { configureStore,  } from '@reduxjs/toolkit';
import authReducer from './Slices/userSlice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth:authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    
  ],
};

// Create a persisted reducer with Redux Persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
  
  const persistor = persistStore(store);
  
  export { store, persistor };