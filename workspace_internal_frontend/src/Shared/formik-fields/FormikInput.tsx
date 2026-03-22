import React from 'react';
import _ from 'lodash';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

const FormikInput = ({ field: { ...fields }, form: { touched, errors,setFieldValue }, ...props }): React.ReactNode => {
    const {
        id,
        maxLength,
        isDefaultValue,
        multiline,
        className,
        allowZero = false,
        hasObject = false,
        controlClassName,
        min = 0,
        max,
        ...rest
    } = props;
    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));
    const getError = () => {
        let errorString = errors;
        fields?.name?.split('.')?.map((name) => (errorString = errorString[name]));
        return errorString;
    };

    const handleKeyDown = (e) => {
        if (props.type === 'number' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            e.preventDefault();
        }
    };

    const handleWheel = (e) => {
        if (props.type === 'number') {
            e.target.blur();
        }
    };

    const handleBlur = (e) => {
        if (props.type === 'number') {
            const value = e.target.value;
            if (value === '' || Number(value) < min) {
                setFieldValue(fields.name, min.toString());
            }
        }
        fields.onBlur(e);
    };


    return (
        <FormControl fullWidth className={controlClassName}>
            {props?.label && <InputLabel>{props?.label}</InputLabel>}
            {isDefaultValue ? (
                <OutlinedInput
                    {...fields}
                    {...rest}
                    id={id}
                    className={className}
                    multiline={multiline}
                    error={error}
                    autoComplete="off"
                    inputProps={{
                        maxLength: maxLength ? maxLength : 100,
                        shrink: fields?.value?.toString(),
                    }}
                />
            ) : (
                <OutlinedInput
                    {...fields}
                    {...rest}
                    id={id}
                    className={className}
                    value={
                        props.type === 'number' && !allowZero
                            ? fields?.value || ''
                            : fields?.value?.toString()?.trimStart()
                    }
                    multiline={multiline}
                    error={error}
                    autoComplete="off"
                    inputProps={{
                        maxLength: maxLength ? maxLength : 100,
                        shrink: fields?.value?.toString(),
                    }}
                    onKeyDown={handleKeyDown}
                    onWheel={handleWheel}
                    onBlur={handleBlur}
                />
            )}
            {error && <FormHelperText error className='formik-input-error'>{error && (hasObject ? getError() : errors[fields?.name])}</FormHelperText>}{' '}
        </FormControl>
    );
};

export default FormikInput;
