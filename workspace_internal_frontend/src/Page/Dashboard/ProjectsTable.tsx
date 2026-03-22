import React from 'react'
import CustomShortingMuiTable from '../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
const projectDummyData = [
    {
        id: 1,
        name: 'Project A',
        client: 'Client A',
        status: 'In Progress',
        deadline: '2022-12-31',
    },
    {
        id: 2,
        name: 'Project B',
        client: 'Client B',
        status: 'Completed',
        deadline: '2022-11-30',
    },
];

const ProjectsTable = () => {

    const columns = [
        { id: 'name', label: 'Name', },
        { id: 'client', label: 'Client', },
        { id: 'status', label: 'Status', },
        { id: 'deadline', label: 'Deadline', },
        { id: 'actions', label: 'Actions', className: 'text-center' },
    ];

    const rows = projectDummyData.map((row) => {
        return {
            name: row.name,
            client: row.client,
            status: row.status,
            deadline: row.deadline,
        };
    })

    return (
        <CustomShortingMuiTable columns={columns} rows={rows} isEditAccess isEditAction />
    )
}

export default ProjectsTable