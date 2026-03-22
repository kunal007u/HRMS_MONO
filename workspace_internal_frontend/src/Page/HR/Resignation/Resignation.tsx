import { Button } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { EmployeeResignationModel } from '../../../Models/employee/employeeM';
import resignationService from '../../../Services/resignation-service';
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import DialogForm from '../../../Shared/components/DialogForm';
import { Modules } from '../../../Shared/enums/modules';
import FormikInput from '../../../Shared/formik-fields/FormikInput';
import { getModulePermission } from '../../../utils/commanFunctions';
import "./resignation.css";
import AddResignation from '../../Employee/EmployeeResignation/AddResignation';
import * as Yup from 'yup';

const Resignation = () => {
    const [row, setRow] = useState(null);
    const [openRemarkDialog, setOpenRemarkDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const queryClient = useQueryClient();
    const [permission, setPermission] = React.useState(null)

    React.useEffect(() => {
        (async function () {
            const permission = await getModulePermission(Modules.ResignationHR);
            setPermission(permission);
        })();
    }, [])

    const columns = [
        { id: 'index', label: 'S.No', width: 10, className: 'text-center' },
        { id: 'employeeFullName', label: 'Employee Name', width: 10, className: 'text-center' },
        { id: 'modifierFullName', label: 'Modifier Full Name', width: 50, className: 'text-center' },
        // { id: 'description', label: 'Description', width: 50, className: 'text-center' },
        { id: 'remark', label: 'Remark', width: 50, className: 'text-center' },
        { id: 'resignationStatus', label: 'Status', width: 70, className: 'text-center' },
        { id: 'actions', label: 'Actions', width: 10, className: 'text-center' }
    ];

    const mapResponseToColumns = (res, index: number) => {
        return {
            id: res?.id,
            index: index + 1,
            employeeFullName: res?.employeeFullName,
            modifierFullName: res?.modifierFullName,
            description: res?.description,
            resignationStatus: res?.status ? res?.status : '',
            remark: res?.remark ? res?.remark : '',

        };
    };

    const { data: getAllResignation } = useQuery<EmployeeResignationModel[] | []>({
        queryKey: ['getAllResignationQueryKey'],
        queryFn: async () => {
            const response = await resignationService.getAllResignations();
            return response?.data?.data as EmployeeResignationModel[];
        }
    });

    const customResponse = getAllResignation?.map(mapResponseToColumns);

    const handleCloseRemarkDialog = () => {
        setOpenRemarkDialog(false);
    };

    const changeLeaveStatus = async (row, remark) => {
        const value = { status: row?.status, remark }
        try {
            const res = await resignationService.changeLeaveStatus(row.id, value);
            if (res.status === 200) {
                queryClient.invalidateQueries({ queryKey: ['getAllResignationQueryKey'] });
                toast.success(res?.data?.status?.message);
                setRow(null);
            }
        } catch (err) {
            toast.error('Something went wrong');
        }
    };

    const handleStatusChange = async (row) => {
        setRow(row);
        if (row.status === 'rejected') {
            setOpenRemarkDialog(true);
        } else {
            await changeLeaveStatus(row, '');
        }
    };

    const handleInfo = (_, row) => {
        const data = {
            id: row.id,
            description: row.description,
            isDisabled: true
        }
        setRow(data);
        setOpenDialog(true);
    };

    return (
        <section className='resignation'>
            <div className="white-box mt-1" >
                <CustomShortingMuiTable
                    columns={columns}
                    rows={customResponse}
                    isEditAccess={true}
                    
                    isInfoAction={true}
                    onInfo={handleInfo}
                    onStatusChange={handleStatusChange}
                    permission={permission}
                />
            </div>

            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Remarks"
                openDialog={openRemarkDialog}
                handleDialogClose={() => setOpenRemarkDialog(false)}
                bodyContent={
                    <>
                        <div className="leave-remarks">
                            <Formik
                                initialValues={{
                                    remark: '',
                                }}
                                onSubmit={(values) => {
                                    changeLeaveStatus(row, values?.remark);
                                    handleCloseRemarkDialog();
                                }}
                                validationSchema={
                                    Yup.object().shape({
                                        remark: Yup.string().required('Remark is required').trim()
                                    })
                                }
                            >
                                {({ values, setFieldValue }) => {
                                    return (
                                        <Form>
                                            <div className="modal-form" >
                                                <div className="remarks content-box form">
                                                    <Field
                                                        placeholder="Remarks"
                                                        type="text"
                                                        multiline
                                                        className="form-control"
                                                        id="remark"
                                                        name="remark"
                                                        maxLength={5000}
                                                        value={values?.remark}
                                                        component={FormikInput}
                                                        onChange={(e) => {
                                                            setFieldValue('remark', e.target.value);
                                                        }}
                                                    />
                                                </div>
                                                <div className="remarks-btn content-box mt-2">
                                                    <Button className="btn btn-primary" type="submit">
                                                        <span>Submit</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </>
                }
            />

            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Description"
                openDialog={openDialog}
                handleDialogClose={() => {
                    setOpenDialog(false);
                    setRow(null);
                }}
                bodyContent={
                    <AddResignation resignationRef={row} setOpenDialog={setOpenDialog} />
                }
            />
        </section>
    )

}

export default Resignation