import { call, put } from "redux-saga/effects";
import { get } from "lodash-es";
import axios from "axios";
import { requestFail, requestPending, requestSuccess } from "./status";
import { store } from "../index";

export default ({ type, method, path, success, isFormData, isBlob }) =>
	function* (action) {
		const { body, params, success: successPayload, fail: failPayload } =
			action.payload || {};

		const { idToken } = store.getState().auth;

		let header = {};

		if (!isFormData) {
			header = {
				"Content-Type": "application/json",
			};
		}

		if (idToken) {
			header["Authorization"] = `Bearer ${idToken}`;
		}

		try {
			yield put({
				type: requestPending(type),
			});

			let options = {
				url: `${typeof path === "function" ? path(action.payload) : path}`,
				method: method,
				headers: header,
				data: body,
				params,
			};

			if (isBlob) {
				options.responseType = "blob";
			}

			const res = yield call(axios.request, options);

			yield put({
				type: requestSuccess(type),
				payload: res.data,
			});

			successPayload && successPayload(res);
			success && success(res, action);
		} catch (err) {
			const errRes = get(err, "response", err);

			yield put({
				type: requestFail(type),
				payload: errRes,
			});
			failPayload && failPayload(err);
		}
	};
