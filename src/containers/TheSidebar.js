import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSideBar } from "../redux/actions/window";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { ReactComponent as Name } from "../assets/icons/name.svg";
import {
	CCreateElement,
	CSidebar,
	CSidebarBrand,
	CSidebarNav,
	CSidebarNavDivider,
	CSidebarNavTitle,
	CSidebarMinimizer,
	CSidebarNavDropdown,
	CSidebarNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
	const dispatch = useDispatch();
	const show = useSelector((state) => state.window.sidebarShow);

	return (
		<CSidebar
			show={show}
			unfoldable
			onShowChange={() => dispatch(setSideBar({ sidebarShow: !show }))}
		>
			<CSidebarBrand
				className="d-md-down-none"
				style={{ "justify-content": "left" }}
				to="/"
			>
				<Logo width={55} height={55} />
				<Name width={100} height={55} />

				<CIcon
					className="c-sidebar-brand-minimized"
					name="sygnet"
					height={35}
				/>
			</CSidebarBrand>
			<CSidebarNav>
				<CCreateElement
					items={navigation}
					components={{
						CSidebarNavDivider,
						CSidebarNavDropdown,
						CSidebarNavItem,
						CSidebarNavTitle,
					}}
				/>
			</CSidebarNav>
			<CSidebarMinimizer className="c-d-md-down-none" />
		</CSidebar>
	);
};

export default React.memo(TheSidebar);
