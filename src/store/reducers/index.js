import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
	key: "auth",
	storage: storage,
	blacklist: ["loading", "status", "error"],
};

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		auth: persistReducer(),
	});

export default createRootReducer;
