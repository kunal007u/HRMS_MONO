import CustomShortingMuiTable from '../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'

const dummyData = [
    { id: 1, task: 'Task 1', person: 'Person 1', status: 'In Progress' },
    { id: 2, task: 'Task 2', person: 'Person 2', status: 'Completed' },
    { id: 3, task: 'Task 3', person: 'Person 3', status: 'Not Started' },
    { id: 4, task: 'Task 4', person: 'Person 4', status: 'In Progress' },
    { id: 5, task: 'Task 5', person: 'Person 5', status: 'Completed' },
];

const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'task', label: 'Task', minWidth: 170 },
    { id: 'person', label: 'Assigned To', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
];


const TaskTable = ({ selectedTask }) => {

    const rows = dummyData.map((row) => {
        return {
            id: row.id,
            task: row.task,
            person: row.person,
            status: row.status,
        };
    })
    
    return (
        <>
            <CustomShortingMuiTable columns={columns} rows={rows} isEditAccess isEditAction isPagination={false} />
        </>
    )
}

export default TaskTable