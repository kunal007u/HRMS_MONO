import { Button, TablePagination } from '@mui/material';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ILeaveModel, ILeaveResponseModel } from '../../../../Models/Leaves/leavesM';
import leavesServices from '../../../../Services/leaves-services';
import ConfirmDialog from '../../../../Shared/components/ConfirmDialog';
import CustomShortingMuiTable from '../../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import DialogForm from '../../../../Shared/components/DialogForm';
import messages from '../../../../Shared/constants/messages';
import { Modules } from '../../../../Shared/enums/modules';
import { getModulePermission } from '../../../../utils/commanFunctions';
import LeaveInfo from '../../../HR/Leaves/AllLeaves/LeaveInfo';
import MyLeavesForm from './MyLeavesForm';
import "./myleaves.css";


const columns = [
    { id: 'index', label: 'S.No', width: 50, className: 'text-center' },
    { id: 'startDate', label: 'From', width: 100, className: 'text-center' },
    { id: 'endDate', label: 'To', width: 100, className: 'text-center' },
    { id: 'numberOfDays', label: 'No Of Days', width: 70, className: 'text-center' },
    { id: "halfLeaveDays", label: "Half days", width: 100, className: "text-center" },
    // { id: 'leaveReason', label: 'Reason', width: 150, className: 'text-center' },
    { id: 'Status', label: 'Status', width: 70, className: 'text-center' },
    { id: 'approvedBy', label: 'Status Changed By', width: 40, className: 'text-center' },
    { id: 'actions', label: 'Actions', width: 20, className: 'text-center' },
];

const MyLeaves = () => {
    const queryClient = useQueryClient();

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState<number | string | null>(null);
    const [row, setRow] = useState<ILeaveModel | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.MyLeaves),
    });

    const rowsPerPageOptions = [50, 100, 200];

    const handleDialogClose = () => {
        setOpenDialog(false)
        setRow(null);
    }

    const handleInfo = (_, row) => {
        setOpenInfoDialog(true);
        setRow(row);
    }

    const handleEdit = (row) => {
        if (row.Status.toLowerCase() !== 'pending') {
            toast.error('You can only edit pending leaves.');
            return;
        }
        setOpenDialog(true);
        setRow(row);
    };

    const handleDelete = (row) => {
        if (row.Status.toLowerCase() !== 'pending') {
            toast.error('You can only delete pending leaves.');
            return;
        }
        setDeleteId(row?.id);
        setOpenConfirmDialog(true);
    };

    const deleteLeave = useMutation({
        mutationFn: leavesServices.deleteLeave,
        onSuccess: (data) => {
            if (data?.status !== 200) return toast.error(data?.data?.status?.message);
            else {
                setOpenConfirmDialog(false);
                toast.success(data?.data?.status?.message);
                queryClient.invalidateQueries({ queryKey: ['getAllLeave'] });
            }
        },
    });

    const handleDeleteConfirm = async () => {
        if (deleteId) {
            deleteLeave.mutate(deleteId);
        }
    };

    const { data: getAllLeave, isLoading } = useQuery<ILeaveResponseModel>({
        queryKey: ['getAllLeave', page, rowsPerPage],
        queryFn: async () => {
            const res = await leavesServices.getEmployeeLeaves(page, rowsPerPage);
            return res?.data?.data as ILeaveResponseModel;
        },
        placeholderData: keepPreviousData,
    });

    const mapResponseToColumns = (res: ILeaveModel, index) => {
        return {
            id: res.id,
            index: index + 1 + page * rowsPerPage,
            isHalfDay: res?.isHalfDay ? res?.isHalfDay : false,
            halfLeaveDays: res?.halfLeaveDays ? res?.halfLeaveDays : '-',
            startDate: res?.startDate,
            endDate: res?.endDate,
            numberOfDays: res?.numberOfDays ? res?.numberOfDays : '-',
            reason: res?.reason ? res?.reason : '-',
            Status: res?.status ? res?.status : '-',
            remark: res?.remark ? res?.remark : '-',
            approvedBy: res?.approvedBy ? res?.approvedBy : '-',
            leaveInfos: res.leaveInfos.map(info => ({
                id: info.id,
                date: info.date,
                selectedDuration: info.selectedDuration,
                leaveId: info.leaveId,
            })),
        };
    };

    const customResponse = getAllLeave?.rows?.map(mapResponseToColumns);

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    return (
        <>
            <section className='my-leave-section'>
                <div className="my-leave-container">

                    <div className="add-leave-btn d-flex justify-end" >
                        <Button className="btn btn-primary"
                            onClick={() => {
                                setOpenDialog(true)
                                setRow(null)
                            }}
                            variant='contained'
                            // disabled={getAllLeave?.rows?.some((x: any) => x.status === 'pending')}
                        >
                            <span>  <FaPlus style={{ marginRight: "5px" }} /> Add Leave </span>
                        </Button>
                    </div>


                    <div className='d-flex gap-2 mt-1'>

                        {/* <div className="my-leave-dashboard-boxes mt-1"> */}
                        <div className="paid-leave white-box content-box">
                            <h3>Balance</h3>
                            <span>{getAllLeave?.leaveDashboard?.balance || "0.0"}</span>
                        </div>
                        <div className="paid-leave white-box content-box">
                            <h3>Paid Leave</h3>
                            <span>{getAllLeave?.leaveDashboard?.paidLeave || "0.0"}</span>
                        </div>
                        <div className="paid-leave white-box content-box">
                            <h3>Loss of pay</h3>
                            <span>{getAllLeave?.leaveDashboard?.lossOfPay || "0.0"}</span>
                        </div>
                        <div className="paid-leave white-box content-box">
                            <h3>Total loss of pay</h3>
                            <span>{getAllLeave?.leaveDashboard?.totalLossOfPay || "0.0"}</span>
                        </div>
                        <div className="paid-leave white-box content-box">
                            <h3>Total paid leave</h3>
                            <span>{getAllLeave?.leaveDashboard?.totalPaidLeave || "0.0"}</span>
                        </div>
                        {/* </div> */}
                    </div>

                </div>
                <div className="white-box mt-1">
                    <CustomShortingMuiTable
                        isLoading={isLoading}
                        columns={columns}
                        rows={customResponse || []}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onInfo={handleInfo}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        permission={permission || { canCreate: false, canUpdate: false, canDelete: false, canRead: false }}
                        isEditAction={true}
                        isInfoAction={true}
                        isDeleteAction={true}
                        
                    />

                    <TablePagination
                        component="div"
                        count={getAllLeave?.count || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(e, page) => setPage(page)}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        rowsPerPageOptions={rowsPerPageOptions}
                    />
                </div>

            </section>

            <DialogForm
                scroll="body"
                maxWidth="lg"
                title={`${row?.id ? 'Edit' : 'Add'} Leave`}
                openDialog={openDialog}
                handleDialogClose={handleDialogClose}
                bodyContent={<MyLeavesForm row={row} setOpenDialog={setOpenDialog} />}
            />

            <DialogForm
                scroll="body"
                maxWidth="lg"
                title={`Leave Info`}
                openDialog={openInfoDialog}
                handleDialogClose={() => setOpenInfoDialog(false)}
                bodyContent={<LeaveInfo row={row} />}
            />

            <ConfirmDialog
                title="Delete Leave"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={messages.LeaveDeleteMsg}
                handleSuccess={handleDeleteConfirm}
            />
        </>

    )
}

export default MyLeaves