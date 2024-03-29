import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { getAuth } from "../../../firebase";
import { ReactComponent as Logo } from "../../../assets/icons/logo.svg";
import {
	CContainer,
	CButton,
	CCard,
	CCardGroup,
	CCardBody,
	CCol,
	CForm,
	CFormGroup,
	CInputGroup,
	CInputGroupText,
	CInputGroupPrepend,
	CInvalidFeedback,
	CLabel,
	CInput,
	CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import * as Yup from "yup";
import { setIsLoggedIn } from "../../../redux/actions/auth";
import { setToast } from "../../../redux/actions/window";

const Login = () => {
	const firebaseAuth = getAuth();
	const history = useHistory();
	const dispatch = useDispatch();

	const validationSchema = function (values) {
		return Yup.object().shape({
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is required!"),
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
		email: localStorage.getItem("user") ? localStorage.getItem("user") : "",
		password: "",
	};

	const onSubmit = (values) => {
		firebaseAuth
			.signInWithEmailAndPassword(values.email, values.password)
			.then(() => {
				localStorage.setItem("user", values.email);

				dispatch(
					setToast({
						toastShow: true,
						toastMessage: "User Logged In!",
					})
				);

				dispatch(
					setIsLoggedIn({
						isLoggedIn: true,
					})
				);

				history.push("/dashboard");
			})
			.catch((error) => {
				dispatch(
					setToast({
						toastShow: true,
						toastMessage: error.message,
					})
				);
			});
	};

	return (
		<div className="c-app c-default-layout flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md="6">
						<CCardGroup>
							<CCard className="p-4">
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
												name="LoginForm"
											>
												<div className="d-flex">
													<Logo width={70} height={70} />
													<div className="d-absolute">
														<p className="pl-1 h1">Login</p>
														<p className="pl-1 text-muted">
															Sign In to your account
														</p>
													</div>
												</div>

												<CFormGroup>
													<CLabel htmlFor="nf-email">Email</CLabel>
													<CInputGroup className="mb-3">
														<CInputGroupPrepend>
															<CInputGroupText>
																<CIcon content={freeSet.cilUser} />
															</CInputGroupText>
														</CInputGroupPrepend>
														<CInput
															type="email"
															id="email"
															name="email"
															placeholder="Enter Email.."
															autoComplete="email"
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
													<CLabel htmlFor="nf-password">Password</CLabel>
													<CInputGroup className="mb-3">
														<CInputGroupPrepend>
															<CInputGroupText>
																<CIcon content={freeSet.cilLockLocked} />
															</CInputGroupText>
														</CInputGroupPrepend>
														<CInput
															type="password"
															id="password"
															name="password"
															placeholder="Enter Password.."
															autoComplete="current-password"
															valid={!errors.password}
															invalid={touched.password && !!errors.password}
															required
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.password}
														/>
														<CInvalidFeedback>
															{errors.password}
														</CInvalidFeedback>
													</CInputGroup>
												</CFormGroup>
												<CRow>
													<CCol xs="6">
														<CButton
															type="submit"
															color="primary"
															className="px-4"
														>
															Login
														</CButton>
													</CCol>
													<CCol xs="6" className="text-right">
														<CButton color="link" className="px-0">
															Forgot password?
														</CButton>
													</CCol>
												</CRow>
											</CForm>
										)}
									</Formik>
								</CCardBody>
							</CCard>
						</CCardGroup>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	);
};

export default Login;
