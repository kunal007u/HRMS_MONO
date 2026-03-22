import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Line } from 'rc-progress';
import React from 'react';
import { FaBullhorn, FaUser } from "react-icons/fa";
import CustomBarChart from '../../Shared/components/CustomBarChart';
import CustomPieChart from '../../Shared/components/CustomPieChart';
import { Modules } from '../../Shared/enums/modules';
import FormikInput from '../../Shared/formik-fields/FormikInput';
import FormikSelect from '../../Shared/formik-fields/FormikSelect';
import { getModulePermission } from '../../utils/commanFunctions';
import "./dashboard.css";
import { FaChevronDown } from "react-icons/fa6";


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

const absentList = [
  {
    id: 1,
    name: 'Rajesh',
    department: 'HR',
    designation: 'HR',
    date: '2021-09-01',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Rajesh',
    department: 'HR',
    designation: 'HR',
    date: '2021-09-01',
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Rajesh',
    department: 'HR',
    designation: 'HR',
    date: '2021-09-01',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Rajesh',
    department: 'HR',
    designation: 'HR',
    date: '2021-09-01',
    status: 'Approved',

  },
  {
    id: 5,
    name: 'Rajesh',
    department: 'HR',
    designation: 'HR',
    date: '2021-09-01',
    status: 'Pending',

  },
  {
    id: 6,
    name: 'Rajesh',
    department: 'HR',
    designation: 'HR',
    date: '2021-09-01',
    status: 'Pending',

  },
];

const totalEmployee = 50;
const totalPresent = 40;

const AdminDashboard = () => {
  const [permission, setPermission] = React.useState(null);

  const names = ['krunal', 'Renish', 'Hemal', 'deep', 'darshit', 'arun', 'roshan', 'parth', 'kaushal', 'yash', 'darshit', 'manshi', 'jevin', 'hemal.s', 'jinnal', 'pratik', 'vishal', 'anand', 'raj', 'neha', 'priya', 'ravi', 'shubham', 'pooja', 'ritesh', 'dd', 'dd', 'dd', 'dd', 'dd', 'dd'];
  const data = [7.5, 6.5, 7.0, 8.2, 5.6, 9.7, 4.6, 10.2, 12.6, 6.0, 5.4, 11.3, 12.3, 12, 12, 8.5, 9.2, 7.8, 6.9, 8.1, 7.3, 9.5, 8.7, 7.2, 8.9, 8.7, 7.2, 8.9, 8.7, 7.2, 8.9];
  const additionalData = ['Additional data 1', 'Additional data 2', 'Additional data 3', /* ... */];

  const [values, setValues] = React.useState({
    Department: '',
  });

  React.useEffect(() => {
    (async function () {
      const permission = await getModulePermission(Modules.AdminDashboard);
      setPermission(permission);
    })();
  }, [])

  return (
    <div className='dashboard'>
      {
        Annoncement?.length > 0 && (
          <div className='white-box mb-1'>
            <div className="mb-1">
              <h2>Announcements <FaBullhorn /></h2>
            </div>
            {Annoncement?.map((item, index) => (
              <div key={index} className='mb-1'>
                <Accordion className='accrodion mb-1' style={{ background: `linear-gradient(rgba(5, 5, 5, 0.5), rgba(0, 0, 0, 0.5)),url(${item?.backgroundImage})` }} >
                  <AccordionSummary
                    expandIcon={<FaChevronDown  style={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div className='d-flex align-center justify-between' style={{ width: "100%" }}>
                      <Typography >{item.title}</Typography>
                      <Typography className='text-muted'>{item.date}</Typography>
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

      <section className="admin-dashboard">
        <div className="admin-dashboard-content">
          <div className="admin-dashboard-left-side">

            <div className="white-box total-employee ">
              <div className='first-row-box-content'>
                <div className="content-box box" >
                  <div className="left-side">
                    <FaUser />
                  </div>
                  <div className="right-side">
                    <h3>{`${totalPresent}/${totalEmployee}`}</h3>
                    <small className='text-muted'>{"Total Present"}</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="white-box project-stastics mt-1">
              <div className="">
                <h2>Project Statistics</h2>
              </div>
              {
                projects?.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="project-box mb-1 mt-1">
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

          <div className="admin-dashboard-right-side">
            <div className="white-box task-statistics">
              <div className="">
                <h2>Task Statistics</h2>
              </div>

              <div className="task-statistics-content mt-1 mb-1">

                <div className="white-box todays-task">
                  <h4>Today's Tasks</h4>
                  <h2 className='text-muted'>25</h2>
                </div>
                <div className="white-box completed-task">
                  <h4>Completed Tasks</h4>
                  <h2 className='text-muted'>12</h2>
                </div>
              </div>

              <div className='mb-3' >

                <Formik
                  initialValues={{
                    date: '',
                  }}
                  onSubmit={(values) => {
                    console.log(values)
                  }}
                >
                  {({ setFieldValue }) => {
                    return (
                      <Form>
                        <div className="filter-form d-flex gap-1 form mb-1 mt-2" >
                          <div className="">
                            <Field
                              placeholder="Date"
                              type="date"
                              className="form-control"
                              id="date"
                              name="date"
                              component={FormikInput}
                              onChange={(e) => {
                                setValues(e.target.value)
                                setFieldValue("date", e.target.value);
                              }}

                            />

                          </div>

                          <div className="form-group">
                            <Button type="submit" className="btn btn-primary">
                              <span>Clear</span>
                            </Button>
                          </div>
                        </div>
                      </Form>

                    )
                  }}
                </Formik>
              </div>

              <CustomPieChart data={[
                { value: 12, name: 'To Do' },
                { value: 16, name: 'In Progress' },
                { value: 10, name: 'Testing' },
                { value: 13, name: 'Done' },
                { value: 13, name: 'Reopen Task' },
                { value: 13, name: 'On-hold Task' }

              ]} />


            </div>
          </div>
        </div>

        <section className='white-box mt-1'>

          <div className='mb-3' >

            <Formik
              initialValues={{
                name: '',
                department: '',

              }}
              onSubmit={(values) => {
                console.log(values)
              }}
            >
              {({ setFieldValue }) => {
                return (
                  <Form>
                    <div className="filter-form d-flex gap-1 form mb-1" style={{ flexWrap: "nowrap" }}>
                      <div className="form-group">
                        <Field
                          placeholder="Department"
                          type="text"
                          className="form-control"
                          id="department"
                          name="department"
                          options={
                            [
                              { value: "1", title: "Marketing" },
                              { value: "2", title: "HR" },
                              { value: "3", title: "Development" },
                              { value: "4", title: "Design" },
                              { value: "5", title: "Testing" },
                            ]
                          }
                          component={FormikSelect}
                          onChange={(e) => {
                            setValues(e.target.value)
                            setFieldValue("department", e.target.value);
                          }}
                        />

                      </div>
                      <div className="form-group">
                        <Field
                          placeholder="Name"
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          component={FormikInput}
                          onChange={(e) => {
                            setValues(e.target.value)
                            setFieldValue("name", e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <Button type="submit" className="btn btn-primary">
                          <span>Clear</span>
                        </Button>
                      </div>
                    </div>
                  </Form>

                )
              }}
            </Formik>
          </div>

          <CustomBarChart names={names} data={data} text="Employee Productivity Overview" subtext="Average worklog per employee" additionalData={additionalData} />
        </section>

        <div className="white-box mt-1 ">
          <div className=" d-flex align-center gap-1">
            <h2>Today's Absent</h2>
            <div className="bedge bg-red">
              <div>5</div>
            </div>
          </div>
          <div className="todays-absent">
            {
              absentList?.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="absent-box">
                    <div className="absent-content d-flex gap-1 direction-column">
                      <div className="absent-name d-flex align-center gap-1">
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{ width: "40px", height: "40px" }} />
                        <div className='d-flex align-center gap-1'>
                          {item.name}
                          <div className={`bedge ${item.status === "Approved" ? 'bg-green' : 'bg-yellow'}`} >
                            <div>{item.status}</div>
                          </div>
                        </div>
                      </div>
                      <div className="absent-date d-flex justify-between align-center">
                        <div className='d-flex direction-column'>
                          <small >{item.date}</small>
                          <small className='text-muted'>Leave Date</small>
                        </div>

                        <small className='text-muted'>{item.department}</small>

                      </div>
                    </div>
                    <div className="absent-department">
                    </div>
                  </div>
                </React.Fragment>
              ))
            }
          </div>

        </div>
      </section>

    </div>
  )
}

export default AdminDashboard