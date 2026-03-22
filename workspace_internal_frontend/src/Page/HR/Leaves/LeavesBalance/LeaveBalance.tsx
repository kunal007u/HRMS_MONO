import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { ILeaveBalanceModel } from "../../../../Models/Leaves/leavesM";
import leavesServices from "../../../../Services/leaves-services";
import CustomShortingMuiTable from "../../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable";
import DialogForm from "../../../../Shared/components/DialogForm";
import { Modules } from "../../../../Shared/enums/modules";
import FormikInput from "../../../../Shared/formik-fields/FormikInput";
import { getModulePermission } from "../../../../utils/commanFunctions";
import { leaveBalanceValidationSchema } from "../../../../Validations/leaveV";

const columns = [
    { id: 'index', label: 'S.No', minWidth: 50, className: 'text-center' },
    { id: 'fullName', label: 'Full Name', minWidth: 100, className: 'text-center' },
    { id: 'designation', label: 'Designation', minWidth: 100, className: 'text-center' },
    { id: 'balance', label: 'Leave Balance', minWidth: 100, className: 'text-center' },
    { id: 'paidLeave', label: 'Paid Leave', minWidth: 100, className: 'text-center' },
    { id: 'lossOfPay', label: 'Loss of Pay', minWidth: 100, className: 'text-center' },
    { id: 'actions', label: 'Actions', minWidth: 100, className: 'text-center' },

];

const LeaveBalance = () => {

    const queryClient = useQueryClient();
    const [openEditDialog, setEditDialog] = useState(false);
    const [row, setRow] = useState(null);

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.LeaveBalance),
    });

    const { data: AllLeaveBalnce, isLoading } = useQuery({
        queryKey: ["getAllLeaveBalance"],
        queryFn: async () => {
            const response = await leavesServices.getAllLeaveBalance();
            return response?.data?.data as ILeaveBalanceModel[];
        },
        enabled: permission?.canRead
    });

    const mapResponseToColumns = (res: ILeaveBalanceModel, index: number) => {

        return {
            id: res.id,
            index: index + 1,
            fullName: res.fullName,
            balance: res.balance,
            employeeId: res.employeeId,
            paidLeave: res.paidLeave,
            lossOfPay: res.lossOfPay,
            designation: res.designation
        };
    };

    const customResponse = AllLeaveBalnce?.map(mapResponseToColumns);


    const updateLeaveBalanceMutation = useMutation({
        mutationFn: (value: any) => leavesServices.updateLeaveBalance(value?.id, value),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllLeaveBalance'] });
                setEditDialog(false);
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });


    const handleEdit = (row) => {
        setEditDialog(true);
        setRow(row);
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
                title="Update Leave Balance"
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
                                    balance: row?.balance || '',
                                    employeeName: row?.fullName || '',
                                }}
                                onSubmit={(values) => {
                                    updateLeaveBalanceMutation.mutate(values);
                                }}
                                validationSchema={leaveBalanceValidationSchema}
                            >
                                {({ values, setFieldValue, errors }) => {
                                    return (
                                        <Form>
                                            <div className="form policy-form" >
                                                <div className="add-form-group" style={{ width: "99%", marginTop: "10px" }}>
                                                    <Field
                                                        type="text"
                                                        name="employeeName"
                                                        disabled={true}
                                                        placeholder="employeeName"
                                                        className="form-control"
                                                        component={FormikInput}
                                                        value={values?.employeeName}
                                                        onChange={(e) => setFieldValue('employeeName', e.target.value)}
                                                    />
                                                </div>

                                                <div className="add-form-group" style={{ width: "99%" }}>
                                                    <label htmlFor="balance" className='form-label'>Leave balance</label>
                                                    <Field
                                                        type="number"
                                                        name="balance"
                                                        placeholder="balance"
                                                        className="form-control"
                                                        component={FormikInput}
                                                        value={values?.balance}
                                                        onChange={(e) => setFieldValue('balance', e.target.value)}
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

export default LeaveBalance