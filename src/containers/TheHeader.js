import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	CHeader,
	CToggler,
	CHeaderBrand,
	CHeaderNav,
	CHeaderNavItem,
	CHeaderNavLink,
	CSubheader,
	CBreadcrumbRouter,
	CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

// routes config
import routes from "../routes/index";

import {
	TheHeaderDropdown,
	TheHeaderDropdownMssg,
	TheHeaderDropdownNotif,
	TheHeaderDropdownTasks,
} from "./index";

const TheHeader = () => {
	const dispatch = useDispatch();
	const { asideShow } = useSelector((state) => state.window);
	const { darkMode } = useSelector((state) => state.window);
	const { sidebarShow } = useSelector((state) => state.window);

	const toggleSidebar = () => {
		const val = [true, "responsive"].includes(sidebarShow)
			? false
			: "responsive";
		dispatch({ type: "SET_SIDEBAR", sidebarShow: val });
	};

	const toggleSidebarMobile = () => {
		const val = [false, "responsive"].includes(sidebarShow)
			? true
			: "responsive";
		dispatch({ type: "SET_SIDEBAR", sidebarShow: val });
	};

	return (
		<CHeader withSubheader>
			<CToggler
				inHeader
				className="ml-md-3 d-lg-none"
				onClick={toggleSidebarMobile}
			/>
			<CToggler
				inHeader
				className="ml-3 d-md-down-none"
				onClick={toggleSidebar}
			/>
			<CHeaderBrand className="mx-auto d-lg-none" to="/">
				<CIcon content={freeSet.logo} height="48" alt="Logo" />
			</CHeaderBrand>

			<CHeaderNav className="d-md-down-none mr-auto">
				<CHeaderNavItem className="px-3">
					<CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
				</CHeaderNavItem>
				<CHeaderNavItem className="px-3">
					<CHeaderNavLink to="/users">Users</CHeaderNavLink>
				</CHeaderNavItem>
				<CHeaderNavItem className="px-3">
					<CHeaderNavLink>Settings</CHeaderNavLink>
				</CHeaderNavItem>
			</CHeaderNav>

			<CHeaderNav className="px-3">
				<CToggler
					inHeader
					className="ml-3 d-md-down-none"
					onClick={() => dispatch({ type: "SET_MODE", darkMode: !darkMode })}
					title="Toggle Light/Dark Mode"
				>
					<CIcon
						content={freeSet.cilMoon}
						className="c-d-dark-none"
						alt="CoreUI Icons Moon"
					/>
					<CIcon
						content={freeSet.cilSun}
						name="cil-sun"
						className="c-d-default-none"
						alt="CoreUI Icons Sun"
					/>
				</CToggler>
				<TheHeaderDropdownNotif />
				<TheHeaderDropdownTasks />
				<TheHeaderDropdownMssg />
				<TheHeaderDropdown />
				<CToggler
					inHeader
					className="d-md-down-none"
					onClick={() => dispatch({ type: "SET_ASIDE", asideShow: !asideShow })}
				>
					<CIcon
						className="mr-2"
						content={freeSet.cilApplicationsSettings}
						size="lg"
					/>
				</CToggler>
			</CHeaderNav>

			<CSubheader className="px-3 justify-content-between">
				<CBreadcrumbRouter
					className="border-0 c-subheader-nav m-0 px-0 px-md-3"
					routes={routes}
				/>
				<div className="d-md-down-none mfe-2 c-subheader-nav">
					<CLink className="c-subheader-nav-link" href="#">
						<CIcon content={freeSet.cilSpeech} alt="Settings" />
					</CLink>
					<CLink
						className="c-subheader-nav-link"
						aria-current="page"
						to="/dashboard"
					>
						<CIcon content={freeSet.cilGraph} alt="Dashboard" />
						&nbsp;Dashboard
					</CLink>
					<CLink className="c-subheader-nav-link" href="#">
						<CIcon content={freeSet.cilSettings} alt="Settings" />
						&nbsp;Settings
					</CLink>
				</div>
			</CSubheader>
		</CHeader>
	);
};

export default React.memo(TheHeader);
