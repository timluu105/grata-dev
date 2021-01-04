import { handleActions } from "redux-actions";
import { GET_USERS, ADD_USER, EDIT_USER, REMOVE_USER } from "../constants";

const initialState = {
	users: [],
};

const reducer = handleActions(
	{
		[GET_USERS]: (state, action) => ({
			...state,
		}),
		[ADD_USER]: (state, action) => ({
			...state,
		}),
		[EDIT_USER]: (state, action) => ({
			...state,
		}),
		[REMOVE_USER]: (state, action) => ({
			...state,
		}),
	},
	initialState
);

export default reducer;
