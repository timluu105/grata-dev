import React from "react";

const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
	{ path: "/Dashboard", name: "Dashboard", component: Dashboard },
];

export default routes;
