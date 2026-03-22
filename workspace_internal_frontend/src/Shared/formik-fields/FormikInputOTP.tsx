import React from 'react';
import _ from 'lodash';
import { FormControl } from '@mui/material';
import OtpInput from 'react-otp-input';
import './custom.css'

const FormikInputOTP = ({ field: { ...fields }, form: { touched, errors }, ...props }): React.ReactNode => {
    const { numInputs, inputType = true, className, onChange, value } = props;
    const error = Boolean(_.get(touched, fields.name) && _.get(errors, fields.name));

    return (
        <FormControl error={error} fullWidth className={`reset-css ${className}`}>
            <OtpInput
                numInputs={numInputs}
                inputType={inputType}
                onChange={onChange}
                value={value}
                shouldAutoFocus={true}
                renderSeparator={<span> &nbsp; &nbsp; &nbsp; &nbsp;</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={'otp-field'}
                containerStyle={`otp-container`}
            />
        </FormControl>
    );
};

export default FormikInputOTP;
