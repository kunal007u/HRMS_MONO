import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import { PoliciesModel } from '../../../Models/employee/employeeM'
import policiesService from '../../../Services/policies-service'
import CustomDropzoneInput from '../../../Shared/formik-fields/CustomDropzoneInput'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import { addPoliciesSchema } from '../../../Validations/policies'

const AddPoliciesForm = ({ policyRef, setOpenDialog }) => {
    const queryClient = useQueryClient();
    const [preview, setPreview] = React.useState(policyRef?.policyFile || '');

    const addResignationMutation = useMutation({
        mutationFn: (formData: FormData) => policiesService.createPolicy(formData),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllPolicies'] });
                setOpenDialog(false);
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const updateResignationMutation = useMutation({
        mutationFn: (formData: FormData) => policiesService.updatePolicy(formData, policyRef?.id),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllPolicies'] });
                setOpenDialog(false);
                policyRef.current = null;
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const handleSubmit = async (values: PoliciesModel) => {
        const formData = new FormData();
        const { policyFile, ...otherValues } = values;

        Object.keys(otherValues).forEach(key => {
            formData.append(key, otherValues[key]);
        });

        if (policyFile instanceof File) {
            formData.append('policyFile', policyFile);
        }

        if (policyRef?.id) {
            updateResignationMutation.mutate(formData);
        } else {
            addResignationMutation.mutate(formData);
        }
    };
    return (

        <section style={{ padding: "20px" }}>

            <Formik
                initialValues={{
                    name: policyRef?.name || '',
                    description: policyRef?.description || '',
                    policyFile: policyRef?.policyFile || '',
                }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={addPoliciesSchema}
            >
                {({ handleSubmit, values, setFieldValue, errors }) => {
                    return (
                        <Form onSubmit={handleSubmit} >
                            <div className="form policy-form" >
                                <div className="profile-image content-box">
                                    <Field
                                        label="policyFile"
                                        name="policyFile"
                                        onChange={(file) => {
                                            setPreview(file);
                                            setFieldValue('policyFile', file)
                                        }}
                                        value={values?.policyFile}
                                        preview={preview}
                                        component={CustomDropzoneInput}
                                    />
                                </div>

                                <div className="add-form-group" style={{ width: "99%" }}>
                                    <label htmlFor="name" className='form-label'>Policy Name</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={values?.name}
                                        className="form-control"
                                        component={FormikInput}
                                        onChange={(e) => {
                                            setFieldValue("name", e.target.value);
                                        }}
                                    />

                                </div>
                                <div className="add-form-group" style={{ width: "99%" }}>
                                    <label htmlFor="description" className='form-label'>Policy Description</label>
                                    <Field
                                        className="form-control"
                                        id="description"
                                        rows={4}
                                        name="description"
                                        value={values?.description}
                                        multiline
                                        maxLength={5000}
                                        component={FormikInput}
                                        onChange={(e) => {
                                            setFieldValue("description", e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="submit-btn">
                                <Button className="btn" type="submit">
                                    <span>Submit</span>
                                </Button>
                            </div>

                        </Form>
                    )
                }}
            </Formik>
        </section>

    )
}

export default AddPoliciesForm