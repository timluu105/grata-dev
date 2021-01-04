import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "../../firebase";
import { Formik } from "formik";
import {
	CForm,
	CFormGroup,
	CInputGroup,
	CInputGroupText,
	CInputGroupPrepend,
	CInvalidFeedback,
	CLabel,
	CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const AddUser = () => {
	const firebaseAuth = getAuth();
	const history = useHistory();
	const dispatch = useDispatch();
	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const initialValues = {
		avatar: "",
		first_name: "",
		last_name: "",
		email: "",
		level: 0,
		points: 0,
		mobile_phone: "",
		home_phone: "",
		role: "",
		type_id: "",
		building_id: "",
	};

	const validationSchema = function (values) {
		return Yup.object().shape({
			avatar: Yup.string().required("Avatar is required"),
			first_name: Yup.string().required("First Name is required"),
			last_name: Yup.string().required("Last Name is required"),
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
			level: Yup.number().min(0),
			points: Yup.number().min(0),
			mobile_phone: Yup.string()
				.matches(phoneRegExp, "Mobile Phone number is not valid")
				.required("Mobile Phone Number is required"),
			home_phone: Yup.string()
				.matches(phoneRegExp, "Home Phone number is not valid")
				.required("Home Phone Number is required"),
			role: Yup.string().required("Role is required"),
			type_id: Yup.string().required("Type Id is required"),
			building_id: Yup.string().required("Building Id is required"),
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
		console.log("values ===> ", values);
	};

	return (
		<>
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
					<CForm onSubmit={handleSubmit} noValidate name="AddUserForm">
						<CFormGroup>
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
						</CFormGroup>
						<CFormGroup>
							<CLabel htmlFor="nf-first-name">Last Name</CLabel>
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
						</CFormGroup>
						<CFormGroup>
							<CLabel htmlFor="nf-first-name">Email</CLabel>
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
						<CFormGroup>
							<CLabel htmlFor="nf-first-name">Level</CLabel>
							<CInputGroup className="mb-3">
								<CInput
									type="number"
									id="level"
									name="level"
									placeholder="Level..."
									autoComplete="text"
									valid={!errors.level}
									invalid={touched.level && !!errors.level}
									required
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.level}
								/>
								<CInvalidFeedback>{errors.level}</CInvalidFeedback>
							</CInputGroup>
						</CFormGroup>
					</CForm>
				)}
			</Formik>
		</>
	);
};

export default AddUser;
