import React from "react";
import { CToast, CToastBody, CToastHeader, CToaster } from "@coreui/react";

const Toaster = ({ message }) => {
	return (
		<CToaster position="bottom-right">
			<CToast show={true} autohide={3000} fade={true}>
				<CToastHeader closeButton={true}>Notification</CToastHeader>
				<CToastBody>{message}</CToastBody>
			</CToast>
		</CToaster>
	);
};

export default Toaster;
