import { combineReducers } from "redux";
import auth from "./auth";
import window from "./window";

const appReducer = combineReducers({
	auth,
	window,
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
