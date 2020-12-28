import React from "react";
import { useSelector } from "react-redux";
import Toaster from "./Toaster";

const WrapperCustom = (props) => {
	const { toastShow } = useSelector((state) => state.window);

	return (
		<React.Fragment>
			{toastShow && <Toaster />}
			{props.children}
		</React.Fragment>
	);
};

export default WrapperCustom;
