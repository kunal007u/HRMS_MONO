import { Button } from '@mui/material';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import DialogForm from '../../../Shared/components/DialogForm';
import AddGoalForm from './AddGoalForm';
import "./goals.css";

const dummyData = [
    {
        quarter: "Quarter 1",
        goal: "Goal 1",
        reamrks: "Remarks 1",
    },
    {
        quarter: "Quarter 1",
        goal: "Goal 1",
        reamrks: "Remarks 1",
    },
]
const Goals = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [isSwitchTrue, setIsSwitchTrue] = React.useState(false);

    const columns = [
        { id: 'index', label: 'S.No', className: 'text-center' },
        { id: 'quarter', label: 'Quarter',  className: 'text-center' },
        { id: "goal", label: "Goal",  className: "text-center" },
        { id: 'switches', label: 'Status',  className: 'text-center' },
        { id: "reamrks", label: "Remarks",  className: "text-center" },
        { id: 'actions', label: 'Actions',  className: 'text-center' }
    ];

    const mapResponseToColumns = (res: any, index: number) => {
        return {
            index: index + 1,
            quarter: res?.quarter,
            goal: res?.goal,
            reamrks: res?.reamrks,
        };

    };

    const customResponse = dummyData?.map(mapResponseToColumns);

    const handleSwitchChange = (e: any, row: any) => {
        // need to send the row id and the switch value to the api
        const isChecked = e.target.checked;
        const rowId = row.id;
    }
    const handleEditClick = (row: any) => {

    }
    return (
        <>
            <section className='goals'>
                <div className="goals-container">
                    <div className="add-goal-btn d-flex justify-end" >
                        <Button className="btn btn-primary" onClick={() => setOpenDialog(true)}>
                            <span> <FaPlus style={{ marginRight: "5px" }} /> Add Goal </span>
                        </Button>
                    </div>
                </div>
            </section>
            <section className="white-box mt-1">
                <CustomShortingMuiTable
                    columns={columns}
                    rows={customResponse}
                    isEditAccess={true}
                    
                    onSwitchChange={handleSwitchChange}
                    isEditAction={true}
                    onEdit={handleEditClick}
                />
            </section>
            <DialogForm
                scroll="body"
                maxWidth="lg"
                title="Add Goal"
                className='goals-dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => setOpenDialog(false)}
                bodyContent={<AddGoalForm />}
            />
        </>


    )
}

export default Goals