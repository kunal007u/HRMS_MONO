import React from 'react';
import _ from 'lodash';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from '@mui/material';

interface ISelectOption {
    title: string;
    value: any;
    disabled: boolean;
}

const FormikSelect = ({ field: { ...fields }, form: { touched, errors }, placeholder, ...props }): React.ReactNode => {
    const { defaultOption, sx, fullWidth = true, hasObject = false, className, ...rest } = props;
    const error = Boolean(_.get(touched, fields.name) && _.get(errors, fields.name));
    const getError = () => {
        let errorString = errors;
        fields?.name?.split('.').map((name) => (errorString = errorString[name]));
        return errorString;
    };

    return (
        <FormControl fullWidth={fullWidth} className={`${className}`}>
            <Select
                labelId="demo-simple-select-helper-label"
                {...fields}
                {...rest}
                
                error={error}
                MenuProps={{
                    PaperProps: {
                        className: 'select-wrapper',
                    },
                }}
                sx={sx}
                renderValue={(selected) => {
                    if (selected === "") {
                        return <p style={{ color: "#a2a2a2" }}>{placeholder}</p>
                    }
                    const selectedOption = props?.options?.find((option) => {
                        return option.value === selected
                    });
                    return selectedOption ? selectedOption.title : "";
                }}
                displayEmpty
            >
                {/* <MenuItem value="" disabled>
                    <p style={{ color: "#a2a2a2" }}>{placeholder}</p>
                </MenuItem> */}
                {defaultOption && <MenuItem value={typeof fields.value === 'string' ? '' : 0}> -- Select -- </MenuItem>}
                {props.options &&
                    props.options.map((option: ISelectOption) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            disabled={option?.disabled ? option?.disabled : false}
                        >
                            {option.title}
                        </MenuItem>
                    ))}
            </Select>
            {error && <FormHelperText className='formik-input-error' error>{error && (hasObject ? getError() : errors[fields?.name])}</FormHelperText>}
        </FormControl>
    );
};

export default FormikSelect;