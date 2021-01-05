import { createReducer } from "@reduxjs/toolkit";
import { SET_IS_LOGGED_IN, SET_ID_TOKEN } from "../constants";

const initialState = {
	isLoggedIn: false,
	idToken: null,
};

export default createReducer(initialState, {
	[SET_IS_LOGGED_IN]: (state, { payload }) => ({
		...state,
		isLoggedIn: payload.isLoggedIn,
	}),

	[SET_ID_TOKEN]: (state, { payload }) => ({
		...state,
		idToken: payload.idToken,
	}),
});
