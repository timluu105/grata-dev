import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToast } from "../redux/actions/window";
import { CToast, CToastBody, CToastHeader, CToaster } from "@coreui/react";

const Toaster = () => {
	const { toastMessage, toastShow } = useSelector((state) => state.window);
	const dispatch = useDispatch();

	React.useEffect(() => {
		setTimeout(() => {
			dispatch(setToast({ toastShow: false }));
		}, 3000);
	}, [dispatch, toastShow]);

	return (
		<CToaster position="bottom-right">
			<CToast show={true} autohide={3000} fade={true}>
				<CToastHeader closeButton={true}>Notification</CToastHeader>
				<CToastBody>{toastMessage}</CToastBody>
			</CToast>
		</CToaster>
	);
};

export default Toaster;
