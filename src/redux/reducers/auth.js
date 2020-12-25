import { handleActions } from "redux-actions";
import { SET_IS_LOGGED_IN, SET_ID_TOKEN } from "../constants";

const initialState = {
	isLoggedIn: false,
	idToken: null,
};

const reducer = handleActions(
	{
		[SET_IS_LOGGED_IN]: (state, action) => ({
			...state,
			isLoggedIn: action.isLoggedIn,
		}),

		[SET_ID_TOKEN]: (state, action) => ({
			...state,
			idToken: action.idToken,
		}),
	},
	initialState
);

export default reducer;
