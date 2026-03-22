import { FormHelperText } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FieldProps as FormikFieldProps } from 'formik';
import moment, { Moment } from 'moment';
import { ReactNode } from 'react';
import { DateTimeToDate_String } from '../../utils/dateFormat';

interface FieldProps extends FormikFieldProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const FormikDatePicker: React.FC<FieldProps> = ({ field, form, ...props }) => {
    
    const { errors, touched } = form;
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                {...field}
                {...props}
                format='DD/MM/YYYY'
                value={field.value ? moment(field.value) : null}
                onChange={(date: Moment | null) => {
                    const formattedDate = date ? DateTimeToDate_String(date.toISOString()) : '';
                    form.setFieldValue(field.name, formattedDate);
                    if (props.onChange) {
                        props.onChange({
                            target: {
                                name: field.name,
                                value: formattedDate,
                            },
                        } as React.ChangeEvent<HTMLInputElement>);
                    }
                }}
                disableOpenPicker={false}
            />
            {errors[field.name] && touched[field.name] && <FormHelperText error className='formik-input-error'>{errors[field.name] as ReactNode}</FormHelperText>}
        </LocalizationProvider>
    );
};

export default FormikDatePicker;