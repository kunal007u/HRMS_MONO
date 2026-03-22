import { Button } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { EmployeeResignationModel } from '../../../Models/employee/employeeM';
import resignationService from '../../../Services/resignation-service';
import ConfirmDialog from '../../../Shared/components/ConfirmDialog';
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import DialogForm from '../../../Shared/components/DialogForm';
import { Modules } from '../../../Shared/enums/modules';
import { getModulePermission } from '../../../utils/commanFunctions';
import AddResignation from './AddResignation';

const AllResignation = () => {
    const queryClient = useQueryClient();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

    const resignationRef = React.useRef(null);

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.EmployeeResignation),
    });

    const columns = [
        { id: 'index', label: 'S.No', width: 10, className: 'text-center' },
        { id: 'modifierFullName', label: 'Modifier Full Name', width: 50, className: 'text-center' },
        // { id: 'description', label: 'Description', width: 50, className: 'text-center' },
        { id: 'remark', label: 'Remark', width: 50, className: 'text-center' },
        { id: 'resignationStatus', label: 'Status', width: 70, className: 'text-center' },
        { id: 'actions', label: 'Actions', width: 10, className: 'text-center' }
    ];

    const mapResponseToColumns = (res: EmployeeResignationModel, index: number) => {
        return {
            index: index + 1,
            id: res?.id,
            modifierFullName: res?.modifierFullName,
            description: res?.description,
            resignationStatus: res?.status ? res?.status : '',
            remark: res?.remark ? res?.remark : '',
        };
    }

    const { data: getAllResignation } = useQuery<EmployeeResignationModel[] | []>({
        queryKey: ['getResignationQueryKey'],
        queryFn: async () => {
            const response = await resignationService.getResignations();
            return response?.data?.data as EmployeeResignationModel[];
        }
    });

    const customResponse = Array.isArray(getAllResignation) ? getAllResignation.map(mapResponseToColumns) : [];

    const handleEdit = (row) => {
        setOpenDialog(true)
        resignationRef.current = row;
    }
    const handleDelete = (row) => {
        setOpenConfirmDialog(true);
        resignationRef.current = row;
    }

    const handleConfirmDelete = async () => {
        if (resignationRef.current) {
            const resignationId = (resignationRef.current as { id: string }).id;
            await resignationService.deleteResignation(resignationId)
                .then((res) => {
                    toast.success(res?.data?.status?.message);
                    queryClient?.invalidateQueries({ queryKey: ['getResignationQueryKey'] });
                    setOpenConfirmDialog(false);
                })
        }
    }

    return (
        <>
            <section>
                {
                    <div className="add-btn-container">
                        <div className="add-btn d-flex justify-end" >
                            <Button className="btn btn-primary" onClick={() => setOpenDialog(true)}>
                                <span> <FaPlus style={{ marginRight: "5px" }} />Add resignation</span>
                            </Button>
                        </div>
                    </div>
                }
            </section>

            <div className="mt-1">
                <CustomShortingMuiTable
                    columns={columns}
                    rows={customResponse || []}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isEditAction
                    isDeleteAction
                    
                    isPagination={false}
                    permission={permission || {}}
                    editDisabled={(row)=> row.resignationStatus === 'accepted' || row.resignationStatus === 'rejected'}
                    deleteDisabled={(row)=> row.resignationStatus === 'accepted' || row.resignationStatus === 'rejected'}
                />
            </div>

            <ConfirmDialog
                title="Delete Resignation"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={"Are you certain you wish to permanently delete this resignation record?"}
                handleSuccess={() => handleConfirmDelete()}
            />

            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Add Resignation"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => {
                    setOpenDialog(false)
                    resignationRef.current = null;
                }}
                bodyContent={
                    <AddResignation resignationRef={resignationRef.current} setOpenDialog={setOpenDialog} />
                }
            />


        </>

    )
}

export default AllResignation