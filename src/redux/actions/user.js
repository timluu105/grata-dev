import { createAction } from "@reduxjs/toolkit";
import {
	ADD_AVATAR,
	GET_AVATAR,
	GET_USERS,
	GET_USER,
	ADD_USER,
	EDIT_USER,
	REMOVE_USER,
} from "../constants";

export const addAvatar = createAction(ADD_AVATAR);
export const getAvatar = createAction(GET_AVATAR);

export const getUsers = createAction(GET_USERS);
export const getUser = createAction(GET_USER);
export const addUser = createAction(ADD_USER);
export const editUser = createAction(EDIT_USER);
export const removeUser = createAction(REMOVE_USER);

export default {
	addAvatar,
	getAvatar,
	getUsers,
	getUser,
	addUser,
	editUser,
	removeUser,
};
