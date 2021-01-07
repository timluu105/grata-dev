import React from "react";
import { useHistory } from "react-router-dom";
import { addUser, addAvatar } from "../../redux/actions/user";
import { setToast } from "../../redux/actions/window";
import ImageUploader from "react-images-upload";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import {
	CForm,
	CFormGroup,
	CCardGroup,
	CContainer,
	CRow,
	CCol,
	CInputGroup,
	CSelect,
	CInvalidFeedback,
	CLabel,
	CInput,
	CButton,
	CCardBody,
	CCard,
} from "@coreui/react";
import * as Yup from "yup";

const AddUser = () => {
	const { imgUrl } = useSelector((state) => state.user);
	const history = useHistory();
	const dispatch = useDispatch();

	const validationSchema = function (values) {
		return Yup.object().shape({
			first_name: Yup.string().required("First Name is required"),
			last_name: Yup.string().required("Last Name is required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
			cell_phone: Yup.string().required("Mobile Phone Number is required"),
			home_phone: Yup.string().required("Home Phone Number is required"),
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

	const initialValues = {
		first_name: "",
		last_name: "",
		email: "",
		cell_phone: "",
		home_phone: "",
		role_id: "null",
		type_id: "null",
		building_id: 0,
	};

	const onSubmit = (values) => {
		const role_id = parseInt(values.role_id, 10);
		const type_id = parseInt(values.type_id, 10);

		const userData = {
			...values,
			avatar: imgUrl,
			role_id,
			type_id,
		};

		dispatch(
			addUser({
				body: userData,
				success: () => {
					history.push("/users");
					dispatch(
						setToast({
							toastShow: true,
							toastMessage: "You successfully created new user!",
						})
					);
				},
			})
		);
	};

	const onDrop = (picture) => {
		if (picture && picture.length > 0) {
			const data = new FormData();
			data.append("image", picture[0], picture[0].name);
			dispatch(addAvatar({ body: data }));
		}
	};

	return (
		<CContainer className="mb-4">
			<CRow>
				<CCol className="offset-3 col-6">
					<CCardGroup>
						<CCard>
							<CCardBody>
								<Formik
									initialValues={initialValues}
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
										<CForm
											onSubmit={handleSubmit}
											noValidate
											name="AddUserForm"
										>
											<CFormGroup>
												<ImageUploader
													buttonText="Choose images"
													id="avatar"
													name="avatar"
													onChange={onDrop}
													withPreview
													imgExtension={[".jpg", ".gif", ".png", ".gif"]}
													maxFileSize={5242880}
													singleImage={true}
												/>
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
															invalid={
																touched.first_name && !!errors.first_name
															}
															required
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.first_name}
														/>
														<CInvalidFeedback>
															{errors.first_name}
														</CInvalidFeedback>
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
														<CInvalidFeedback>
															{errors.last_name}
														</CInvalidFeedback>
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
													<CLabel htmlFor="nf-mobile-number">
														Mobile Number
													</CLabel>
													<CInputGroup className="mb-3">
														<CInput
															type="text"
															id="cell_phone"
															name="cell_phone"
															placeholder="Mobile Number..."
															autoComplete="text"
															valid={!errors.cell_phone}
															invalid={
																touched.cell_phone && !!errors.cell_phone
															}
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.cell_phone}
														/>
														<CInvalidFeedback>
															{errors.cell_phone}
														</CInvalidFeedback>
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
															invalid={
																touched.home_phone && !!errors.home_phone
															}
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.home_phone}
														/>
														<CInvalidFeedback>
															{errors.home_phone}
														</CInvalidFeedback>
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
														invalid={
															touched.building_id && !!errors.building_id
														}
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.building_id}
													/>
													<CInvalidFeedback>
														{errors.building_id}
													</CInvalidFeedback>
												</CInputGroup>
											</CFormGroup>
											<CFormGroup row>
												<CCol className="mb-3">
													<CLabel htmlFor="role_id">Roles</CLabel>
													<CSelect
														onBlur={handleBlur}
														onChange={handleChange}
														custom
														valid={!errors.role_id}
														invalid={touched.role_id && !!errors.role_id}
														name="role_id"
														id="role_id"
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
											<CFormGroup className="text-right">
												<CButton color="primary" type="submit">
													Save
												</CButton>{" "}
												<CButton
													color="secondary"
													onClick={() => {
														history.push("/users");
													}}
												>
													Cancel
												</CButton>
											</CFormGroup>
										</CForm>
									)}
								</Formik>
							</CCardBody>
						</CCard>
					</CCardGroup>
				</CCol>
			</CRow>
		</CContainer>
	);
};

export default AddUser;
