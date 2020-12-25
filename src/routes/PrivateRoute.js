import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuth } from "../firebase";

const firebaseAuth = getAuth();

const PrivateRoute = (props) => {
	const { component: Component, ...rest } = props;
	const user = firebaseAuth.currentUser;

	return (
		<Route
			{...rest}
			render={() => {
				if (user) return <Component {...props} />;
				return <Redirect to="/404" />;
			}}
		/>
	);
};

export default PrivateRoute;
