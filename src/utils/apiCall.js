import { useSelector } from "react-redux";
import { call, put } from "redux-saga/effects";
import { get } from "lodash-es";
import axios from "axios";
import { requestFail, requestPending, requestSuccess } from "./status";

export default ({ type, method, path, success }) =>
	function* (action) {
		const { body, params, success: successPayload, fail: failPayload } =
			action.payload || {};

		const { idToken } = useSelector((state) => state.auth);
		let header = {
			"Content-Type": "application/json",
		};

		if (idToken) {
			header["Authorization"] = `Bearer ${idToken}`;
		}

		try {
			yield put({
				type: requestPending(type),
			});

			const options = {
				url: `${typeof path === "function" ? path(action.payload) : path}`,
				method: method,
				headers: header,
				data: body,
				params,
			};
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
