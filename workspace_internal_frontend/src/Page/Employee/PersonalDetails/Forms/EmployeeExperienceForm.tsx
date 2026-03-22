import { Button, FormHelperText, IconButton } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { Field, FieldArray, Form, Formik } from 'formik'
import moment from 'moment'
import { FaTrash } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import personalDetailService from '../../../../Services/personal-detail-service'
import FormikDatePicker from '../../../../Shared/formik-fields/FormikDatePicker'
import FormikInput from '../../../../Shared/formik-fields/FormikInput'
import FormikCheckBox from '../../../../Shared/formik-fields/FormikCheckBox'

const EmployeeExperienceForm = ({ employeeDetail, setOpenDialog }) => {
    const queryClient = useQueryClient()
    const { id } = useParams()

    const initialState = {
        experienceDetails: [
            {
                companyName: '',
                designation: '',
                periodFrom: '',
                periodTo: '',
                isPresent: false,
                location: '',
            }
        ]
    }

    const getData = () => employeeDetail?.experienceDetails?.length > 0 && employeeDetail || initialState

    const handleSubmit = async (values) => {
        const newValue = values?.experienceDetails?.map((exp) => {return {...exp, periodTo: exp?.isPresent ? "" : exp?.periodTo}})
        await personalDetailService
            .uploadExperience(newValue, id ?? '')
            .then((response) => {
                if (response?.data?.status?.code) {
                    queryClient.invalidateQueries({ queryKey: ['employeeDetail'] })
                    setOpenDialog && setOpenDialog(false); // Add null check
                    toast.success(response?.data?.status?.message)
                }
            }
            ).catch((err) => {
                console.log(err);
            })
    }

    return (
        <section className="experience-form">
            <Formik
                initialValues={getData()}
                onSubmit={(values) => handleSubmit(values)}
                validateOnBlur={true}
                validateOnChange={false}
                validationSchema={
                    Yup.object().shape({
                        experienceDetails: Yup.array().of(
                            Yup.object().shape({
                                companyName: Yup.string().required('Company Name is required').trim(),
                                designation: Yup.string().required('Designation is required').trim(),
                                periodFrom: Yup.string().required('Period From is required'),
                                // periodTo: Yup.string().required('Period To is required').test('is-greater', 'End date must be later than start date', function (value) {
                                //     const periodFrom = this.parent.periodFrom;
                                //     return new Date(periodFrom) <= new Date(value);
                                // }),
                                location: Yup.string().required('Location is required').trim(),
                            })
                        )
                    })
                }
            >
                {({ handleSubmit, values, setFieldValue, errors, touched }) => {
                    return (
                        <Form onSubmit={handleSubmit} className='modal-form' >
                            <div className="form">
                                <FieldArray
                                    name="experienceDetails"
                                    render={(arrayHelpers) => (
                                        <>
                                            {
                                                values?.experienceDetails.map((experience, index) => {
                                                    return (
                                                        <>
                                                            <div key={index} className=" mb-2 ">
                                                                <div className="white-box">
                                                                    <div className='experience-info' style={{ justifyContent: "flex-end", display: "flex" }}>
                                                                        {
                                                                            index > 0 && values?.experienceDetails?.length > 1 &&
                                                                            <IconButton
                                                                                onClick={async () => {
                                                                                    if (values?.experienceDetails[index]?.experienceId) {
                                                                                        await personalDetailService
                                                                                            .deleteExperience(values?.experienceDetails[index]?.experienceId, id)
                                                                                            .then((response) => {
                                                                                                if (response?.data?.status?.code) {
                                                                                                    queryClient.invalidateQueries({ queryKey: ['employeeDetail'] })
                                                                                                    toast.success(response?.data?.status?.message)
                                                                                                }
                                                                                            }
                                                                                            ).catch((err) => {
                                                                                                console.log(err);
                                                                                            })
                                                                                    }
                                                                                    arrayHelpers.remove(index)
                                                                                }}
                                                                            >
                                                                                <FaTrash style={{ color: "#b63535", fontSize: "18px" }} />
                                                                            </IconButton>
                                                                        }
                                                                    </div>
                                                                    <div className="personal-detail-form-content ">
                                                                        <div className="company-name content-box">
                                                                            <label htmlFor={`experienceDetails.${index}.companyName`} className="form-label">Company Name</label>
                                                                            <Field
                                                                                name={`experienceDetails.${index}.companyName`}
                                                                                type="text"
                                                                                component={FormikInput}
                                                                                value={values?.experienceDetails[index]?.companyName}
                                                                                className="form-control"
                                                                                maxLength={50}
                                                                                onChange={(e) => setFieldValue(`experienceDetails.${index}.companyName`, e.target.value)}
                                                                            />
                                                                            {errors?.experienceDetails && errors.experienceDetails[index] && errors.experienceDetails[index].companyName && touched.experienceDetails[index].companyName && (
                                                                                <FormHelperText className='formik-input-error' style={{ color: "red" }}>{errors.experienceDetails[index].companyName}</FormHelperText>
                                                                            )}
                                                                        </div>

                                                                        <div className="designation content-box">
                                                                            <label htmlFor={`experienceDetails.${index}.designation`} className="form-label">Designation</label>
                                                                            <Field
                                                                                name={`experienceDetails.${index}.designation`}
                                                                                type="text"
                                                                                component={FormikInput}
                                                                                value={values?.experienceDetails[index]?.designation}
                                                                                className="form-control"
                                                                                maxLength={50}
                                                                                onChange={(e) => setFieldValue(`experienceDetails.${index}.designation`, e.target.value)}
                                                                            />
                                                                            {errors?.experienceDetails && errors.experienceDetails[index] && errors.experienceDetails[index].designation && touched.experienceDetails[index].designation && (
                                                                                <FormHelperText className='formik-input-error' style={{ color: "red" }}>{errors.experienceDetails[index].designation}</FormHelperText>
                                                                            )}
                                                                        </div>
                                                                        <div className="company-name content-box" style={{ flexBasis: '35%' }}>
                                                                            <label htmlFor={`experienceDetails.${index}.periodFrom`} className="form-label">Period From</label>
                                                                            <Field
                                                                                name={`experienceDetails.${index}.periodFrom`}
                                                                                type="date"
                                                                                component={FormikDatePicker}
                                                                                value={values?.experienceDetails[index]?.periodFrom}
                                                                                className="form-control"
                                                                                onChange={(e) => setFieldValue(`experienceDetails.${index}.periodFrom`, e.target.value)}
                                                                            />
                                                                            {
                                                                                errors?.experienceDetails && errors.experienceDetails[index] && errors.experienceDetails[index].periodFrom && touched.experienceDetails[index].periodFrom && (
                                                                                    <FormHelperText className='formik-input-error' style={{ color: "red" }}>{errors.experienceDetails[index].periodFrom}</FormHelperText>
                                                                                )
                                                                            }
                                                                        </div>

                                                                        {!experience?.isPresent && <div className="company-name content-box" style={{ flexBasis: '35%' }}>
                                                                            <label htmlFor={`experienceDetails.${index}.periodTo`} className="form-label">Period To</label>
                                                                            <Field
                                                                                name={`experienceDetails.${index}.periodTo`}
                                                                                type="date"
                                                                                component={FormikDatePicker}
                                                                                value={values?.experienceDetails[index]?.periodTo}
                                                                                className="form-control"
                                                                                onChange={(e) => setFieldValue(`experienceDetails.${index}.periodTo`, e.target.value)}
                                                                                minDate={moment(values?.experienceDetails[index]?.periodFrom)}
                                                                                maxDate={moment()}
                                                                            />
                                                                            {
                                                                                errors?.experienceDetails && errors.experienceDetails[index] && errors.experienceDetails[index].periodTo && touched.experienceDetails[index].periodTo && (
                                                                                    <FormHelperText className='formik-input-error' style={{ color: "red" }}>{errors.experienceDetails[index].periodTo}</FormHelperText>
                                                                                )
                                                                            }
                                                                        </div>}
                                                                        <div className="company-name content-box" style={{ flexBasis: '15%', justifyContent: 'end' }}>
                                                                            <Field
                                                                                label="isPresent"
                                                                                name={`experienceDetails.${index}.isPresent`}
                                                                                checked={values?.experienceDetails[index]?.isPresent}
                                                                                onChange={(e) => setFieldValue(`experienceDetails.${index}.isPresent`, e.target.checked)}
                                                                                component={FormikCheckBox}
                                                                            />
                                                                        </div>
                                                                        <div className="company-name content-box">
                                                                            <label htmlFor={`experienceDetails.${index}.location`} className="form-label">Location</label>
                                                                            <Field
                                                                                name={`experienceDetails.${index}.location`}
                                                                                type="text"
                                                                                component={FormikInput}
                                                                                value={values?.experienceDetails[index]?.location}
                                                                                className="form-control"
                                                                                maxLength={50}
                                                                                onChange={(e) => setFieldValue(`experienceDetails.${index}.location`, e.target.value)}
                                                                            />
                                                                            {
                                                                                errors?.experienceDetails && errors.experienceDetails[index] && errors.experienceDetails[index].location && touched.experienceDetails[index].location && (
                                                                                    <FormHelperText className='formik-input-error' style={{ color: "red" }}>{errors.experienceDetails[index].location}</FormHelperText>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {values?.experienceDetails?.length === (index + 1) && (
                                                                    <div className='d-flex gap-2 mt-2'>
                                                                        <Button type="submit" variant='contained' className="btn btn-primary">
                                                                            <span>Submit</span>
                                                                        </Button>
                                                                        <Button
                                                                            variant="contained"
                                                                            onClick={() => arrayHelpers.push({
                                                                                companyName: '',
                                                                                designation: '',
                                                                                periodFrom: '',
                                                                                periodTo: '',
                                                                                location: '',
                                                                            })}
                                                                            className="btn btn-primary"
                                                                        >
                                                                            <span>
                                                                                Add More
                                                                            </span>
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </>
                                    )}
                                />
                            </div>
                        </Form >
                    )
                }}
            </Formik>
        </section >
    )
}

export default EmployeeExperienceForm