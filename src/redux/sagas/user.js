import { takeLatest } from "redux-saga/effects";
import { GET_USERS, ADD_USER, EDIT_USER, REMOVE_USER } from "../constants";
import apiCall from "../../utils/apiCall";

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

export default function* rootSaga() {
	yield takeLatest(GET_USERS, getUsers);
	yield takeLatest(ADD_USER, addUser);
	yield takeLatest(REMOVE_USER, removeUser);
	yield takeLatest(EDIT_USER, editUser);
}
