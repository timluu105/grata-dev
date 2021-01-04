import { combineReducers } from "redux";
import auth from "./auth";
import window from "./window";
import user from "./user";

const appReducer = combineReducers({
	auth,
	window,
	user,
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
