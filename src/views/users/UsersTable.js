import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/user";
import { CCardBody, CButton, CDataTable, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

const UsersTable = (props) => {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const fields = [
		{ key: "first_name", _style: { width: "10%" } },
		{ key: "last_name", _style: { width: "10%" } },
		{ key: "email", _style: { width: "10%" } },
		{ key: "role", _style: { width: "10%" } },
		{ key: "mobile_phone", _style: { width: "10%" } },
		{ key: "home_phone", _style: { width: "10%" } },
		{ key: "type_id", _style: { width: "10%" } },
		{ key: "create_date", _style: { width: "10%" } },
		{ key: "building_id", _style: { width: "10%" } },
		{ key: "edit", _style: { width: "10%" } },
	];

	const handleEdit = () => {};

	const handleRemove = () => {};
	return (
		<CCardBody>
			<CDataTable
				items={users}
				fields={fields}
				columnFilter
				tableFilter
				cleaner
				itemsPerPageSelect
				itemsPerPage={20}
				hover
				sorter
				pagination
				// loading
				// onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
				// onPageChange={(val) => console.log('new page:', val)}
				// onPagesChange={(val) => console.log('new pages:', val)}
				// onPaginationChange={(val) => console.log('new pagination:', val)}
				// onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
				// onSorterValueChange={(val) => console.log('new sorter value:', val)}
				// onTableFilterChange={(val) => console.log('new table filter:', val)}
				// onColumnFilterChange={(val) => console.log('new column filter:', val)}
				scopedSlots={{
					edit: (item) => {
						return (
							<td>
								<CRow className="">
									<CCol col="6" className="text-right">
										<CButton onClick={handleEdit} size="sm" color="info">
											<CIcon content={freeSet.cilPencil} />
										</CButton>
									</CCol>
									<CCol col="6" className="text-left">
										<CButton onClick={handleRemove} size="sm" color="danger">
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
	);
};

export default UsersTable;
