import { all, takeEvery } from "redux-saga/effects";
import { LOGIN } from "../constants";

import { loginSaga } from "./auth";

export default function* rootSaga() {
	yield all([takeEvery(LOGIN, loginSaga)]);
}
