import taskReducer from "./tasksSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { connectRouter } from "connected-react-router";
import { history } from "../utils";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["isAuthenticated"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  task: taskReducer,
  user: userReducer,
  authentication: persistedReducer,
  router: connectRouter(history),
});

export default rootReducer;
