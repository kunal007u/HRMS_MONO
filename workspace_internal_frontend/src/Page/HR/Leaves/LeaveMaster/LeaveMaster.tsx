import { Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { LeaveMasterModel } from '../../../../Models/Leaves/leavesM';
import { default as leaveMasterService } from '../../../../Services/leaveMaster-service';
import CustomShortingMuiTable from '../../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import DialogForm from '../../../../Shared/components/DialogForm';
import { Modules } from '../../../../Shared/enums/modules';
import FormikInput from '../../../../Shared/formik-fields/FormikInput';
import { getModulePermission } from '../../../../utils/commanFunctions';
import "../all-leaves.css";
import { updateLeaveMasterVlidationSchema } from '../../../../Validations/leaveV';

const columns = [
    { id: 'index', label: 'S.No', minWidth: 50, className: 'text-center' },
    { id: 'month', label: 'Month', minWidth: 100, className: 'text-center' },
    { id: 'leaves', label: 'Leaves', minWidth: 100, className: 'text-center' },
    { id: 'actions', label: 'Actions', minWidth: 100, className: 'text-center' },
];

const LeaveMaster = () => {

    const [openEditDialog, setEditDialog] = useState(false);
    const [row, setRow] = useState(null);

    const queryClient = useQueryClient();

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.LeaveMaster),
    });

    const { data: AllLeaveBalnce, isLoading } = useQuery({
        queryKey: ["getAllLeaveMaster"],
        queryFn: async () => {
            const response = await leaveMasterService.getAllLeaveMaster();
            return response?.data?.data as LeaveMasterModel[];
        },
        enabled: permission?.canRead
    });

    const mapResponseToColumns = (res, index: number) => {

        return {
            index: index + 1,
            id: res.id,
            month: res.month,
            leaves: res.leaves,
        };
    };

    const customResponse = AllLeaveBalnce?.map(mapResponseToColumns);

    const updateLeaveMasterMutation = useMutation({
        mutationFn: (value: LeaveMasterModel) => leaveMasterService.updateLeaveMaster(value?.id, value),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllLeaveMaster'] });
                setEditDialog(false);
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const handleEdit = async (value) => {
        setEditDialog(true);
        setRow(value);
    }

    return (
        <>
            <CustomShortingMuiTable
                columns={columns}
                rows={customResponse || []}
                isLoading={isLoading}
                isEditAction
                onEdit={handleEdit}
                permission={permission || { canCreate: false, canRead: false, canUpdate: false, canDelete: false }}
            />

            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Update Leave Master"
                openDialog={openEditDialog}
                handleDialogClose={() => {
                    setEditDialog(false)
                    setRow(null)
                }}
                bodyContent={
                    <>
                        <section style={{ padding: "20px" }}>

                            <Formik
                                initialValues={{
                                    id: row?.id || '',
                                    month: row?.month || '',
                                    leaves: row?.leaves || '',
                                }}
                                onSubmit={(values) => {
                                    updateLeaveMasterMutation.mutate(values);
                                }}
                                validationSchema={updateLeaveMasterVlidationSchema}
                            >
                                {({ values, setFieldValue, errors }) => {
                                    return (
                                        <Form>
                                            <div className="form policy-form" >
                                                <div className="add-form-group" style={{ width: "99%" }}>
                                                    <label htmlFor="month" className='form-label'>Month</label>
                                                    <Field
                                                        type="text"
                                                        disabled={true}
                                                        name="month"
                                                        placeholder="Month"
                                                        className="form-control"
                                                        component={FormikInput}
                                                        value={values?.month}
                                                        onChange={(e) => setFieldValue('month', e.target.value)}
                                                    />

                                                </div>

                                                <div className="add-form-group" style={{ width: "99%" }}>
                                                    <label htmlFor="leaves" className='form-label'>Leaves</label>
                                                    <Field
                                                        type="number"
                                                        name="leaves"
                                                        placeholder="Leaves"
                                                        className="form-control"
                                                        component={FormikInput}
                                                        value={values?.leaves}
                                                        onChange={(e) => setFieldValue('leaves', e.target.value)}

                                                    />
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
                    </>
                }
            />
        </>


    )
}

export default LeaveMaster