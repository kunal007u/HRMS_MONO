// import { Avatar, AvatarGroup, Button, MenuItem, Popover } from '@mui/material'
// import { Field, Formik } from 'formik'
// import React from 'react'
// import { BsThreeDotsVertical } from "react-icons/bs"
// import { Form, useNavigate } from 'react-router-dom'
// import FormikInput from '../../../Shared/formik-fields/FormikInput'
// import FormikSelect from '../../../Shared/formik-fields/FormikSelect'
// import './allprojects.css'
// import { FaPlus } from 'react-icons/fa'
// import DialogForm from '../../../Shared/components/DialogForm'
// import AddProjectForm from './AddProjectForm'

// const dummyData = [
//     {
//         id: 1,
//         name: 'Project A',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
//         deadline: '2022-12-31',
//         projectLeader: 'John Doe',
//         leaderImg: 'https://dummyimage.com/300x300/000/fff&text=User+Image',
//         team: 'John Doe, Jane Doe',
//         openTasks: 1,
//         completedTasks: 9,
//     },
//     {
//         id: 2,
//         name: 'Project B',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
//         deadline: '2023-06-30',
//         projectLeader: 'Jane Doe',
//         leaderImg: 'https://dummyimage.com/300x300/000/fff&text=User+Image',
//         team: 'Jane Doe, Bob Smith',
//         openTasks: 2,
//         completedTasks: 8,
//     },
//     {
//         id: 3,
//         name: 'Project C',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
//         deadline: '2024-03-31',
//         projectLeader: 'Bob Smith',
//         leaderImg: 'https://dummyimage.com/300x300/000/fff&text=User+Image',
//         team: 'Bob Smith, Alice Johnson',
//         openTasks: 0,
//         completedTasks: 10,
//     },
//     {
//         id: 4,
//         name: 'Project C',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
//         deadline: '2024-03-31',
//         projectLeader: 'Bob Smith',
//         leaderImg: 'https://dummyimage.com/300x300/000/fff&text=User+Image',
//         team: 'Bob Smith, Alice Johnson',
//         openTasks: 0,
//         completedTasks: 10,
//     },
//     {
//         id: 5,
//         name: 'Project C',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
//         deadline: '2024-03-31',
//         projectLeader: 'Bob Smith',
//         leaderImg: 'https://dummyimage.com/300x300/000/fff&text=User+Image',
//         team: 'Bob Smith, Alice Johnson',
//         openTasks: 0,
//         completedTasks: 10,
//     },
// ];
// const AllProjects = () => {
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [openDialog, setOpenDialog] = React.useState(false)

//     const [values, setValues] = React.useState({
//         projectName: '',
//         employeeName: '',
//         designation: '',
//     });

//     const navigate = useNavigate();

//     const fetchProjectById = (id: number) => {
//         const PATH_PREFIX = import.meta.env.VITE_PATH_PREFIX;
//         navigate(`${PATH_PREFIX}/projects/all-projects/${id}`);
//     }

//     const handleEdit = () => {
//         console.log("edit");

//     }
//     const handleDelete = () => {
//         console.log("delete");
//     }
//     const handleClick = (event: any) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <>
//             <section className="all-project">
//                 <div className="single-project">
//                     <div className="all-project-container">
//                         <div className="add-project-btn d-flex justify-end" >
//                             <Button className="btn btn-primary" onClick={() => setOpenDialog(true)}>
//                                 <span> <FaPlus style={{ marginRight: "5px" }} />Add Project</span>
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="filters-row mt-1">
//                     <Formik
//                         initialValues={{
//                             projectName: '',
//                             employeeName: '',
//                             designation: '',
//                         }}
//                         onSubmit={(values) => {
//                             setValues(values);
//                         }}
//                         onReset={() => {
//                             setValues({
//                                 projectName: '',
//                                 employeeName: '',
//                                 designation: '',
//                             });
//                         }}
//                     >
//                         {({ values, setFieldValue, handleReset }) => {
//                             return (
//                                 <Form className="project-filter-form-container ">
//                                     <div className="project-filter-form-content">
//                                         <div className="project-name content-box">
//                                             <Field
//                                                 placeholder="Project Name"
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="projectName"
//                                                 name="projectName"
//                                                 value={values?.projectName}
//                                                 component={FormikInput}
//                                                 onChange={(e: any) => {
//                                                     setValues({
//                                                         ...values,
//                                                         projectName: e.target.value
//                                                     });
//                                                     setFieldValue("projectName", e.target.value);
//                                                 }}
//                                             />
//                                         </div>
//                                         <div className="employee-name content-box">
//                                             <Field
//                                                 placeholder="Employee Name"
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="employeeName"
//                                                 name="employeeName"
//                                                 value={values?.employeeName}
//                                                 component={FormikInput}
//                                                 onChange={(e: any) => {
//                                                     setValues({
//                                                         ...values,
//                                                         employeeName: e.target.value
//                                                     });
//                                                     setFieldValue("employeeName", e.target.value);
//                                                 }}
//                                             />
//                                         </div>
//                                         <div className="custom-select content-box">
//                                             <Field
//                                                 placeholder="Designation"
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="designation"
//                                                 name="designation"
//                                                 value={values?.designation}
//                                                 options={[
//                                                     { value: 1, title: "Software Engineer" },
//                                                     { value: 2, title: "Senior Software Engineer" },
//                                                     { value: 3, title: "Team Lead" },
//                                                 ]}
//                                                 component={FormikSelect}
//                                                 onChange={(e: any) => {
//                                                     setValues({
//                                                         ...values,
//                                                         designation: e.target.value
//                                                     });
//                                                     setFieldValue("designation", e.target.value);
//                                                 }}
//                                             />
//                                         </div>
//                                         <div className="search-btn content-box" onClick={handleReset}>
//                                             <Button className="btn btn-primary" style={{ backgroundColor: "#8e97a2 !important" }} type="submit">
//                                                 <span>Clear</span>
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </Form>
//                             )
//                         }}
//                     </Formik>
//                 </div>
//                 <div className="employee-boxes mt-1">
//                     <div className="employee-box-content">
//                         {
//                             dummyData?.map((project) => {
//                                 return (
//                                     <div className="relative white-box" key={project.id} >
//                                         <div className="dropdown profile-action" onClick={(e) => handleClick(e)} >
//                                             <BsThreeDotsVertical />
//                                         </div>
//                                         <div className="main-box" >
//                                             <div className="main-heading" onClick={() => fetchProjectById(project.id)} style={{ cursor: "pointer" }}>
//                                                 <h3 >{project.name}</h3>
//                                                 <small className="text-muted">
//                                                     {project.openTasks} open tasks, {project.completedTasks} tasks completed
//                                                 </small>
//                                             </div>
//                                             <div className="description text-muted">
//                                                 <p>{project.description}</p>
//                                             </div>
//                                             <div className="deadline">
//                                                 <h3>Deadline:</h3>
//                                                 <small className='text-muted'>
//                                                     <strong>
//                                                         {project.deadline}
//                                                     </strong>
//                                                 </small>
//                                             </div>
//                                             <div className="project-leader">
//                                                 <h3>Project Leader:</h3>
//                                                 <Avatar alt="John Doe" src="https://dummyimage.com/600x400/a854a8/2d3063.png" />
//                                             </div>
//                                             <div className="team-member">
//                                                 <h3>Team:</h3>
//                                                 <div className="">
//                                                     <AvatarGroup max={4} style={{ flexDirection: "row" }}>
//                                                         <Avatar alt="John Doe" src="https://dummyimage.com/300x300/000/fff&text=User+Image" />
//                                                         <Avatar alt="Jane Doe" src="https://dummyimage.com/300x300/000/fff&text=User+Image" />
//                                                         <Avatar alt="Bob Smith" src="https://dummyimage.com/300x300/000/fff&text=User+Image" />
//                                                     </AvatarGroup>

//                                                 </div>
//                                             </div>
//                                         </div>

//                                     </div>
//                                 );
//                             })
//                         }
//                     </div>
//                 </div>
//             </section>

//             <Popover
//                 open={Boolean(anchorEl)}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center',
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center',
//                 }}
//             >
//                 <div className="d-flex direction-column gap-1" style={{ width: "150px", padding: "10px" }}>
//                     <MenuItem onClick={handleEdit} className='btn' >Edit </MenuItem>
//                     <MenuItem onClick={handleDelete} className='btn-secondary'>Delete</MenuItem>
//                 </div>
//             </Popover>

//             <DialogForm
//                 scroll="body"
//                 maxWidth="md"
//                 title="Add Project"
//                 className='dialog-form'
//                 openDialog={openDialog}
//                 handleDialogClose={() => setOpenDialog(false)}
//                 bodyContent={<AddProjectForm  />}

//             />
//         </>
//     )
// }

// export default AllProjects

import { Button } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { IAllProject } from '../../../Models/projects'
import projectService from '../../../Services/project-service'
import ConfirmDialog from '../../../Shared/components/ConfirmDialog'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import DialogForm from '../../../Shared/components/DialogForm'
import { Modules } from '../../../Shared/enums/modules'
import { getModulePermission } from '../../../utils/commanFunctions'
import AddProjectForm from './AddProjectForm'
import './allprojects.css'

const AllProjects = () => {
    const [openDialog, setOpenDialog] = React.useState(false)
    const [rows, setRows] = React.useState(null)
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false)
    const queryClient = useQueryClient();

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.AllProjects),
    });

    const columns = [
        { id: 'index', label: 'S.No', className: 'text-center' },
        { id: 'projectName', label: 'Project Name', className: 'text-center' },
        { id: 'startDate', label: 'Start Date', className: 'text-center' },
        { id: 'endDate', label: 'End Date', className: 'text-center' },
        { id: 'projectManager', label: 'Project Manager', className: 'text-center' },
        { id: 'description', label: 'Description', className: 'text-center' },
    ];


    if (permission && (permission.canUpdate || permission.canDelete)) {
        columns.push({ id: 'actions', label: 'Actions', className: 'text-center' });
    }

    const deleteProjectMutation = useMutation({
        mutationFn: (value: string) => projectService.deleteProject(value),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllProjects'] });
                setOpenDialog(false);
                setRows(null);
                toast.success(data?.data?.status.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const { data: getAllProjects } = useQuery({
        queryKey: ["getAllProjects"],
        queryFn: async () => {
            const response = await projectService.getAllProjects();
            return response?.data?.data as IAllProject[];
        },
        enabled: permission?.canRead
    });

    const mapResponseToColumns = (res, index: number) => {
        return {
            index: index + 1,
            id: res?.id,
            projectName: res.projectName,
            startDate: res.startDate,
            endDate: res.endDate,
            projectManager: res.projectManager,
            description: res.description,
            managerId: res.managerId,
        };
    };

    const customResponse = getAllProjects?.map(mapResponseToColumns);

    const handleEdit = (row) => {
        console.log(row, "edit");
        setOpenDialog(true)
        setRows && setRows(row)

    }
    const handleDelete = (row) => {
        setRows && setRows(row)
        setOpenConfirmDialog(true)
    }

    const handleDeleteProject = () => {
        if (rows) {
            setOpenConfirmDialog(false)
            deleteProjectMutation.mutate(rows.id);
        }
    }

    return (
        <>
            <section className="all-project ">
                <div className="single-project mb-1">
                    <div className="all-project-container">
                        <div className="add-project-btn d-flex justify-end" >
                            <Button className="btn btn-primary" onClick={() => setOpenDialog(true)}>
                                <span> <FaPlus style={{ marginRight: "5px" }} />Add Project</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='white-box'>
                    <CustomShortingMuiTable
                        columns={columns}
                        rows={customResponse}
                        
                        permission={permission}
                        isEditAction={true}
                        isDeleteAction={true}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

            </section>

            <DialogForm
                scroll="body"
                maxWidth="md"
                title={rows ? "Edit Project" : "Add Project"}
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => {
                    setRows(null)
                    setOpenDialog(false)
                }}
                bodyContent={<AddProjectForm rows={rows} setOpenDialog={setOpenDialog} setRows={setRows} />}
            />

            <ConfirmDialog
                title="Delete Project"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={"Are you sure you want to delete this project?"}
                handleSuccess={() => handleDeleteProject()}
            />

        </>
    )
}

export default AllProjects