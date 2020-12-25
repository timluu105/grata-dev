import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "./firebase";

import "./scss/style.scss";

const Login = React.lazy(() => import("./views/pages/login/Login"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

const firebaseAuth = getAuth();

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
);

const App = () => {
	const [initialized, setInitialized] = React.useState(false);
	const { isLoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	React.useEffect(() => {
		firebaseAuth.onAuthStateChanged(async (user) => {
			if (user) {
				const fbIdToken = await user.getIdToken();

				dispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn: true });
				dispatch({ type: "SET_ID_TOKEN", idToken: fbIdToken });
			}

			if (!initialized) {
				setInitialized(true);
			}
		});
		// eslint-disable-next-line
	}, [dispatch]);

	if (!initialized) return <>Loading...</>;

	return (
		<HashRouter>
			<React.Suspense fallback={loading}>
				<Switch>
					<Route
						exact
						path="/404"
						name="Page 404"
						render={(props) => <Page404 {...props} />}
					/>

					<Route
						exact
						path="/login"
						name="Login"
						render={(props) => <Login {...props} />}
					/>

					{initialized && (
						<Switch>
							<Route
								path="/dashboard"
								name="Dashboard"
								render={(props) => <TheLayout {...props} />}
							/>

							<Route
								exact
								path="/"
								render={() => {
									if (isLoggedIn) return <Redirect to="/dashboard" />;
									return <Redirect to="/login" />;
								}}
							/>

							<Redirect to="/404" />
						</Switch>
					)}
				</Switch>
			</React.Suspense>
		</HashRouter>
	);
};

export default App;
