import { Avatar, Button, Chip } from '@mui/material'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DialogForm from '../../../Shared/components/DialogForm'
import AddProjectForm from './AddProjectForm'
import "./allprojects.css"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DateTimeToDateString } from '../../../utils/dateFormat'
import { Line } from 'rc-progress'
import "../Tasks/tasks.css";
import CreateTaskForm from '../Tasks/CreateTaskForm'
import { getModulePermission } from '../../../utils/commanFunctions'
import { Modules } from '../../../Shared/enums/modules'
import { FaClock, FaFilePdf, FaPlus } from 'react-icons/fa'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { IRoleRoutePermissionModel } from '../../../Models/role'

const dummayData = [

    {
        TitleOfTheProject: "Product Launch for XYZ Corporation",
        OpenTasks: 15,
        CompletedTasks: 5,
        BriefDescription: "The project involves planning and executing the launch of our new product line, including market research, production, and marketing strategies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at.",
        UploadedImages: [
            "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg",
            "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg",
            "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg",
            "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg",
            "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg",
        ],
        UploadedFiles: [
            {
                FileName: "Project Plan (PDF)",
                FileAuthor: "John Doe",
                Size: "2.5 MB",
                UploadedDate: "2023-04-15"
            },
            {
                FileName: "Project Plan (PDF)",
                FileAuthor: "John Doe",
                Size: "2.5 MB",
                UploadedDate: "2023-04-15"
            },
            {
                FileName: "Project Plan (PDF)",
                FileAuthor: "John Doe",
                Size: "2.5 MB",
                UploadedDate: "2023-04-15"
            },
        ],
        ProjectDetails: {
            Cost: "$500,000",
            TotalHours: "2,000 hours",
            CreatedDate: "2023-03-10",
            Deadline: "2023-09-30",
            Priority: "High",
            CreatedBy: "John Doe",
            Status: "In Progress",
            ProgressInPercentage: "35%"
        },
        AssignedLeader: [
            {
                Name: "John Doe",
                Image: "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg"
            },
            {
                Name: "John Doe",
                Image: "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg"
            },

        ],

        AssignedTeam: [
            {
                Name: "John Doe",
                Image: "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg"
            },
            {
                Name: "John Doe",
                Image: "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg"
            },
            {
                Name: "John Doe",
                Image: "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg"
            },
            {
                Name: "John Doe",
                Image: "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg"
            },
            {
                Name: "John Doe",
                Image: "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg"
            },
            {
                Name: "John Doe",
                Image: "https://smarthr.dreamguystech.com/html/template/assets/img/placeholder.jpg"
            },

        ]
    }

]

const dummyTasks = [
    {
        allTasks: [
            {

                taskName: "Task 1",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at.",
                taskStatus: "In Progress",
                taskPriority: "High",
                taskProgress: "35%",
                taskDeadline: "2023-09-30",
                taskAssignedTo: "John Doe",
                taskAssignedBy: "John Doe",
                isTaskDone: false,
                taskCreatedDate: "2023-03-10",
                taskCompletedDate: "2023-03-10",
                taskFiles: [
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                ]
            },
            {

                taskName: "Task 2",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at.",
                taskStatus: "In Progress",
                taskPriority: "High",
                taskProgress: "35%",
                taskDeadline: "2023-09-30",
                taskAssignedTo: "John Doe",
                taskAssignedBy: "John Doe",
                isTaskDone: true,
                taskCreatedDate: "2023-03-10",
                taskCompletedDate: "2023-03-10",
                taskFiles: [
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                ]
            }
        ],
        pendingTasks: [
            {

                taskName: "Task 1",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at.",
                taskStatus: "In Progress",
                taskPriority: "High",
                taskProgress: "35%",
                taskDeadline: "2023-09-30",
                taskAssignedTo: "John Doe",
                taskAssignedBy: "John Doe",
                taskCreatedDate: "2023-03-10",
                isTaskDone: false,
                taskCompletedDate: "2023-03-10",
                taskFiles: [
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                ]
            },
            {

                taskName: "Task 1",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at.",
                taskStatus: "In Progress",
                taskPriority: "High",
                taskProgress: "35%",
                taskDeadline: "2023-09-30",
                taskAssignedTo: "John Doe",
                taskAssignedBy: "John Doe",
                isTaskDone: false,
                taskCreatedDate: "2023-03-10",
                taskCompletedDate: "2023-03-10",
                taskFiles: [
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                ]
            },

        ],
        completedTasks: [
            {

                taskName: "Task 1",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at.",
                taskStatus: "In Progress",
                taskPriority: "High",
                taskProgress: "35%",
                taskDeadline: "2023-09-30",
                isTaskDone: true,
                taskAssignedTo: "John Doe",
                taskAssignedBy: "John Doe",
                taskCreatedDate: "2023-03-10",
                taskCompletedDate: "2023-03-10",
                taskFiles: [
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                ]
            },
            {

                taskName: "Task 1",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at.",
                taskStatus: "In Progress",
                taskPriority: "High",
                taskProgress: "35%",
                taskDeadline: "2023-09-30",
                isTaskDone: true,
                taskAssignedTo: "John Doe",
                taskAssignedBy: "John Doe",
                taskCreatedDate: "2023-03-10",
                taskCompletedDate: "2023-03-10",
                taskFiles: [
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                ]
            },
        ],
        overDueTasks: [
            {

                taskName: "Task 1",
                taskDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at.",
                taskStatus: "In Progress",
                taskPriority: "High",
                taskProgress: "35%",
                isTaskDone: true,

                taskDeadline: "2023-09-30",
                taskAssignedTo: "John Doe",
                taskAssignedBy: "John Doe",
                taskCreatedDate: "2023-03-10",
                taskCompletedDate: "2023-03-10",
                taskFiles: [
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                    {
                        FileName: "Project Plan (PDF)",
                        FileAuthor: "John Doe",
                        Size: "2.5 MB",
                        UploadedDate: "2023-04-15"
                    },
                ]
            },
        ]
    }
]

const initialTasks = {
    todo: [
        { id: '1', name: 'Task 1', priority: 'High', deadLine: "2023-09-30", process: "35" },
        { id: '2', name: 'Task 2', priority: 'High', deadLine: "2023-09-30", process: "32" },
    ],
    inProgress: [
        { id: '3', name: 'Task 3', priority: 'Medium', deadLine: "2023-09-30", process: "35" },
        { id: '4', name: 'Task 4', priority: 'Medium', deadLine: "2023-09-30", process: "30" },

    ],
    testing: [
        { id: '5', name: 'Task 3', priority: 'Medium', deadLine: "2023-09-30", process: "35" },
        { id: '6', name: 'Task 6', priority: 'Medium', deadLine: "2023-09-30", process: "70" },
    ],
    done: [
        { id: '7', name: 'Task 5', priority: 'Medium', deadLine: "2023-09-30", process: "36" },
    ],
    reOpen: [
        { id: '9', name: 'Task 5', priority: 'Medium', deadLine: "2023-09-30", process: "36" },
    ],
};

type DroppableId = 'todo' | 'inProgress' | 'testing' | 'done' | 'reOpen';
interface SourceDestination {
    droppableId: DroppableId;
    index: number;
}

const SingleProject = () => {
    const { id } = useParams<{ id: string }>()
    const [createTaskOpenDialog, setCreateTaskOpenDialog] = React.useState(false)
    const [tasks, setTasks] = React.useState(initialTasks);

    let backgroundColor;

    // const { data: employeeDetail } = useQuery(
    //     ['employeeDetailById', id],
    //     async () => {
    //         const res = await personalDetailService.getPersonalDetailById(id);
    //         return res?.data?.data as AllEmployeeDetails;
    //     },
    //     {
    //         retry: false,
    //         staleTime: 5000,
    //         onSuccess: (data) => data,
    //         onError: (error: Error) => {
    //             toast.error(error?.message);
    //         },
    //     }
    // );
    // const { employee } = employeeDetail || {};

    const projectDetail = id

    function onDragEnd(result: { source: SourceDestination, destination: SourceDestination }) {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            const sourceTasks = [...tasks[source.droppableId]];
            const destTasks = [...tasks[destination.droppableId]];
            const [removed] = sourceTasks.splice(source.index, 1);
            destTasks.splice(destination.index, 0, removed);

            const updatedTasks = {
                ...tasks,
                [source.droppableId]: sourceTasks,
                [destination.droppableId]: destTasks,
            };

            setTasks(updatedTasks);
        } else {
            const taskList = [...tasks[source.droppableId]];
            const [removed] = taskList.splice(source.index, 1);
            taskList.splice(destination.index, 0, removed);

            const updatedTasks = {
                ...tasks,
                [source.droppableId]: taskList,
            };

            setTasks(updatedTasks);

        }
    }

    return (
        <>
          
            <div className="signle-project-main-content mt-1">
                {
                    dummayData.map((data, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="signle-project-left-side">
                                    <div className="white-box single-project-info-card">
                                        <div className="card-title">
                                            <h4>{data?.TitleOfTheProject}</h4>
                                            <small className="text-muted">
                                                {data.OpenTasks} open tasks, {data.CompletedTasks} tasks completed
                                            </small>
                                        </div>
                                        <p className='card-description'>
                                            {data.BriefDescription}
                                        </p>
                                    </div>

                                    <div className="white-box single-project-img-card mt-1">
                                        <div className="card-title">
                                            <h4>Uploaded image files</h4>
                                        </div>
                                        <div className="images-box">
                                            {
                                                data.UploadedImages.map((image, index) => {
                                                    return (
                                                        <div className="single-image" key={index}>
                                                            <img src={image} alt="" />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="white-box single-project-files-card mt-1 mb-1">
                                        <div className="card-title">
                                            <h4>Uploaded files</h4>
                                        </div>
                                        <ul className="files-list">
                                            {
                                                data.UploadedFiles.map((file, index) => {
                                                    return (
                                                        <li className='file-li' key={index}>
                                                            <div className="files-count">
                                                                <div className="file-type">
                                                                    <span className='files-icon'>
                                                                        <FaFilePdf />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="file-info ">
                                                                <span className="file-name text-elipsis">
                                                                    {file.FileName}
                                                                </span>
                                                                <small className="file-autor">
                                                                    {file.FileAuthor}
                                                                    <span>{file.UploadedDate}</span>
                                                                </small>

                                                                <small>{file.Size}</small>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>


                                </div>
                                <div className="signle-project-right-side">
                                    <div className="white-box">
                                        <div className="card-title">
                                            <h4>Project details</h4>
                                            <table className="single-project-table">
                                                <tbody>
                                                    <tr>
                                                        <td>Cost</td>
                                                        <td>{data.ProjectDetails.Cost}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Hours</td>
                                                        <td>{data.ProjectDetails.TotalHours}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Created Date</td>
                                                        <td>{data.ProjectDetails.CreatedDate}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Deadline</td>
                                                        <td>{data.ProjectDetails.Deadline}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Priority</td>
                                                        <td>{data.ProjectDetails.Priority}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Created By</td>
                                                        <td>{data.ProjectDetails.CreatedBy}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Status</td>
                                                        <td>{data.ProjectDetails.Status}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Progress</td>
                                                        <td>{data.ProjectDetails.ProgressInPercentage}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="white-box mt-1">
                                        <div className="card-title d-flex item-center justify-between">
                                            <h4>Assigned Leader</h4>
                                            <Button className='btn add-btn'>
                                                <span> <FaPlus style={{ marginRight: "5px" }} />Add</span>
                                            </Button>
                                        </div>
                                        <ul className="assigned-leader">
                                            <li >
                                                {
                                                    data.AssignedLeader.map((leader, index) => {
                                                        return (
                                                            <Link to={"#"} style={{ color: 'black', textDecoration: "none" }} key={index} >
                                                                <div className="list-item mt-1" >

                                                                    <div className="list-left">
                                                                        <Avatar src={leader.Image} alt="" />
                                                                    </div>
                                                                    <div className="list-right">
                                                                        <h5>{leader.Name}</h5>
                                                                        <small>Team Leader</small>
                                                                    </div>
                                                                </div>

                                                            </Link>
                                                        )
                                                    })
                                                }

                                            </li>

                                        </ul>
                                    </div>
                                    <div className="white-box mt-1">
                                        <div className="card-title d-flex item-center justify-between">
                                            <h4>Assigned Team</h4>
                                            <Button className='btn add-btn'>
                                                <span><FaPlus style={{ marginRight: "5px" }} /> Add</span>
                                            </Button>
                                        </div>
                                        <ul className="assigned-leader">
                                            <li >
                                                {
                                                    data.AssignedTeam.map((leader, index) => {
                                                        return (
                                                            <Link to={"#"} style={{ color: 'black', textDecoration: "none" }} key={index} >
                                                                <div className="list-item mt-1" >

                                                                    <div className="list-left">
                                                                        <Avatar src={leader.Image} alt="" />
                                                                    </div>
                                                                    <div className="list-right">
                                                                        <h5>{leader.Name}</h5>
                                                                        <small>Team Leader</small>
                                                                    </div>
                                                                </div>

                                                            </Link>
                                                        )
                                                    })
                                                }

                                            </li>

                                        </ul>

                                    </div>
                                </div>


                            </React.Fragment>

                        )

                    })
                }

            </div>
            <div className="single-project">
                <div className="all-project-container">
                    <div className="add-project-btn d-flex justify-end" >
                        <Button className="btn btn-primary" onClick={() => setCreateTaskOpenDialog(true)}>
                            <span>  <FaPlus style={{ marginRight: "5px" }} />Create Task</span>
                        </Button>
                    </div>
                </div>
            </div>
            <section className="drag-drop mt-1 white-box">

                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.entries(tasks).map(([state, tasks]) => {

                        let isDraggable;
                        function getBackgroundColor(state: string, isDraggable?: boolean): string {
                            switch (state) {
                                case "todo":
                                    return isDraggable ? "#fef7f6" : "#ef5350";
                                case "inProgress":
                                    return isDraggable ? "#e6f3fe" : "#42a5f5";
                                case "testing":
                                    return isDraggable ? "#fdfcf3" : "#ffb300";
                                case "done":
                                    return isDraggable ? "#edf7ee" : "#4caf50";
                                default:
                                    return isDraggable ? "#f1effd" : "gray";
                            }
                        }

                        return (
                            <div key={state} style={{ width: "25%" }}>
                                <div
                                    className={`d-flex justify-between item-center drag-drop-title `}
                                    style={{ backgroundColor: getBackgroundColor(state, isDraggable = false), padding: "10px" }}
                                >
                                    <span>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
                                    <FaEllipsisVertical />
                                </div>
                                <Droppable droppableId={state}>
                                    {(provided: any) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className='drag-drop-list'
                                            style={{
                                                backgroundColor: getBackgroundColor(state, isDraggable = true),
                                                minHeight: '50px'
                                            }}
                                        >
                                            {tasks.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provide: any) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className='drag-drop-item'
                                                        >
                                                            <div className="drag-drop-box ">
                                                                <div className="first-row mb-1">
                                                                    <div>
                                                                        {task.name}
                                                                    </div>
                                                                    <div>
                                                                        <FaEllipsisVertical />
                                                                    </div>
                                                                </div>
                                                                <div className="progress-bar second-row">
                                                                    <Line percent={Number(task.process)} strokeWidth={2} strokeColor={`${state === "pending" ? "#ef5350" : state === "onBoard" ? "#42a5f5" : state === "complete" ? "#4caf50" : "#ffb300"}`} />
                                                                    <small className='text-muted'>
                                                                        {`${task.process}%`}
                                                                    </small>
                                                                </div>
                                                                <div className="third-row d-flex item-center" style={{ gap: "10px" }}>
                                                                    <FaClock style={{ color: "gray" }} />
                                                                    <small className='text-muted'>
                                                                        {DateTimeToDateString(task.deadLine)}
                                                                    </small>
                                                                </div>
                                                                <div className="forth-row">
                                                                    <Chip
                                                                        label={task.priority}
                                                                        style={{
                                                                            backgroundColor: `${task?.priority === "High" ? "rgba(242,17,54,.12)" : task?.priority === "Medium" ? "rgba(255,152,0,.12)" : "rgba(15,183,107,.12)"}`,
                                                                            color: `${task?.priority === "High" ? "#e63c3c" : task?.priority === "Medium" ? "#f39c12" : "#26af48"}`,
                                                                        }} />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                    }
                                </Droppable>
                            </div>
                        )
                    }

                    )}
                </DragDropContext >
            </section>

      

            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Create Task"
                className='dialog-form'
                openDialog={createTaskOpenDialog}
                handleDialogClose={() => setCreateTaskOpenDialog(false)}
                bodyContent={<CreateTaskForm />}
            />
        </>

    )
}

export default SingleProject