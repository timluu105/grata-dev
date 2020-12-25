import { createAction } from "redux-actions";
import { SET_SIDEBAR, SET_TOAST, SET_ASIDE, SET_MODE } from "../constants";

export const setToast = createAction(SET_TOAST);
export const setSideBar = createAction(SET_SIDEBAR);
export const setASide = createAction(SET_ASIDE);
export const setMode = createAction(SET_MODE);

export default {
	setToast,
	setSideBar,
	setASide,
	setMode,
};
