import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { getAuth } from "./firebase";
import {
	TheSidebar,
	TheAside,
	TheFooter,
	TheHeader,
	TheContent,
} from "./containers/index";
import LoadingFallback from "./components/LoadingFallback";
import { setIdToken, setIsLoggedIn } from "./redux/actions/auth";

import "./scss/style.scss";

const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

const firebaseAuth = getAuth();

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
);

const App = () => {
	const [initialized, setInitialized] = useState(false);
	const { isLoggedIn } = useSelector((state) => state.auth);
	const { darkMode } = useSelector((state) => state.window);
	const dispatch = useDispatch();
	const classes = classNames(
		"c-app c-default-layout",
		darkMode && "c-dark-theme"
	);

	useEffect(() => {
		firebaseAuth.onAuthStateChanged(async (user) => {
			if (user) {
				const fbIdToken = await user.getIdToken();

				dispatch(
					setIdToken({
						idToken: fbIdToken,
					})
				);
				dispatch(
					setIsLoggedIn({
						isLoggedIn: true,
					})
				);
			}

			if (!initialized) {
				setInitialized(true);
			}
		});
		// eslint-disable-next-line
	}, [dispatch]);

	if (!initialized) {
		return <LoadingFallback />;
	}

	return (
		<HashRouter>
			<React.Suspense fallback={loading}>
				{initialized && (
					<Switch>
						{!isLoggedIn && (
							<Switch>
								<Route exact path="/" render={() => <Redirect to="/login" />} />
								<Route
									exact
									path="/login"
									name="Login"
									render={(props) => <Login {...props} />}
								/>
							</Switch>
						)}

						{isLoggedIn && (
							<div className={classes}>
								<Route
									exact
									path="/"
									redner={() => <Redirect to="/dashboard" />}
								/>
								<TheSidebar />
								<TheAside />
								<div className="c-wrapper">
									<TheHeader />
									<div className="c-body">
										<TheContent />
									</div>
									<TheFooter />
								</div>
							</div>
						)}
					</Switch>
				)}
			</React.Suspense>
		</HashRouter>
	);
};

export default App;
