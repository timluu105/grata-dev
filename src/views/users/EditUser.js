import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../redux/actions/user";
import { Formik } from "formik";
import {
	CForm,
	CFormGroup,
	CCol,
	CInputGroup,
	CSelect,
	CInvalidFeedback,
	CLabel,
	CInput,
	CButton,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CModalTitle,
	CImg,
} from "@coreui/react";
import * as Yup from "yup";

const EditUser = (props) => {
	const { handleEditModal, setHandleEditModal } = props;
	const { user, avatar } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	// useEffect(() => {
	// 	console.log(avatar);

	// 	if (avatar) {
	//     try {
	//       const canvas = avatar.getImage();

	//       fetch(canvas.toDataURL('image/png'))
	//         .then(res => res.blob())
	//         .then(blob => {
	//           data.append('file', blob);
	//           uploadProfileAvatarRequest(data);
	//         });
	//     } catch (e) {
	//       console.log(e);
	//     }
	//   }
	// }, [avatar]);

	const validationSchema = function (values) {
		return Yup.object().shape({
			first_name: Yup.string().required("First Name is required"),
			last_name: Yup.string().required("Last Name is required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
			cell_phone: Yup.string()
				.matches(phoneRegExp, "Mobile Phone number is not valid")
				.required("Mobile Phone Number is required"),
			home_phone: Yup.string()
				.matches(phoneRegExp, "Home Phone number is not valid")
				.required("Home Phone Number is required"),
			building_id: Yup.number().min(1).required("Building ID is required"),
			role_id: Yup.string().length(1, "Role ID is required"),
			type_id: Yup.string().length(1, "Type ID is required"),
		});
	};

	const validate = (getValidationSchema) => {
		return (values) => {
			const validationSchema = getValidationSchema(values);

			try {
				validationSchema.validateSync(values, { abortEarly: false });
				return {};
			} catch (error) {
				return getErrorsFromValidationError(error);
			}
		};
	};

	const getErrorsFromValidationError = (validationError) => {
		const FIRST_ERROR = 0;
		return validationError.inner.reduce((errors, error) => {
			return {
				...errors,
				[error.path]: error.errors[FIRST_ERROR],
			};
		}, {});
	};

	const onSubmit = (values) => {
		const role_id = parseInt(values.role_id, 10);
		const type_id = parseInt(values.type_id, 10);

		console.log("user ====> ", user);

		const userData = {
			avatar: user.avatar,
			...values,
			role_id,
			type_id,
		};

		dispatch(
			editUser({
				id: user.id,
				body: userData,
				success: () => {
					setHandleEditModal(false);
				},
			})
		);
	};

	// const onDrop = (picture) => {
	// 	if (picture && picture.length > 0) {
	// 		const data = new FormData();
	// 		data.append("image", picture[0], picture[0].name);
	// 		dispatch(updateAvatar({ body: data }));
	// 	}
	// };

	return (
		<Formik
			enableReinitialize={true}
			initialValues={user}
			validate={validate(validationSchema)}
			onSubmit={onSubmit}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<CForm onSubmit={handleSubmit} noValidate name="EditUserForm">
					<CModal
						show={handleEditModal}
						onClose={() => setHandleEditModal(!handleEditModal)}
						color="primary"
					>
						<CModalHeader closeButton>
							<CModalTitle>Edit User</CModalTitle>
						</CModalHeader>
						<CModalBody>
							<CFormGroup>
								<CImg src={`data:image/jpg;base64,${avatar}`} />
							</CFormGroup>
							<CFormGroup row>
								<CCol>
									<CLabel htmlFor="nf-first-name">First Name</CLabel>
									<CInputGroup className="mb-3">
										<CInput
											type="text"
											id="first_name"
											name="first_name"
											placeholder="First Name..."
											autoComplete="text"
											valid={!errors.first_name}
											invalid={touched.first_name && !!errors.first_name}
											required
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.first_name}
										/>
										<CInvalidFeedback>{errors.first_name}</CInvalidFeedback>
									</CInputGroup>
								</CCol>
								<CCol>
									<CLabel htmlFor="nf-last-name">Last Name</CLabel>
									<CInputGroup className="mb-3">
										<CInput
											type="text"
											id="last_name"
											name="last_name"
											placeholder="Last Name..."
											autoComplete="text"
											valid={!errors.last_name}
											invalid={touched.last_name && !!errors.last_name}
											required
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.last_name}
										/>
										<CInvalidFeedback>{errors.last_name}</CInvalidFeedback>
									</CInputGroup>
								</CCol>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="nf-email">Email</CLabel>
								<CInputGroup className="mb-3">
									<CInput
										type="email"
										id="email"
										name="email"
										placeholder="Email..."
										autoComplete="text"
										valid={!errors.email}
										invalid={touched.email && !!errors.email}
										required
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									<CInvalidFeedback>{errors.email}</CInvalidFeedback>
								</CInputGroup>
							</CFormGroup>
							<CFormGroup row>
								<CCol>
									<CLabel htmlFor="nf-mobile-number">Mobile Number</CLabel>
									<CInputGroup className="mb-3">
										<CInput
											type="text"
											id="cell_phone"
											name="cell_phone"
											placeholder="Mobile Number..."
											autoComplete="text"
											valid={!errors.cell_phone}
											invalid={touched.cell_phone && !!errors.cell_phone}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.cell_phone}
										/>
										<CInvalidFeedback>{errors.cell_phone}</CInvalidFeedback>
									</CInputGroup>
								</CCol>
								<CCol>
									<CLabel htmlFor="nf-home-number">Home Number</CLabel>
									<CInputGroup className="mb-3">
										<CInput
											type="text"
											id="home_phone"
											name="home_phone"
											placeholder="Home Number..."
											autoComplete="text"
											valid={!errors.home_phone}
											invalid={touched.home_phone && !!errors.home_phone}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.home_phone}
										/>
										<CInvalidFeedback>{errors.home_phone}</CInvalidFeedback>
									</CInputGroup>
								</CCol>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="nf-building-id">Building ID</CLabel>
								<CInputGroup className="mb-3">
									<CInput
										type="number"
										id="building_id"
										name="building_id"
										placeholder="Building ID..."
										autoComplete="text"
										valid={!errors.building_id}
										invalid={touched.building_id && !!errors.building_id}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.building_id}
									/>
									<CInvalidFeedback>{errors.building_id}</CInvalidFeedback>
								</CInputGroup>
							</CFormGroup>
							<CFormGroup row>
								<CCol className="mb-3">
									<CLabel htmlFor="role_id">Roles</CLabel>
									<CSelect
										onBlur={handleBlur}
										onChange={handleChange}
										custom
										name="role_id"
										id="role_id"
										valid={!errors.role_id}
										invalid={touched.role_id && !!errors.role_id}
										value={user.role_id}
									>
										<option value={null}>Please Select</option>
										<option value={1}>User</option>
										<option value={2}>Admin</option>
										<option value={3}>Super Admin</option>
									</CSelect>
									<CInvalidFeedback>{errors.role_id}</CInvalidFeedback>
								</CCol>
								<CCol className="mb-3">
									<CLabel htmlFor="type_id">Type</CLabel>
									<CSelect
										onChange={handleChange}
										onBlur={handleBlur}
										custom
										valid={!errors.type_id}
										invalid={touched.type_id && !!errors.type_id}
										name="type_id"
										id="type_id"
										value={user.type_id}
									>
										<option value={null}>Please Select</option>
										<option value={1}>Resident</option>
										<option value={2}>Co-Resident</option>
										<option value={3}>Building Manager</option>
										<option value={4}>Admin</option>
									</CSelect>
									<CInvalidFeedback>{errors.type_id}</CInvalidFeedback>
								</CCol>
							</CFormGroup>
						</CModalBody>
						<CModalFooter>
							<CButton color="primary" type="submit">
								Save
							</CButton>{" "}
							<CButton
								color="secondary"
								onClick={() => setHandleEditModal(!handleEditModal)}
							>
								Cancel
							</CButton>
						</CModalFooter>
					</CModal>
				</CForm>
			)}
		</Formik>
	);
};

export default EditUser;
