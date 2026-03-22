import { Accordion, AccordionDetails, AccordionSummary, Box, Popover } from '@mui/material'
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { DateTimeToDateStringWithDay, DateToDateStringWithDay } from '../../../utils/dateFormat'
import "./tasks.css"
import ConfirmDialog from '../../../Shared/components/ConfirmDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import taskService from '../../../Services/task-service'
import { toast } from 'react-toastify'
import CreateTaskForm from './CreateTaskForm'
import DialogForm from '../../../Shared/components/DialogForm'

const TaskAccordion = ({ task, setAnchorEl, setTaskRowRef, listType }: { task: ITask; setAnchorEl: React.Dispatch<React.SetStateAction<EventTarget & SVGElement | null>>; setTaskRowRef: (task: ITask | null) => void; listType: 'AssignedBy' | 'AssignedTo' }) => {

    const [isReadMore, setIsReadMore] = React.useState(true);

    const toggleReadMore = React.useCallback(() => {
        setIsReadMore((prevIsReadMore) => !prevIsReadMore);
    }, []);

    const renderTaskFiles = () => {
        if (task.taskFiles && task.taskFiles.length > 0) {
            return task.taskFiles.map((file: TaskFile, index) => (
                <div className="task-file" key={index}>
                    <a href={file.taskFiles} target="_blank" rel="noreferrer">{file.taskFiles}</a>
                </div>
            ));
        } else {
            return "No files attached";
        }
    };

    return (
        <div className='relative'>
            <Accordion>
                <AccordionSummary
                    // expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >

                    <div className="done-icon d-flex item-center gap-1 justify-between w-full relative"  >
                        <div className='d-flex align-center gap-1'>
                            <FaCheckCircle style={{ fontSize: "24px", color: `${task?.status === "Done" ? "green" : "gray"}`, filter: "drop-shadow(0px 0px 7px rgba(198, 202, 197, 0.967))" }} /> {task?.taskName}
                        </div>
                        <small className='text-muted mr-2 task-deadline'>
                            Deadline: {DateTimeToDateStringWithDay(task?.deadLine ?? "")}
                        </small>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="task-table">
                        <div className="white-box">
                            <div className="card-title">
                                <h4>task details</h4>
                                <table className="single-task-table mt-1">
                                    <tbody>
                                        <tr>
                                            <td>Task Assigned By</td>
                                            <td>{task?.taskAssignedByName}</td>
                                        </tr>
                                        <tr>
                                            <td>Task Assigned To</td>
                                            <td>{task?.taskAssignedToName}</td>
                                        </tr>
                                        <tr>
                                            <td>Task Status</td>
                                            <td>{task?.status}</td>
                                        </tr>
                                        <tr>
                                            <td>Task Priority</td>
                                            <td>{task?.taskPriority}</td>
                                        </tr>
                                        <tr>
                                            <td>Task Start Date</td>
                                            <td>{DateToDateStringWithDay(task?.taskCreatedDate!) ?? "-"}</td>
                                        </tr>
                                        <tr>
                                            <td>Task End Date</td>
                                            <td>{DateToDateStringWithDay(task?.taskCompletedDate!) ?? "-"}</td>
                                        </tr>
                                        <tr>
                                            <td>Task Description</td>
                                            <td>
                                                {isReadMore ? task?.taskDescription!.slice(0, 100) : task?.taskDescription}
                                                {task?.taskDescription!.length > 100 &&
                                                    <button onClick={toggleReadMore} style={{ color: "blue", cursor: "pointer", border: "none", background: "none", padding: "0" }}>
                                                        {isReadMore ? "...read more" : " show less"}
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Task Files</td>
                                            <td>
                                                {renderTaskFiles()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            {listType === 'AssignedBy' && task?.taskAssignedTo && <FaEllipsisVertical className='action-dots' style={{ color: '', fontSize: "20px" }} onClick={(e) => { setAnchorEl(e.currentTarget), setTaskRowRef(task) }} />}
        </div>
    );
};

interface AllTasksProps {
    allTasks: ITaskResponse | undefined;
}

const AllTasks: React.FC<AllTasksProps> = ({ allTasks }) => {

    const [anchorEl, setAnchorEl] = React.useState<EventTarget & SVGElement | null>(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [taskRowRef, setTaskRowRef] = React.useState<ITask | null>(null);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: any) => taskService.deleteTask(id),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['getAllTask'] });
            toast.success(res?.data?.status?.message);
        },
    });

    const handleDeleteTask = async () => {
        if (taskRowRef !== null) {
            deleteMutation.mutate(taskRowRef?.id);
            setOpenConfirmDialog(false);
            setTaskRowRef(null);
        }
    }

    return (
        <div className="alltask-tab mt-1">
            <div className="tab-contnet">
                {/* <h4>Task Section</h4> */}
                <ul className='tab-ul'>
                    <div className="tab-content">

                        {
                            allTasks?.taskAssignedBy && (
                                <li>
                                    <h3 className='mb-1'>Task Assigned By</h3>
                                    <ul>
                                        {allTasks?.taskAssignedBy.map((task: ITask, index) => (
                                            <li key={index} className='mb-1'>
                                                <TaskAccordion
                                                    task={task}
                                                    setAnchorEl={setAnchorEl}
                                                    setTaskRowRef={setTaskRowRef}
                                                    listType='AssignedBy'
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        }
                        {
                            allTasks?.taskAssignedTo && (
                                <li>
                                    <h3 className='mb-1'>Task Assigned to</h3>
                                    <ul>
                                        {allTasks?.taskAssignedTo.map((task: ITask, index) => (
                                            <li key={index} className='mb-1'>
                                                <TaskAccordion
                                                    task={task}
                                                    setAnchorEl={setAnchorEl}
                                                    setTaskRowRef={setTaskRowRef}
                                                    listType='AssignedTo'
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        }

                    </div>
                </ul>
            </div>
            <Popover
                id={Boolean(anchorEl) ? 'simple-popover' : undefined}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                    setAnchorEl(null);
                    const checkbox: any = document.getElementById('checkbox');
                    if (checkbox) {
                        checkbox.checked = false;
                    }
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 1 }} className="d-flex gap-1 direction-column">
                    <div className='flex gap-2 flex-col'>
                        <h4 className='edit-btn' onClick={() => setOpenDialog(true)}>Edit</h4>
                        <hr />
                        <h4 className='delete-btn' onClick={() => setOpenConfirmDialog(true)}>Delete</h4>
                    </div>
                </Box>


            </Popover>
            <ConfirmDialog
                title="Delete Task"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={"Are you sure you want delete this task?"}
                handleSuccess={() => handleDeleteTask()}
            />
            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Update Task"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => setOpenDialog(false)}
                bodyContent={<CreateTaskForm taskRowRef={taskRowRef} setOpenDialog={setOpenDialog} />}
            />
        </div >



    )
}


export default AllTasks