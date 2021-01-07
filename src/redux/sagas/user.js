import { takeLatest } from "redux-saga/effects";
import {
	GET_USERS,
	ADD_USER,
	EDIT_USER,
	REMOVE_USER,
	ADD_AVATAR,
	GET_AVATAR,
} from "../constants";
import apiCall from "../../utils/apiCall";

const addAvatar = apiCall({
	type: ADD_AVATAR,
	method: "post",
	path: "/images",
	isFormData: true,
});

const getAvatar = apiCall({
	type: GET_AVATAR,
	method: "get",
	path: ({ id }) => `/images/${id}`,
	isFormData: true,
});

const getUsers = apiCall({
	type: GET_USERS,
	method: "get",
	path: "/users",
});

const addUser = apiCall({
	type: ADD_USER,
	method: "post",
	path: "/users",
});

const editUser = apiCall({
	type: EDIT_USER,
	method: "put",
	path: ({ id }) => `/users/${id}/`,
});

const removeUser = apiCall({
	type: REMOVE_USER,
	method: "delete",
	path: ({ id }) => `/users/${id}/`,
});

export default function* userSaga() {
	yield takeLatest(GET_USERS, getUsers);
	yield takeLatest(ADD_USER, addUser);
	yield takeLatest(REMOVE_USER, removeUser);
	yield takeLatest(EDIT_USER, editUser);
	yield takeLatest(ADD_AVATAR, addAvatar);
	yield takeLatest(GET_AVATAR, getAvatar);
}
