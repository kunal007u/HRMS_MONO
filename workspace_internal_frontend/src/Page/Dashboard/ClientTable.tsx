import React from 'react'
import CustomShortingMuiTable from '../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
const clientDummyData = [
    {
        id: 1,
        name: 'Client A',
        email: 'clientA@example.com',
        contact: '123-456-7890',
        projects: ['Project 1', 'Project 2'],
        status: 'Active',
    },
    {
        id: 2,
        name: 'Client B',
        email: 'clientB@example.com',
        contact: '098-765-4321',
        projects: ['Project 3'],
        status: 'Active',
    },
];
const ClientTable = () => {
    const columns = [
        { id: 'name', label: 'Name', },
        { id: 'email', label: 'Email', },
        { id: 'contact', label: 'Contact', },
        { id: 'projects', label: 'Projects', },
        { id: 'Status', label: 'Status', className: 'text-center' },
        { id: 'actions', label: 'Actions', },
    ];

    const rows = clientDummyData.map((row) => {
        return {
            name: row.name,
            email: row.email,
            contact: row.contact,
            projects: row.projects.join(", "),
            Status: row.status,
        };
    })

    return (
        <CustomShortingMuiTable columns={columns} rows={rows} isEditAccess isEditAction />
    )
}

export default ClientTable