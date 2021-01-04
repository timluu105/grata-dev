import { createAction } from "redux-actions";
import { GET_USERS, ADD_USER, EDIT_USER, REMOVE_USER } from "../constants";

export const getUsers = createAction(GET_USERS);
export const addUser = createAction(ADD_USER);
export const editUser = createAction(EDIT_USER);
export const removeUser = createAction(REMOVE_USER);

export default {
	getUsers,
	addUser,
	editUser,
	removeUser,
};
