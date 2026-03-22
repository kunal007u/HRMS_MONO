import { FormHelperText } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FaDownload, FaEdit, FaEye } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import noImage from '../../../../Assets/Images/noImage.jpeg';
import personalDetailService from "../../../../Services/personal-detail-service";
import FormikFileUpload from "../../../../Shared/formik-fields/FormikFileUpload";
import { downloadFile } from "../../../../utils/commanFunctions";
import { useSelector } from 'react-redux';
import { IApplicationState } from '../../../../Store/state/app-state';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const labels = [
    { id: 'tenMarksheet', text: '10th Marksheet' },
    { id: 'twelveMarksheet', text: '12th Marksheet' },
    { id: 'degreeMarksheet', text: 'Degree Certificate' },
    { id: 'adharCard', text: 'Adhar card' },
    { id: 'panCard', text: 'Pan Card' },
    { id: 'salarySlip1', text: 'Salary Slips1' },
    { id: 'salarySlip2', text: 'Salary Slips2' },
    { id: 'salarySlip3', text: 'Salary Slips3' },
    { id: 'probationComplitionLetter', text: 'Relieving latter' },
    { id: 'appointmentLetter', text: 'Appointment Letter' },
    { id: "passbook", text: "Passbook" }
];

const EmployeeDocumentForm = ({ documents, setOpenDialog }) => {
    const userData = useSelector((state: IApplicationState) => state.UserData);
    const queryClient = useQueryClient();
    const { id } = useParams();
    const [preview, setPreview] = useState(documents || {});

    const initialValues = {
        tenMarksheet: '',
        twelveMarksheet: '',
        degreeMarksheet: '',
        adharCard: '',
        panCard: '',
        salarySlip1: '',
        salarySlip2: '',
        salarySlip3: '',
        probationComplitionLetter: '',
        appointmentLetter: '',
        passbook: ''
    };

    const uploadFileDetailsMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await personalDetailService.uploadDocuments(formData, id ?? '');
            if (response.status) {
                toast.success(response?.data?.status?.message);
                setOpenDialog && setOpenDialog(false);
                queryClient.invalidateQueries({ queryKey: ['employeeDetail'] });
            }
            else {
                setPreview({});
            }
            return response.data;
        },
        onError: (error) => {
            console.log(error.message);
        },
    });

    const handleUploadDetails = async (key, file) => {
        if (file) {
            const formData = new FormData();
            formData.append(key, file);
            uploadFileDetailsMutation.mutate(formData);
        }
    };

    const renderPreview = (file) => {
        const isPDF = file.type === 'application/pdf' || (typeof file === 'string' && file.endsWith('.pdf'));
        if (isPDF) {
            return (
                <Document file={file} className="react-pdf-document">
                    <Page pageNumber={1} className="react-pdf-page" />
                </Document>
            );
        } else {
            return <img src={typeof file === 'string' ? file : URL.createObjectURL(file)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />;
        }
    };

    return (
        <div className="upload-detail-form white-box">
            <div className="upload-detail-container">
                <div className="upload-content">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => handleUploadDetails('', values)}
                    >
                        {({ setFieldValue, errors, touched, setFieldTouched }) => {
                            const handleFilePreview = (name, file) => {
                                if (file) {
                                    setPreview(prev => ({ ...prev, [name]: file }));
                                    setFieldValue(name, file);
                                }
                            };
                            return (
                                <Form className='upload-box'>
                                    <div className="upload-box-container mb-2">
                                        {labels.map((label, index) => {
                                            return (
                                                <div className='d-flex direction-column gap-1 item-center' key={index}>
                                                    <label className={label.id ? "custom-file-upload cursor-pointer" : "custom-file-upload"} htmlFor={label.id}>
                                                        {preview[label.id] || (documents && documents[label.id]) ? (
                                                            <>
                                                                {renderPreview(preview[label.id] || documents[label.id])}
                                                                <div className="overlay">
                                                                    <div className="upload-content-icons">
                                                                        <Link to={documents && documents[label.id] ? String(documents[label.id]) : '#'} target="_blank" rel="noopener noreferrer">
                                                                            <FaEye />
                                                                        </Link>
                                                                        <a onClick={() => downloadFile(documents && documents[label.id])}>
                                                                            <FaDownload />
                                                                        </a>
                                                                        {userData?.role !== 'EMPLOYEE' && (<label htmlFor={label.id} className="editIcon">
                                                                            <FaEdit />
                                                                        </label>)}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="icon">
                                                                <img src={noImage} alt="" />
                                                            </div>
                                                        )}

                                                        {(userData?.role !== 'EMPLOYEE' || !(documents && documents[label.id])) && (
                                                            <>
                                                                <Field
                                                                    type="file"
                                                                    id={label.id}
                                                                    name={label.id}
                                                                    component={FormikFileUpload}
                                                                    style={{ display: 'none' }}
                                                                    onChange={(e) => {
                                                                        handleFilePreview(label.id, e.target.files[0]);
                                                                        handleUploadDetails(label.id, e.target.files[0]);
                                                                        setFieldTouched(label.id, true, true);
                                                                    }}
                                                                    accept="application/pdf,image/*"
                                                                />
                                                            </>
                                                        )}
                                                    </label>
                                                    <div className="upload-detail-title d-flex direction-column item-center">
                                                        <span>{label.text}</span>
                                                        {touched[label.id] && errors[label.id] && <FormHelperText error>{errors[label.id]}</FormHelperText>}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDocumentForm;