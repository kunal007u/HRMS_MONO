import { useDropzone } from 'react-dropzone';
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { HiOutlineDownload } from 'react-icons/hi'
import { Document, Page, pdfjs } from "react-pdf";
import "./custom.css"
import { FormHelperText } from '@mui/material';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CustomDropzoneInput = ({ field, form: { touched, errors }, ...props }) => {
    const { onChange, preview, disabled, label } = props
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => onChange(acceptedFiles[0])
    });

    const error = Boolean(touched[field.name] && errors[field.name]);

    return (
        <>
            {label && <label className='ml-2' htmlFor='label' style={{ fontWeight: "500" }}>str{label}</label>}
            <div className={`${error && "error-red-border"}  CustomDropzoneInput`}>
                {!preview ? (
                    <div {...getRootProps()}>
                        <label className="CustomDropzoneInput-label">
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span className="mt-2 text-base">Select a file</span>
                        </label>
                    </div>
                ) : (
                    <div className={`border rounded-lg ${preview?.type === 'application/pdf' || preview?.toString().includes('pdf') ? 'form-upload-pdf' : 'form-upload-img'} `}>
                        {preview && (preview.type === 'application/pdf' || preview.toString()?.includes('pdf')) ? (
                            <>
                                <Document file={preview}  >
                                    <Page pageNumber={1} />
                                </Document>

                                <div className='form-upload-pdf-icon'>
                                    <div className='d-flex gap-1'>
                                        {!disabled && <div  {...getRootProps()} className='CustomDropzoneInput-edit-icon'>
                                            <MdOutlineModeEditOutline className='text-xl' />
                                        </div>}
                                        <div className='CustomDropzoneInput-download-icon'>
                                            <a target='_blank' href={preview instanceof Blob ? URL.createObjectURL(preview) : preview} download rel="noreferrer">
                                                <HiOutlineDownload className='text-xl' />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            preview?.type === 'image/jpg' || preview?.type === 'image/jpeg' || preview?.type === 'image/png' ? (
                                <>
                                    <img src={URL.createObjectURL(preview)} alt="Preview" />
                                    <div className='form-upload-pdf-icon'>
                                        <div className='flex gap-5'>
                                            {!disabled && <div  {...getRootProps()} className='CustomDropzoneInput-edit-icon'>
                                                <MdOutlineModeEditOutline className='text-xl' />
                                            </div>}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    < img src={preview} {...getRootProps()} alt="Preview" />
                                    <div className="form-upload-pdf-icon">
                                        <div className='flex gap-5'>
                                            {!disabled && <div  {...getRootProps()} className='CustomDropzoneInput-edit-icon'>
                                                <MdOutlineModeEditOutline className='text-xl' />
                                            </div>}
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                )}
                <input id={label} {...getInputProps()} style={{ display: 'none' }} />
                {error && <FormHelperText error className="text-sm text-danger " style={{ marginLeft: "13px" }}>{errors[field?.name]}</FormHelperText>}
            </div>
        </>
    );
};

export default CustomDropzoneInput;