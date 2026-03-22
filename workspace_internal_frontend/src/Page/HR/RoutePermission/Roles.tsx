import { Box, Button } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IRoleRoutePermissionModel } from '../../../Models/role';
import roleService from '../../../Services/role-service';
import ConfirmDialog from '../../../Shared/components/ConfirmDialog';
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import messages from '../../../Shared/constants/messages';
import { Modules } from '../../../Shared/enums/modules';
import { DateUTCToLocalDateTimeString } from '../../../utils/dateFormat';
import './role.css';
import { getModulePermission } from '../../../utils/commanFunctions';

const Role = () => {
    const navigate = useNavigate();
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState<number | string | undefined>();

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.Role),
      });

    const queryClient = useQueryClient();

    // *************** C R U D ***************
    const handleAddClick = () => {
        const PATH_PREFIX = import.meta.env.VITE_PATH_PREFIX;
        navigate(`${PATH_PREFIX}/hr/roles/all-roles/route-permission/add-role`);
    }

    const handleEdit = (row) => {
        const PATH_PREFIX = import.meta.env.VITE_PATH_PREFIX;
        navigate(`${PATH_PREFIX}/hr/roles/all-roles/route-permission/${row.id}`);
    }

    const handleDelete = async (row) => {
        setDeleteId(row?.id);
        setOpenConfirmDialog(true);
    }

    const handleDeleteConfirm = async () => {
        const response = await roleService.deleteRole(deleteId!);
        if (response?.data?.status?.code) {
            setOpenConfirmDialog(false);
            queryClient.invalidateQueries({ queryKey: ["getAllRoles"] })
            toast.success(response?.data?.status?.message);
        } else {
            toast.error(response?.data?.status?.message);
        }
    }

    // *********** Admin || HR || Employee **********
    const { data: AllRole, isLoading } = useQuery({
        queryKey: ["getAllRoles"],
        queryFn: async () => {
            const response = await roleService.getAllRole();
            return response?.data?.data;
        }
    })

    const columns = [
        { id: 'name', label: 'Name', },
        { id: 'updatedat', label: 'Updated At', },
        { id: 'actions', label: 'Actions', className: 'text-center' },
    ];

    const rows = AllRole?.map((row) => {
        return {
            id: row.id,
            name: row.name,
            updatedat: row?.updatedAt ? DateUTCToLocalDateTimeString(row?.updatedAt) : '',
        };
    })

    return (
        <>
            {permission?.canCreate && (
                <div className="add-role-btn">
                    <Button variant="contained" className="btn-primary" style={{ backgroundColor: " #024d81" }} onClick={handleAddClick}>
                        Add Role
                    </Button>
                </div>
            )}

            <Box className="white-box">
                <CustomShortingMuiTable
                    columns={columns}
                    rows={rows || []}
                    isEditAccess
                    isLoading={isLoading}
                    isEditAction
                    isDeleteAction
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    permission={permission || { canCreate: false, canRead: false, canUpdate: false, canDelete: false }}

                />
            </Box>

            <ConfirmDialog
                title="Delete Role"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={messages.RoleDeleteMsg}
                handleSuccess={handleDeleteConfirm}
            />
        </>


    )
}

export default Role