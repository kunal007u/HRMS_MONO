import { Button } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Holiday } from '../../../Models/holidays/holidaysM';
import holidaysService from '../../../Services/holidays-service';
import ConfirmDialog from '../../../Shared/components/ConfirmDialog';
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import DialogForm from '../../../Shared/components/DialogForm';
import { Modules } from '../../../Shared/enums/modules';
import { getModulePermission } from '../../../utils/commanFunctions';
import AddHolidayForm from './AddHolidayForm';

const Holidays = () => {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

    const holidayRef = React.useRef(null);
    const queryClient = useQueryClient();

    const columns = [
        { id: 'index', label: 'S.No', width: 10, className: 'text-center' },
        { id: 'title', label: 'Title', width: 30, className: 'text-center' },
        { id: 'date', label: 'Holiday Date', width: 50, className: 'text-center' },
        { id: 'day', label: 'Day', width: 10, className: 'text-center' },
    ];

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.Holidays),
    });


    if (permission && (permission.canUpdate || permission.canDelete)) {
        columns.push({ id: 'actions', label: 'Actions', width: 10, className: 'text-center' });
    }

    const mapResponseToColumns = (res: Holiday, index: number) => {
        return {
            index: index + 1,
            id: res?.id,
            title: res?.title,
            date: res?.date,
            day: res?.day,
            actions: "actions"
        };
    }

    const { data: getAllHoliday } = useQuery<Holiday[] | []>({
        queryKey: ['getAllHolidayQueryKey'],
        queryFn: async () => {
            const response = await holidaysService.getHolidays();
            return response?.data?.data as Holiday[];
        }
    });

    const customResponse = Array.isArray(getAllHoliday) ? getAllHoliday.map(mapResponseToColumns) : [];

    const handleEdit = (row) => {
        setOpenDialog(true)
        holidayRef.current = row;
    }

    const handleDelete = (row) => {
        setOpenConfirmDialog(true);
        holidayRef.current = row;
    }

    const handleConfirmDelete = async () => {
        if (holidayRef.current) {
            const holidayId = (holidayRef.current as { id: string }).id;
            await holidaysService.deleteHoliday(holidayId)
                .then((res) => {
                    toast.success(res?.data?.status?.message);
                    setOpenConfirmDialog(false);
                    holidayRef.current = null;
                    queryClient?.invalidateQueries({ queryKey: ['getAllHolidayQueryKey'] });
                })
        }
    }

    return (
        <>
            <section>
                {permission?.canCreate && (
                    <div className="add-btn-container">
                        <div className="add-btn d-flex justify-end" >
                            <Button className="btn btn-primary" onClick={() => setOpenDialog(true)}>
                                <span> <FaPlus style={{ marginRight: "5px" }} /> Add Holiday</span>
                            </Button>
                        </div>
                    </div>
                )}
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
                />
            </div>

            <ConfirmDialog
                title="Delete Holiday"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={"Are you sure you want Out?"}
                handleSuccess={() => handleConfirmDelete()}
            />
            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Add Holiday"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => {
                    setOpenDialog(false)
                    holidayRef.current = null
                }}
                bodyContent={<AddHolidayForm holidayRef={holidayRef.current} setOpenDialog={setOpenDialog} />}
            />
        </>
    )
}

export default Holidays