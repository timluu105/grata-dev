import React from "react";

const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));
const Users = React.lazy(() => import("../views/users/Users"));
const AddUser = React.lazy(() => import("../views/users/AddUser"));
const Properties = React.lazy(() => import("../views/properties/Properties"));
const Services = React.lazy(() => import("../views/services/Services"));
const Reports = React.lazy(() => import("../views/reports/Reports"));

const routes = [
	{ path: "/Dashboard", name: "Dashboard", component: Dashboard },
	{ path: "/Users", name: "Users", component: Users },
	{ path: "/AddUser", name: "AddUser", component: AddUser },
	{ path: "/Properties", name: "Properties", component: Properties },
	{ path: "/Services", name: "Services", component: Services },
	{ path: "/Reports", name: "Reports", component: Reports },
];

export default routes;
