import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./Post";
export default combineReducers({
  alert,
  auth,
  profile,
  post,
});
