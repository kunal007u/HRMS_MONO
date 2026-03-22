import { Button } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import personalDetailService from '../../../../Services/personal-detail-service'
import ConfirmDialog from '../../../../Shared/components/ConfirmDialog'
import CustomShortingMuiTable from '../../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import DialogForm from '../../../../Shared/components/DialogForm'
import messages from '../../../../Shared/constants/messages'
import { Modules } from '../../../../Shared/enums/modules'
import { IApplicationState } from '../../../../Store/state/app-state'
import { getModulePermission } from '../../../../utils/commanFunctions'
import AddUpdateAssets from './AddUpdateAssets'
import "./assettable.css"

const AssetTable = ({ assetsDetails, tabIndex }) => {
    const userData = useSelector((state: IApplicationState) => state.UserData);
    const { id } = useParams()
    const queryClient = useQueryClient()

    const [row, setRow] = React.useState(null)
    const [deleteRows, setDeleteRows] = React.useState(null)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false)
   
    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.PersonalDetail),
    });

    React.useEffect(() => {
        setRow(null)
    }, [tabIndex])

    const columns = [
        { id: 'index', label: 'S.No', className: 'text-center' },
        { id: 'assetsName', label: 'Asset Name', className: 'text-center' },
        { id: 'assetsID', label: 'Asset ID', className: 'text-center' },
        { id: 'assignedDate', label: 'Assigned Date', className: 'text-center' },
        { id: 'quantity', label: 'Quantity', className: 'text-center' },
        { id: 'description', label: 'Description', className: 'text-center' },
    ]

    if (permission && (permission.canUpdate || permission.canDelete)) {
        columns.push({ id: 'actions', label: 'Actions',  className: 'text-center' });
    }

    const mapResponseToColumns = (res, index) => {
        return {
            index: index + 1,
            assetsName: res.assetsName,
            assetsID: res.assetsId,
            assignedDate: res.assignedDate,
            quantity: res.quantity,
            description: res.description,
        };
    };

    const customResponse = assetsDetails?.map(mapResponseToColumns);

    const handleEdit = (row) => {
        setRow(row);
        setOpenDialog(true);
    }

    const DeleteAssetsMutation = useMutation({
        mutationFn: (values: number) => personalDetailService.DeleteAssetsDetailsByID(values),
        onSuccess: (res) => {
            if (res?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['employeeDetail'] });
                setOpenDialog(false);
                toast.success(res?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.log(error.message);
        },
    })

    const handleDelete = (row) => {
        setOpenConfirmDialog(true)
        setDeleteRows(row)
    }

    const handleDeleteConfirm = () => {
        DeleteAssetsMutation.mutate(deleteRows.assetsID)
        setOpenConfirmDialog(false)
        setDeleteRows(null)
    }

    return (
        <div>
            <section className='white-box'>
                {
                    (userData?.role === "HR" || userData?.role === "SUPER ADMIN") && id && (
                        <div className="add-employee-btn d-flex justify-end mb-1">
                            <Button className="btn btn-primary" onClick={() => setOpenDialog(true)}>
                                <span> <FaPlus style={{ marginRight: "5px" }} /> Add Assets</span>
                            </Button>
                        </div>
                    )
                }
                <CustomShortingMuiTable
                    isEditAccess={true}
                    columns={columns}
                    rows={customResponse}
                    permission={permission}
                    isDeleteAction={true}
                    isEditAction={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </section>
            <DialogForm
                scroll="body"
                maxWidth="lg"
                title={row ? "Update Assets" : "Add Assets"}
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => {
                    setOpenDialog(false)
                    setRow(null)
                }}
                bodyContent={<AddUpdateAssets assetsDetails={row} setOpenDialog={setOpenDialog} />}
            />


            <ConfirmDialog
                title="Delete Asset"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={messages.AssetDeleteMsg}
                handleSuccess={handleDeleteConfirm}
            />
        </div>
    )
}

export default AssetTable