import { handleActions } from "redux-actions";
import { SET_MODE, SET_SIDEBAR, SET_ASIDE, SET_TOAST } from "../constants";

const initialState = {
	sidebarShow: "responsive",
	asideShow: false,
	darkMode: false,
	toastMessage: "",
	toastShow: false,
	toastTimeout: 3000,
};

const reducer = handleActions(
	{
		[SET_MODE]: (state, action) => ({
			...state,
			darkMode: action.darkMode,
		}),

		[SET_SIDEBAR]: (state, action) => ({
			...state,
			sidebarShow: action.sidebarShow,
		}),

		[SET_ASIDE]: (state, action) => ({
			...state,
			asideShow: action.asideShow,
		}),

		[SET_TOAST]: (state, action) => ({
			...state,
			toastShow: action.toastMessage,
		}),
	},
	initialState
);

export default reducer;
