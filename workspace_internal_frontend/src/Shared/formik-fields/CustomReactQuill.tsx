import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../../Page/HR/Resignation/resignation.css"
import { FormHelperText } from '@mui/material';
import _ from 'lodash';

const CustomReactQuill = ({ field: { ...fields }, form: { touched, errors }, ...props }): React.ReactNode => {
    const { value, onChange, hasObject = false, className, ...rest } = props;
    const error = Boolean(_.get(touched, fields.name) && _.get(errors, fields.name));
    const getError = () => {
        let errorString = errors;
        fields?.name?.split('.').map((name) => (errorString = errorString[name]));
        return errorString;
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image',
    ];

    return (
        <div>
            <ReactQuill
                {...rest}
                theme="snow"
                value={value || ''}
                onChange={(content) => {
                    onChange(content);
                    // helpers.setValue(content);
                }}
                className={className}
                // onBlur={() => helpers.setTouched(true)}
                modules={modules}
                formats={formats}
            />
            {error && <FormHelperText className='formik-input-error' error>{error && (hasObject ? getError() : errors[fields?.name])}</FormHelperText>}
        </div>
    );
};

export default CustomReactQuill;