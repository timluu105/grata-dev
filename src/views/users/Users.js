import React, { useState } from "react";
import { CCardBody, CButton } from "@coreui/react";
import Modal from "../../components/Modal";
import AddUser from "./AddUser";
import UsersTable from "./UsersTable";

const Users = () => {
	const [show, setShow] = useState(false);
	const handleAddUser = () => {
		setShow(true);
	};

	return (
		<CCardBody>
			<Modal show={show} setShow={setShow}>
				<AddUser />
			</Modal>
			<CButton onClick={handleAddUser} color="primary" className="mb-2">
				+ Add User
			</CButton>
			<UsersTable />
		</CCardBody>
	);
};

export default Users;
