import { createReducer } from "@reduxjs/toolkit";
import { SET_MODE, SET_SIDEBAR, SET_ASIDE, SET_TOAST } from "../constants";

const initialState = {
	sidebarShow: "responsive",
	asideShow: false,
	darkMode: false,
	toastMessage: "",
	toastShow: false,
	toastTimeout: 3000,
};

export default createReducer(initialState, {
	[SET_MODE]: (state, { payload }) => ({
		...state,
		darkMode: payload.darkMode,
	}),

	[SET_SIDEBAR]: (state, { payload }) => ({
		...state,
		sidebarShow: payload.sidebarShow,
	}),

	[SET_ASIDE]: (state, { payload }) => ({
		...state,
		asideShow: payload.asideShow,
	}),

	[SET_TOAST]: (state, { payload }) => ({
		...state,
		toastShow: payload.toastShow,
		toastMessage: payload.toastMessage,
	}),
});
