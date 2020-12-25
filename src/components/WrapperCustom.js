import React from "react";
import Toaster from "./Toaster";

const WrapperCustom = (props) => {
	return (
		<React.Fragment>
			<Toaster />
			{props.children}
		</React.Fragment>
	);
};

export default WrapperCustom;
