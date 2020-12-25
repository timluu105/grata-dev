import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Toaster } from "../../../components";
import { getAuth } from "../../../firebase";
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

const Login = () => {
	const [toast, setToast] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const firebaseAuth = getAuth();
	const history = useHistory();
	const dispatch = useDispatch();

	const validationSchema = function (values) {
		return Yup.object().shape({
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is required!"),
			password: Yup.string()
				.min(6, `Password has to be at least ${6} characters!`)
				.matches(
					/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
					"Password must contain: numbers, uppercase and lowercase letters\n"
				)
				.required("Password is required"),
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
		email: "",
		password: "",
	};

	const onSubmit = (values) => {
		firebaseAuth
			.signInWithEmailAndPassword(values.email, values.password)
			.then(() => {
				setToast(true);
				dispatch(setIsLoggedIn(true));
				setMessage("User Logged In!");

				history.push("/dashboard");
			})
			.catch((error) => {
				setToast(true);
				setMessage(error.message);
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
												<h1>Login</h1>
												<p className="text-muted">Sign In to your account</p>
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

			{toast && <Toaster message={message} />}
		</div>
	);
};

export default Login;
