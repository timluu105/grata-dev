import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUsers, getAvatar } from "../../redux/actions/user";
import {
	CCardBody,
	CButton,
	CDataTable,
	CRow,
	CCol,
	CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

const UsersTable = (props) => {
	const { setHandleEditModal } = props;
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const fields = [
		{ key: "index", _style: { width: "4%" } },
		{ key: "first_name", _style: { width: "8%" } },
		{ key: "last_name", _style: { width: "8%" } },
		{ key: "email", _style: { width: "10%" } },
		{ key: "role_id", _style: { width: "10%" } },
		{ key: "cell_phone", _style: { width: "10%" } },
		{ key: "home_phone", _style: { width: "10%" } },
		{ key: "type_id", _style: { width: "10%" } },
		{ key: "level", _style: { width: "5%" } },
		{ key: "building_id", _style: { width: "5%" } },
		{ key: "create_date", _style: { width: "10%" } },
		{ key: "edit", _style: { width: "10%" } },
	];

	const handleEdit = (index) => {
		dispatch(getUser(users[index]));
		dispatch(getAvatar({ id: users[index].avatar }));
		setHandleEditModal(true);
	};

	const handleRemove = () => {};

	return (
		<>
			<CCardBody>
				<CDataTable
					items={users}
					fields={fields}
					columnFilter
					tableFilter
					cleaner
					itemsPerPageSelect
					itemsPerPage={5}
					hover
					sorter
					pagination
					// loading
					// onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
					// onPageChange={(val) => console.log('new page:', val)}
					// onPagesChange={(val) => console.log('new pages:', val)}
					// onPaginationChange={(val) => console.log('new pagination:', val)}
					// onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
					// onSorterValueChange={(val) => console.log("new sorter value:", val)}
					// onTableFilterChange={(val) => console.log('new table filter:', val)}
					// onColumnFilterChange={(val) => console.log('new column filter:', val)}
					scopedSlots={{
						index: (item, index) => {
							return <td>{index + 1}</td>;
						},
						role_id: (item) => {
							if (item.role_id === 1) {
								return <td>User</td>;
							} else if (item.role_id === 2) {
								return <td>Admin</td>;
							} else {
								return <td>Super Admin</td>;
							}
						},
						type_id: (item) => {
							if (item.type_id === 1) {
								return <td>Resident</td>;
							} else if (item.type_id === 2) {
								return <td>Co-Resident</td>;
							} else if (item.type_id === 3) {
								return <td>Building Manager</td>;
							} else {
								return <td>Admin</td>;
							}
						},
						avatar: (item) => {
							return (
								<td>
									<CImg
										src={item.avatar}
										aria-label="Avatar"
										width={40}
										height={40}
									/>
								</td>
							);
						},
						edit: (item, index) => {
							return (
								<td>
									<CRow className="">
										<CCol col="6" className="text-right">
											<CButton
												onClick={() => handleEdit(index)}
												size="sm"
												color="info"
											>
												<CIcon content={freeSet.cilPencil} />
											</CButton>
										</CCol>
										<CCol col="6" className="text-left">
											<CButton
												onClick={() => handleRemove(index)}
												size="sm"
												color="danger"
											>
												<CIcon content={freeSet.cilTrash} />
											</CButton>
										</CCol>
									</CRow>
								</td>
							);
						},
					}}
				/>
			</CCardBody>
		</>
	);
};

export default UsersTable;
