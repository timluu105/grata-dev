import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CCardBody, CButton } from "@coreui/react";
import EditUser from "./EditUser";
import UsersTable from "./UsersTable";

const Users = () => {
	const [handleEditModal, setHandleEditModal] = useState(false);
	const history = useHistory();

	const handleAddUser = () => {
		history.push("/adduser");
	};

	return (
		<CCardBody>
			<CButton onClick={handleAddUser} color="primary" className="mb-2">
				+ Add User
			</CButton>
			<UsersTable setHandleEditModal={setHandleEditModal} />
			<EditUser
				handleEditModal={handleEditModal}
				setHandleEditModal={setHandleEditModal}
			/>
		</CCardBody>
	);
};

export default Users;
