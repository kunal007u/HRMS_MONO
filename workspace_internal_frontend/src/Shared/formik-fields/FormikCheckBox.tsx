import React from 'react';
import _ from 'lodash';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';

const FormikCheckBox = ({ field: { ...fields }, form: { touched, errors }, ...props }): React.ReactNode => {
    const { label, checkedIcon, icon, showError = true, controlClassName, className, ...rest } = props;
    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));

    return (
        <FormControl error={error} disabled={props?.disabled} className={controlClassName}>
            <FormGroup>
                <FormControlLabel
                    label={label}
                    className={className}
                    control={
                        <Checkbox {...fields} {...rest} checkedIcon={checkedIcon} icon={icon} checked={fields?.value} />
                    }
                />
            </FormGroup>
            {error && showError && <FormHelperText className='formik-input-error' error>{error && errors[fields?.name]}</FormHelperText>}
        </FormControl>
    );
};

export default FormikCheckBox;
