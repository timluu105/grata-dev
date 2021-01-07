import { createReducer } from "@reduxjs/toolkit";
import {
	GET_USERS,
	ADD_USER,
	EDIT_USER,
	GET_USER,
	ADD_AVATAR,
	GET_AVATAR,
} from "../constants";
import {
	requestSuccess,
	requestFail,
	requestPending,
} from "../../utils/status";

const initialState = {
	users: [],
	user: {},
	avatar: "",
	loading: true,
	status: "INIT",
	params: {
		page: 1,
	},
	error: null,
};

export default createReducer(initialState, {
	[GET_USER]: (state, { payload }) => ({
		...state,
		user: payload,
	}),

	[requestSuccess(ADD_AVATAR)]: (state, { payload }) => ({
		...state,
		imgUrl: payload.filename,
		status: requestSuccess(ADD_AVATAR),
		error: null,
	}),

	[requestFail(ADD_AVATAR)]: (state, { payload }) => ({
		...state,
		status: requestFail(ADD_AVATAR),
		error: payload.error,
	}),

	[requestSuccess(GET_AVATAR)]: (state, { payload }) => ({
		...state,
		avatar: payload,
		status: requestSuccess(GET_AVATAR),
		error: null,
	}),

	[requestPending(GET_AVATAR)]: (state, { payload }) => ({
		...state,
		status: requestPending(GET_AVATAR),
	}),

	[requestSuccess(GET_USERS)]: (state, { payload }) => ({
		...state,
		users: payload.sort((a, b) => a.id - b.id),
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

	[requestSuccess(ADD_USER)]: (state, { payload }) => ({
		...state,
		status: requestSuccess(ADD_USER),
		error: payload.error,
	}),

	[requestPending(ADD_USER)]: (state, { payload }) => ({
		...state,
	}),

	[requestFail(ADD_USER)]: (state, { payload }) => ({
		...state,
		status: requestSuccess(ADD_USER),
		error: payload.error,
	}),

	[requestSuccess(EDIT_USER)]: (state, { payload }) => ({
		...state,
	}),

	[requestPending(EDIT_USER)]: (state, { payload }) => ({
		...state,
	}),

	[requestFail(EDIT_USER)]: (state, { payload }) => ({
		...state,
	}),

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
