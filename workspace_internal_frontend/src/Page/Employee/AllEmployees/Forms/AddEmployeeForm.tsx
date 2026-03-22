/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormHelperText } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import React from 'react'
import { toast } from 'react-toastify'
import { Employee, IDepartmentModel, IDesignation, IReportingPersonModel } from '../../../../Models/employee/employeeM'
import { IRoleModel } from '../../../../Models/role'
import adminService from '../../../../Services/admin-service'
import personalDetailService from '../../../../Services/personal-detail-service'
import FormikDatePicker from '../../../../Shared/formik-fields/FormikDatePicker'
import FormikFileUpload from '../../../../Shared/formik-fields/FormikFileUpload'
import FormikInput from '../../../../Shared/formik-fields/FormikInput'
import FormikRadio from '../../../../Shared/formik-fields/FormikRadio'
import FormikSelect from '../../../../Shared/formik-fields/FormikSelect'
import { AddEmployeeSchema } from '../../../../Validations/employeeV'
import "../../PersonalDetails/personaldetail.css"
import "../allemployee.css"

interface Iprops {
    employee?: Employee,
    setOpenDialog: (value: boolean) => void,
}

const AddEmployeeForm = ({ employee, setOpenDialog }: Iprops) => {
    const queryClient = useQueryClient();
    const [preview, setPreview] = React.useState(employee?.profilePicture);

    const { data: departments } = useQuery<IDepartmentModel[]>({
        queryKey: ["allDepartments"],
        queryFn: async () => {
            const response = await adminService.getAllDepartment();
            const data: IDepartmentModel[] = response?.data?.data;
            return data;
        }
    });

    const { data: designations } = useQuery<IDesignation[]>({
        queryKey: ["allDesignations"],
        queryFn: async () => {
            const response = await adminService.getAllDesignation();
            const data: IDesignation[] = response?.data?.data;
            return data;
        }
    });

    const { data: roles } = useQuery<IRoleModel[]>({
        queryKey: ["allRoles"],
        queryFn: async () => {
            const response = await adminService.getAllRoles();
            const data: IRoleModel[] = response?.data?.data;
            return data;
        }
    });

    const { data: reportingPerson } = useQuery<IReportingPersonModel[]>({
        queryKey: ['getAllReportingPerson'],
        queryFn: async () => {
            const res = await personalDetailService.getAllEmployeeDD();
            return res.data.data as IReportingPersonModel[];
        }
    });

    const addEmployeeMutation = useMutation({
        mutationFn: adminService.addEmployee,
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllEmployee'] });
                setOpenDialog(false);
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const updateEmployeeMutation = useMutation({
        mutationFn: (formData: FormData) => adminService.updateEmployee(formData, employee?.id?.toString()),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['employeeDetail'] });
                setOpenDialog(false);
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });


    const handleSubmit = async (values) => {
        const formData = new FormData();
        const { profilePicture, ...otherValues } = values;

        Object.keys(otherValues).forEach(key => {
            formData.append(key, otherValues[key]);
        });

        if (profilePicture instanceof File) {
            formData.append('profilePicture', profilePicture);
        }

        if (employee?.id) {
            updateEmployeeMutation.mutate(formData);
        } else {
            addEmployeeMutation.mutate(formData);
        }

    };

    return (
        <section className="add-employee-form" >
            <Formik
                initialValues={{
                    firstName: employee?.firstName || '',
                    middleName: employee?.middleName || '',
                    lastName: employee?.lastName || '',
                    pancardNo: employee?.pancardNo || null,
                    aadharNo: employee?.aadharNo || null,
                    uanNo: employee?.uanNo || null,
                    pfNo: employee?.pfNo || null,
                    email: employee?.email || '',
                    dateOfJoining: employee?.dateOfJoining || '',
                    gender: employee?.gender || "male",
                    phoneNumber: employee?.phoneNumber || '',
                    departmentId: employee?.departmentId || '',
                    designationId: employee?.designationId || '',
                    roleId: employee?.roleId || '',
                    reportTo: employee?.reportToId || null,
                    profilePicture: employee?.profilePicture || '',
                    workLocation: employee?.workLocation || '',
                    employeeCode: employee?.employeeCode || '',
                    employeeType: employee?.employeeType || '',
                    endingDate: employee?.endingDate || '',
                }}
                onSubmit={handleSubmit}
                validationSchema={AddEmployeeSchema}
            >
                {({ values, setFieldValue, errors }) => {
                    return (
                        <Form className="all-employee-form-container">
                            <div className="mb-2">
                                <div className="personal-detail-form-content">
                                    <div className="profile-image content-box">
                                        {/* <label htmlFor="profilePicture" className='form-label'>Profile Picture</label> */}
                                        <div className="custom-file-upload">
                                            <label htmlFor="profilePicture" className="custom-file-label">
                                                {preview ? <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} /> : 'Profile Picture'}
                                            </label>
                                            <Field
                                                type="file"
                                                name="profilePicture"
                                                id="profilePicture"
                                                className="form-control"
                                                component={FormikFileUpload}
                                                accept="image/*"
                                                style={{ display: 'none' }} // Hide the default file input
                                                onChange={(event) => {
                                                    const file = event.target.files[0];
                                                    setFieldValue('profilePicture', file);
                                                    const reader = new FileReader();
                                                    reader.onload = (e) => {
                                                        setPreview(e.target?.result as string);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }}
                                            />
                                        </div>
                                        {errors.profilePicture && <FormHelperText error className='formik-input-error'>{errors?.profilePicture}</FormHelperText>}
                                    </div>
                                    <div className="first-name content-box">
                                        <label htmlFor="firstName" className='form-label'>First Name</label>
                                        <Field
                                            type="text"
                                            name="firstName"
                                            id="First Name"
                                            value={values.firstName}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("firstName", e.target.value)}
                                        />
                                    </div>
                                    <div className="middle-name content-box">
                                        <label htmlFor="MiddleName" className='form-label'>Middle Name</label>
                                        <Field
                                            type="text"
                                            name="middleName"
                                            id="Middle Name"
                                            value={values.middleName}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("middleName", e.target.value)}
                                        />
                                    </div>
                                    <div className="last-name content-box">
                                        <label htmlFor="Lastname" className='form-label'>Last Name</label>
                                        <Field
                                            type="text"
                                            name="lastName"
                                            id="Last Name"
                                            value={values.lastName}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("lastName", e.target.value)}
                                        />
                                    </div>
                                    <div className="email content-box">
                                        <label htmlFor="email" className='form-label'>Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={values.email}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("email", e.target.value)}
                                        />
                                    </div>
                                    <div className="joining-date content-box">
                                        <label htmlFor="dateOfJoining" className='form-label'>Joining Date</label>
                                        <Field
                                            type="date"
                                            name="dateOfJoining"
                                            id="dateOfJoining"
                                            value={values.dateOfJoining}
                                            className="form-control"
                                            onChange={(e) => {
                                                setFieldValue('dateOfJoining', e.target.value)
                                            }}
                                            component={FormikDatePicker}
                                            maxDate={moment()}
                                        />
                                    </div>
                                    <div className="gender content-box">
                                        <label htmlFor="gender">Gender</label>
                                        <div className="leave-duration-radio-group">
                                            <Field
                                                id="gender"
                                                name="gender"
                                                value={values.gender}
                                                options={[
                                                    {
                                                        value: "male",
                                                        label: "Male"
                                                    },
                                                    {
                                                        value: "female",
                                                        label: "Female"
                                                    }
                                                ]}
                                                onChange={(e) => {
                                                    setFieldValue('gender', e.target.value);
                                                }}
                                                component={FormikRadio}
                                            />
                                        </div>
                                    </div>
                                    <div className="phone content-box">
                                        <label htmlFor="phoneNumber" className='form-label'>Phone</label>
                                        <Field
                                            type="number"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            value={values.phoneNumber}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
                                        />
                                    </div>
                                    <div className="pancard content-box">
                                        <label htmlFor="pancardNo" className='form-label'>Pan Card Number</label>
                                        <Field
                                            type="text"
                                            name="pancardNo"
                                            id="pancardNo"
                                            value={values.pancardNo}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("pancardNo", e.target.value)}
                                        />
                                    </div>
                                    <div className="aadhar content-box">
                                        <label htmlFor="aadharNo" className='form-label'>Aadhar Number</label>
                                        <Field
                                            type="number"
                                            name="aadharNo"
                                            id="aadharNo"
                                            value={values.aadharNo}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("aadharNo", e.target.value)}
                                        />
                                    </div>
                                    <div className="uan content-box">
                                        <label htmlFor="uanNo" className='form-label'>UAN Number</label>
                                        <Field
                                            type="number"
                                            name="uanNo"
                                            id="uanNo"
                                            value={values.uanNo}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("uanNo", e.target.value)}
                                            inputmode="numeric"
                                        />
                                    </div>
                                    <div className="pf content-box">
                                        <label htmlFor="pfNo" className='form-label'>PF Number</label>
                                        <Field
                                            type="text"
                                            name="pfNo"
                                            id="pfNo"
                                            value={values.pfNo}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("pfNo", e.target.value)}
                                        />
                                    </div>
                                    <div className="work-location content-box">
                                        <label htmlFor="workLocation" className='form-label'>Work Location</label>
                                        <Field
                                            type="text"
                                            name="workLocation"
                                            id="workLocation"
                                            value={values.workLocation}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("workLocation", e.target.value)}
                                        />
                                    </div>
                                    <div className="department content-box">
                                        <label htmlFor="departmentId" className='form-label'>Department</label>
                                        <Field
                                            type="text"
                                            name="departmentId"
                                            id="departmentId"
                                            value={values.departmentId}
                                            className="form-control"
                                            options={departments?.map((department: IDepartmentModel) => ({
                                                title: department?.name,
                                                value: department?.id,
                                            }))}
                                            component={FormikSelect}
                                            onChange={(e) => setFieldValue("departmentId", e.target.value)}
                                        />
                                    </div>
                                    <div className="designation content-box">
                                        <label htmlFor="designationId" className='form-label'>Designation</label>
                                        <Field
                                            type="text"
                                            name="designationId"
                                            id="designationId"
                                            value={values.designationId}
                                            className="form-control"
                                            options={designations?.map((designation: IDesignation) => ({
                                                title: designation?.name,
                                                value: designation?.id,
                                            }))}
                                            component={FormikSelect}
                                            onChange={(e) => setFieldValue("designationId", e.target.value)}
                                        />
                                    </div>
                                    <div className="role content-box">
                                        <label htmlFor="roleId" className='form-label'>Role</label>
                                        <Field
                                            type="text"
                                            name="roleId"
                                            id="roleId"
                                            value={values.roleId}
                                            className="form-control"
                                            options={roles?.map((role: IRoleModel) => ({
                                                title: role?.name,
                                                value: role?.id,
                                            }))}
                                            component={FormikSelect}
                                            onChange={(e) => setFieldValue("roleId", e.target.value)}
                                        />
                                    </div>
                                    <div className="reporting-to content-box">
                                        <label htmlFor="reportTo" className='form-label'>Reporting Person</label>
                                        <Field
                                            type="text"
                                            name="reportTo"
                                            id="reportTo"
                                            value={values?.reportTo}
                                            className="form-control"
                                            options={reportingPerson?.map((person: IReportingPersonModel) => ({
                                                title: person?.fullName,
                                                value: person?.id,
                                            }))}
                                            component={FormikSelect}
                                            onChange={(e) => setFieldValue("reportTo", e.target.value)}
                                        />
                                    </div>
                                    <div className="employee-code content-box">
                                        <label htmlFor="employeeCode" className='form-label'>Employee Code</label>
                                        <Field
                                            type="text"
                                            name="employeeCode"
                                            id="employeeCode"
                                            value={values.employeeCode}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("employeeCode", e.target.value)}
                                        />
                                    </div>
                                    <div className="employee-type content-box">
                                        <label htmlFor="employeeType" className='form-label'>Employee Type</label>
                                        <Field
                                            type="text"
                                            name="employeeType"
                                            id="employeeType"
                                            value={values.employeeType}
                                            className="form-control"
                                            options={[
                                                {
                                                    title: "Trainee",
                                                    value: "trainee"
                                                },
                                                {
                                                    title: "Intern",
                                                    value: "intern"
                                                },
                                                {
                                                    title: "Full-time",
                                                    value: "full-time"
                                                },
                                                {
                                                    title: "permanent",
                                                    value: "permanent"
                                                }
                                            ]}
                                            component={FormikSelect}
                                            onChange={(e) => setFieldValue("employeeType", e.target.value)}

                                        />
                                    </div>
                                    {
                                        values.employeeType !== "permanent" && (
                                            <div className="ending-date content-box">
                                                <label htmlFor="endingDate" className='form-label'>Ending Date</label>
                                                <Field
                                                    type="date"
                                                    name="endingDate"
                                                    id="endingDate"
                                                    value={values.endingDate}
                                                    className="form-control"
                                                    onChange={(e) => {
                                                        setFieldValue('endingDate', e.target.value)
                                                    }}
                                                    component={FormikDatePicker}
                                                    // maxDate={moment()}
                                                    minDate={moment()}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="submit-btn">
                                    <Button type="submit" className="btn btn-primary">
                                        <span>
                                            Submit
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </section>
    )
}

export default AddEmployeeForm