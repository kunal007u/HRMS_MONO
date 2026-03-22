import { Button } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { PoliciesModel } from '../../../Models/employee/employeeM'
import policiesService from '../../../Services/policies-service'
import ConfirmDialog from '../../../Shared/components/ConfirmDialog'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import DialogForm from '../../../Shared/components/DialogForm'
import { Modules } from '../../../Shared/enums/modules'
import { getModulePermission } from '../../../utils/commanFunctions'
import AddPoliciesForm from './AddPoliciesForm'
import './policies.css'

const Policies = () => {
    const queryClient = useQueryClient();
    const policyRef = React.useRef<PoliciesModel>(null);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [permission, setPermission] = React.useState(null)

    React.useEffect(() => {
        (async function () {
            const permission = await getModulePermission(Modules.Policies);
            setPermission(permission);
        })();
    }, [])

    const columns = [
        { id: 'index', label: 'S.No', width: 10, className: 'text-center' },
        { id: 'name', label: 'Policy Name', className: 'text-center' },
        { id: 'description', label: 'Policy Description', width: "50%", className: 'text-center' },
        { id: 'actions', label: 'Policy File', className: 'text-center' },
    ]

    const { data: getAllPolicies } = useQuery<PoliciesModel[] | []>({
        queryKey: ['getAllPolicies'],
        queryFn: async () => {
            const response = await policiesService.getAllPolicies();
            return response?.data?.data as PoliciesModel[];
        }
    });
    
    const mapResponseToColumns = (res: any, index: number) => {
        return {
            id: res?.id,
            index: index + 1,
            name: res?.name,
            description: res?.description,
            policyFile : res?.policyFile
        }
    };

    const customResponse = getAllPolicies?.map(mapResponseToColumns);

    const handleEdit = (row) => {
        policyRef.current = row;
        setOpenDialog(true)
    }

    const handleDelete = (row) => {
        setOpenConfirmDialog(true);
        policyRef.current = row;
    }

    const handleView = (row) => {
        policyRef.current = row;
        window.open(String(policyRef.current.policyFile), '_blank');
    }

    const handleConfirmDelete = async () => {
        if (policyRef.current) {
            const policyId = policyRef.current.id;
            await policiesService.deletePolicy(policyId)
                .then((res) => {
                    toast.success(res?.data?.status?.message);
                    queryClient?.invalidateQueries({ queryKey: ['getAllPolicies'] });
                    setOpenConfirmDialog(false);
                })
        }
    }

    return (
        <section className="policies">
            <div className="add-policies-btn d-flex justify-end">
                <Button className="btn" onClick={() => setOpenDialog(true)}>
                    <span>  <FaPlus style={{ marginRight: "5px" }} /> Add Policies </span>
                </Button>
            </div>

            <section className="white-box mt-1">
                <CustomShortingMuiTable
                    columns={columns}
                    rows={customResponse}
                    permission={permission}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isEditAction
                    isDeleteAction
                    isViewAction={true}
                    onView={handleView}
                />
            </section>

            <DialogForm
                scroll="body"
                maxWidth="sm"
                title={policyRef.current ? "Edit Policy" : "Add Policy"}
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => {
                    setOpenDialog(false)
                    policyRef.current = null;
                }}
                bodyContent={<AddPoliciesForm policyRef={policyRef.current} setOpenDialog={setOpenDialog} />}
            />

            <ConfirmDialog
                title="Delete Policy"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={"Are you certain you wish to permanently delete this policy record? Please note that this action cannot be undone."}
                handleSuccess={() => handleConfirmDelete()}
            />
        </section>

    )
}

export default Policies