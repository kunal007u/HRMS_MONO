import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { Line } from "rc-progress";
import React from "react";
import { FaBullhorn } from 'react-icons/fa';
import { MdExpandMore } from "react-icons/md";
import { IStatusResponse } from '../../Models/dashboard/dashboardM';
import attendanceService from "../../Services/attendance-service";
import CustomBarChart from "../../Shared/components/CustomBarChart";
import CustomLineChart from "../../Shared/components/CustomLineChart";
import DialogForm from "../../Shared/components/DialogForm";
import { Modules } from "../../Shared/enums/modules";
import FormikInput from "../../Shared/formik-fields/FormikInput";
import FormikSelect from "../../Shared/formik-fields/FormikSelect";
import { getModulePermission } from "../../utils/commanFunctions";
import MyLeavesForm from "../Employee/Leaves/MyLeaves/MyLeavesForm";
import "./dashboard.css";

const Annoncement = [
  {
    id: 1,
    title: 'Diwali Celebration',
    date: '2021-10-04',
    description: 'Join us for a grand Diwali celebration!',
    backgroundImage: 'https://source.unsplash.com/random/300×300?/diwali'
  },
  {
    id: 2,
    title: 'Christmas Celebration',
    date: '2021-10-04',

    description: 'Join us for a grand Christmas celebration!',
    backgroundImage: 'https://source.unsplash.com/random?/Christmas'
  },
  {
    id: 3,
    title: 'New Year Celebration',
    date: '2021-10-04',

    description: 'Join us for a grand New Year celebration!',
    backgroundImage: ' https://source.unsplash.com/random?/NewYear'
  },
  // Add more announcements as needed
];
const RecentTask = [
  {
    id: 1,
    task: 'Task 1',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2021-10-04',
  },
  {
    id: 2,
    task: 'Task 2',
    status: 'In Progress',
    priority: 'High',

    dueDate: '2021-10-04',
  },
  {
    id: 3,
    task: 'Task 3',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2021-10-04',
  },
  {
    id: 3,
    task: 'Task 3',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2021-10-04',
  },
  {
    id: 3,
    task: 'Task 3',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2021-10-04',
  },
  {
    id: 3,
    task: 'Task 3',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2021-10-04',
  },

]
const projects = [
  {
    id: 1,
    name: 'Project 1',
    description: 'This is a description for Project 1',
    status: 'In Progress',
    priority: 'High',
    progress: 50,
    tasks: [
      { id: 1, name: 'Task 1', status: 'Completed' },
      { id: 2, name: 'Task 2', status: 'In Progress' },
      { id: 3, name: 'Task 3', status: 'Not Started' },
    ],
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'This is a description for Project 2',
    status: 'Completed',
    priority: 'High',
    progress: 70,
    tasks: [
      { id: 4, name: 'Task 4', status: 'Completed' },
      { id: 5, name: 'Task 5', status: 'Completed' },
      { id: 6, name: 'Task 6', status: 'Completed' },
    ],
  },
  {
    id: 3,
    name: 'Project 3',
    description: 'This is a description for Project 3',
    status: 'Not Started',
    priority: 'High',
    progress: 10,
    tasks: [
      { id: 7, name: 'Task 7', status: 'Not Started' },
      { id: 8, name: 'Task 8', status: 'Not Started' },
      { id: 9, name: 'Task 9', status: 'Not Started' },
    ],
  },
  {
    id: 3,
    name: 'Project 3',
    description: 'This is a description for Project 3',
    status: 'Not Started',
    priority: 'High',
    progress: 10,
    tasks: [
      { id: 7, name: 'Task 7', status: 'Not Started' },
      { id: 8, name: 'Task 8', status: 'Not Started' },
      { id: 9, name: 'Task 9', status: 'Not Started' },
    ],
  },
];

const EmployeeDashboard: React.FC = () => {

  const [openDialog, setOpenDialog] = React.useState(false);
  const [permission, setPermission] = React.useState(null);
  const [value, setValue] = React.useState({
    date: '',
    duration: '',
  });

  React.useEffect(() => {
    (async function () {
      const permission = await getModulePermission(Modules.Role);
      setPermission(permission);
    })();
  }, [])

  const names = ['12-10-2023', '13-10-2023', '14-10-2023', '15-10-2023', '16-10-2023']
  const data = [8, 9, 7, 8.5, 9.5];

  // const { data: status } = useQuery<IStatusResponse, Error>({
  //   queryKey: ["getInOutStatus"],
  //   queryFn: async () => {
  //     const response = await attendanceService.getStatus();
  //     return response?.data?.data;
  //   }
  // })

  return (
    <>
      <div className='dashboard mt-1'>
        {
          Annoncement?.length > 0 && (
            <div className='white-box mb-1'>
              <div className="main-title mb-1">
                <h2>Announcements <FaBullhorn /></h2>
              </div>
              {Annoncement?.map((item, index) => (
                <div key={index} className='mb-1'>
                  <Accordion className='accrodion mb-1' style={{ background: `linear-gradient(rgba(5, 5, 5, 0.5), rgba(0, 0, 0, 0.5)),url(${item?.backgroundImage})` }} >
                    <AccordionSummary
                      expandIcon={<MdExpandMore style={{ color: "white" }} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className='d-flex align-center justify-between' style={{ width: "100%" }}>
                        <Typography >{item.title}</Typography>
                        <Typography className='text-muted' style={{ color: "white" }}>{item.date}</Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {item.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          )
        }

        <section className="employee-dashboard">
          <div className="employee-dashboard-content">
            <div className="employee-dashboard-left-side">
              <div className="white-box leave-detail-box">

                <div className="leave-detail d-flex align-center justify-center mb-1">
                  <div className="leave-taken ">
                    <h2>12</h2>
                    <h3>Leave Taken</h3>
                  </div>
                  <hr style={{ height: "50px" }} />
                  <div className="leave-remaining">
                    <h2>5</h2>
                    <h3>Remaining</h3>
                  </div>
                </div>
                <div className="add-leave-btn">
                  <Button variant="contained" className="btn-primary" style={{ backgroundColor: " #024d81" }} onClick={() => setOpenDialog(true)}>
                    Add Leave
                  </Button>
                </div>
              </div>

              <div className="white-box project-stastics mt-1">
                <div className="main-title">
                  <h2>Project Statistics</h2>
                </div>
                {
                  projects?.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="project-box mb-1 mt-1" >
                        <div className="project-content">
                          <div className="project-name d-flex align-center gap-1">
                            <p>{item.name}</p>
                            <small className={`text-muted ${item.progress < 30 ? 'bg-red' : item.progress < 60 ? "bg-yellow" : "bg-green"}`}>{item.status}</small>
                          </div>
                          {/* <div className="project-status ">
                          <small className='text-muted d-flex justify-start'>{item.progress}%</small>
                        </div> */}
                        </div>
                        <div className="progress-bar d-flex align-center gap-1 mt-2">
                          <small className='text-muted d-flex justify-end'>{item.progress}%</small>

                          <Line
                            percent={item.progress}
                            strokeWidth={2}
                            style={{ height: "7px" }}
                            strokeColor={
                              item.progress < 30 ? "#ff0000" :
                                item.progress < 60 ? "#fac858" :
                                  "#1abc9c"
                            }
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                }

              </div>

            </div>

            <div className="employee-dashboard-right-side">
              <div className="white-box">
                <div className="main-title d-flex align-center gap-1">
                  <h2>Recent Tasks</h2>
                  <div className="bedge bg-red">
                    <div>6</div>
                  </div>
                </div>
                <div className="recent-task-box">

                  {
                    RecentTask?.map((item, index) => (
                      <div className="absent-box" key={index}>
                        <div className="absent-content d-flex gap-1 direction-column">
                          <div className="absent-name d-flex align-center gap-1">
                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ width: "40px", height: "40px" }} /> */}
                            <div className='d-flex align-center gap-1'>
                              {item.task}
                              <div className={`bedge ${item.status === "Approved" ? 'bg-green' : 'bg-yellow'}`} >
                                <div>{item.status}</div>
                              </div>
                            </div>
                          </div>
                          <div className="absent-date d-flex justify-between align-center">
                            <div className='d-flex direction-column'>
                              <small >{item.dueDate}</small>
                              <small className='text-muted'>Due Date</small>
                            </div>

                            <small className={`text-muted ${item.priority === "High" ? 'bg-red' : item.priority === "mid" ? 'bg-yellow' : "bg-green"}`} >{item.priority}</small>

                          </div>
                        </div>
                        <div className="absent-department">
                        </div>
                      </div>
                    ))

                  }
                </div>
              </div>


            </div>

          </div>
          <section className="bar-char mt-1 white-box">
            <div className="mb-3">

              <Formik
                initialValues={{
                  date: '',
                  duration: '',
                }}
                onSubmit={(values) => {
                  console.log(values)
                }}
                onReset={() => {
                  setValue({
                    date: '',
                    duration: '',
                  })
                }}
              >
                {({ setFieldValue, handleReset }) => {
                  return (
                    <Form>
                      <div className="filter-form d-flex gap-1 form mb-1" style={{ flexWrap: "nowrap" }}>
                        <div className="form-group">
                          <Field
                            placeholder="Date"
                            type="date"
                            className="form-control"
                            id="Date"
                            name="date"
                            component={FormikInput}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                              setValue({
                                ...value,
                                date: e.target.value
                              })
                              setFieldValue("date", e.target.value);
                            }}
                          />

                        </div>
                        <div className="form-group">
                          <Field
                            placeholder="Duration"
                            type="text"
                            className="form-control"
                            id="Duration"
                            name="duration"
                            options={[
                              { value: 1, title: "Monthy" },
                              { value: 3, title: "Weekly" },
                            ]}
                            component={FormikSelect}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setValue({
                                ...value,
                                duration: e.target.value
                              })
                              setFieldValue("duration", e.target.value);
                            }}
                          />

                        </div>


                        <div className="form-group">
                          <Button type="submit" className="btn btn-primary" onClick={handleReset}>
                            <span>Clear</span>
                          </Button>
                        </div>
                      </div>
                    </Form>

                  )
                }}
              </Formik>
            </div>
            <CustomBarChart names={names} data={data} text="Employee Productivity Overview" subtext="Average working hours per employee" />
          </section>
          <section className="bar-char mt-1 white-box">
            <CustomLineChart
              data={[10, 20, 24, 28, 35, 47, 100]}
              categories={['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'task7']}
            />
          </section>
        </section>
      </div>

      <DialogForm
        scroll="body"
        maxWidth="md"
        title="Add Leave"
        className='dialog-form'
        openDialog={openDialog}
        handleDialogClose={() => setOpenDialog(false)}
        bodyContent={<MyLeavesForm />}
      />
    </>
  );
};


export default EmployeeDashboard