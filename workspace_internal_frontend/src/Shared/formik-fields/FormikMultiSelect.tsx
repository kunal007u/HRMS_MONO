/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import _ from 'lodash';
import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { IoIosDoneAll } from 'react-icons/io';

const FormikMultiSelect = ({ field: { ...fields }, form: { touched, errors }, ...props }): React.ReactNode => {
    const { id, defaultOption, sx, fullWidth = true, hasObject = false, className, ...rest } = props;
    const error = Boolean(_.get(touched, fields.name) && _.get(errors, fields.name));
    const getError = () => {
        let errorString = errors;
        fields?.name?.split('.').map((name) => (errorString = errorString[name]));
        return errorString;
    };

    return (
        <FormControl fullWidth={fullWidth} className={`${className}`}>
            <InputLabel title={props.label}>{props.label}</InputLabel>
            <Select
                {...fields}
                {...rest}
                error={error}
                multiple
                MenuProps={{
                    PaperProps: {
                        className: 'select-wrapper',
                    },
                }}
                sx={sx}
                id={id}
                name={props?.name}
                value={props?.value}
                onChange={props?.onChange}
                renderValue={(selected: number[]) => {
                    const { options } = props;
                    const value = options
                        .map((item) => {
                            if (selected.includes(item?.value)) {
                                return item?.title;
                            }
                        })
                        .filter(Boolean);
                    return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.length > 2 ? (
                                <>
                                    {value.map(
                                        (item, index) =>
                                            index <= 0 && <Chip key={item} color="primary" size="small" label={item} />,
                                    )}
                                    <Chip
                                        key={selected.length}
                                        color="primary"
                                        size="small"
                                        label={`+${selected.length - 2}...`}
                                    />
                                </>
                            ) : (
                                <>
                                    {value.map((item) => (
                                        <Chip key={item} size="small" color="primary" label={item} />
                                    ))}
                                </>
                            )}
                        </Box>
                    );
                }}
            >
                {props?.options &&
                    props?.options.map((option) => (
                        <MenuItem key={option.value} value={option.value} disabled={option?.disabled}>
                            <div
                                key={option.value}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                {option.title}
                                {props?.value?.includes(option.value) && <IoIosDoneAll />}
                            </div>
                        </MenuItem>
                    ))}
            </Select>
            {error && <FormHelperText error className='formik-input-error'>{error && (hasObject ? getError() : errors[fields?.name])}</FormHelperText>}
        </FormControl>
    );
};

export default FormikMultiSelect;
