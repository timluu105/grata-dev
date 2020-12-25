import { createAction } from "redux-actions";
import { SET_IS_LOGGED_IN, SET_ID_TOKEN } from "../constants";

export const setIsLoggedIn = createAction(SET_IS_LOGGED_IN);
export const setIdToken = createAction(SET_ID_TOKEN);

export default {
	setIsLoggedIn,
	setIdToken,
};
