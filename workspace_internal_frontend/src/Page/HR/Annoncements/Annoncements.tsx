import { Button } from '@mui/material'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import DialogForm from '../../../Shared/components/DialogForm'
import { DateTimeToDateString } from '../../../utils/dateFormat'
import AddAnnouncementForm from './AddAnnouncementForm'
import "./annoncements.css"

const dummyData = [
    {
        title: "New Office Opening",
        message: "We are excited to announce the opening of our new office in downtown.",
        department: "HR",
        startDate: "2022-01-01",
        endDate: "2022-01-31",
        priority: "High",
        tags: ["office", "opening"],
        attachments: ["attachment1.pdf", "attachment2.jpg"]
    },
    {
        title: "Holiday Schedule",
        message: "Please find the holiday schedule for the upcoming year attached.",
        department: "Admin",
        startDate: "2022-12-01",
        endDate: "2023-01-01",
        priority: "Medium",
        tags: ["holidays", "schedule"],
        attachments: ["holiday_schedule.pdf"]
    }
];
const Annoncements = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    
    const columns = [
        { id: 'index', label: 'S.No', className: 'text-center' },
        { id: 'title', label: 'Title', },
        { id: 'message', label: 'Message', width: "20%" },
        { id: 'department', label: 'Department', className: 'text-center' },
        { id: 'startDate', label: 'Start Date', className: 'text-center' },
        { id: 'endDate', label: 'End Date', className: 'text-center' },
        { id: 'priority', label: 'Priority', className: 'text-center' },
        { id: 'tags', label: 'Tags', className: 'text-center' },
        { id: 'actions', label: 'Attachments', className: 'text-center' },
    ];

    const rows = dummyData.map((row,index:number) => {
        return {
            index: index + 1,
            title: row.title,
            message: row.message,
            department: row.department,
            startDate: DateTimeToDateString(row.startDate),
            endDate: DateTimeToDateString(row.endDate),
            priority: row.priority,
            tags: row.tags.join(", "),
        };
    });

    const handleview = (row: any) => {
        console.log(row);
    };

    const handleEdit = (row: any) => {
        console.log(row);
    };

    const handleDelete = (row: any) => {
        console.log(row);
    };

    return (
        <>
            <section className='announcement'>
                <div className="announcement-container">
                    <div className="add-announcement-btn d-flex justify-end" >
                        <Button className="btn btn-primary" onClick={() => setOpenDialog(true)}>
                            <span>Add Announcement <span><FaPlus  /></span></span>
                        </Button>
                    </div>
                </div>
                <div className="white-box mt-1">
                    <CustomShortingMuiTable
                        columns={columns}
                        rows={rows}
                        isViewAction={true}
                        onView={handleview}
                        isEditAction={true}
                        onEdit={handleEdit}
                        isDeleteAction={true}
                        onDelete={handleDelete}
                    />
                </div>
            </section>
            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Add Annoncements"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => setOpenDialog(false)}
                bodyContent={<AddAnnouncementForm />}
            />
        </>

    )
}

export default Annoncements