import { createReducer } from "@reduxjs/toolkit";
import { GET_USERS, ADD_USER, EDIT_USER, REMOVE_USER } from "../constants";
import {
	requestSuccess,
	requestFail,
	requestPending,
} from "../../utils/status";

const initialState = {
	users: [],
	loading: true,
	status: "INIT",
	params: {
		page: 1,
	},
	error: null,
};

export default createReducer(initialState, {
	[requestSuccess(GET_USERS)]: (state, { payload }) => ({
		...state,
		users: payload,
		status: requestSuccess(GET_USERS),
		error: null,
	}),

	[requestPending(GET_USERS)]: (state, { payload }) => ({
		...state,
		status: requestPending(GET_USERS),
	}),

	[requestFail(GET_USERS)]: (state, { payload }) => ({
		...state,
		users: payload.users,
		status: requestFail(GET_USERS),
		error: payload.error,
	}),

	// [requestSuccess(ADD_USER)]: (state, { payload }) => ({
	// 	...state,
	// }),

	// [requestPending(ADD_USER)]: (state, { payload }) => ({
	// 	...state,
	// }),

	// [requestFail(ADD_USER)]: (state, { payload }) => ({
	// 	...state,
	// }),

	// [requestSuccess(EDIT_USER)]: (state, { payload }) => ({
	// 	...state,
	// }),

	// [requestPending(EDIT_USER)]: (state, { payload }) => ({
	// 	...state,
	// }),

	// [requestFail(EDIT_USER)]: (state, { payload }) => ({
	// 	...state,
	// }),

	// [requestSuccess(REMOVE_USER)]: (state, { payload }) => ({
	// 	...state,
	// }),

	// [requestPending(REMOVE_USER)]: (state, { payload }) => ({
	// 	...state,
	// }),

	// [requestFail(REMOVE_USER)]: (state, { payload }) => ({
	// 	...state,
	// }),
});
