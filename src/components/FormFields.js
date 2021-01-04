import React from "react";
import {
	CFormGroup,
	CLabel,
	CInputGroup,
	CInput,
	CInvalidFeedback,
} from "@coreui/react";

const FormFields = (props) => {
	// const { errors, handleChange };
	return (
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
	);
};

export default FormFields;
