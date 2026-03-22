import { Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Routing } from '../../../Routes/routing';
import personalDetailService from '../../../Services/personal-detail-service';
import ConfirmDialog from '../../../Shared/components/ConfirmDialog';
import DialogForm from '../../../Shared/components/DialogForm';
import { Modules } from '../../../Shared/enums/modules';
import FormikInput from '../../../Shared/formik-fields/FormikInput';
import { IApplicationState } from '../../../Store/state/app-state';
import { getModulePermission } from '../../../utils/commanFunctions';
import AddEmployeeForm from './Forms/AddEmployeeForm';
import "./allemployee.css";
import { IAllemployeeData, IEmployeeNameSearchModel } from '../../../Models/employee/employeeM';

const AllEmployees = () => {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<IEmployeeNameSearchModel>({ employeeName: '' });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<string | undefined | null>(null);
  const userData = useSelector((state: IApplicationState) => state.UserData);
  const navigate = useNavigate();

  const { data: permission } = useQuery({
    queryKey: ["modulePermission"],
    queryFn: () => getModulePermission(Modules.AllEmployees),
  });

  const { data: AllEmployees } = useQuery({
    queryKey: ["getAllEmployee", values],
    queryFn: async () => {
      const response = await personalDetailService.getAllEmployees(values);
      return response?.data?.data as IAllemployeeData;
    },
    enabled: permission?.canRead
  });

  const fetchEmployeeByID = (id: string | undefined) => {
    navigate(`${Routing.AllEmployees}/${id}`);
  }

  const deleteMutation = useMutation({
    mutationFn: (id: string) => personalDetailService.deleteEmployee(id),
    onSuccess: (response) => {
      toast.success(response?.data?.status?.message);
      queryClient.invalidateQueries({ queryKey: ['getAllEmployee'] });
    },
  });

  const handleDeleteUser = async () => {
    if (deleteUserId !== null) {
      deleteMutation.mutate(deleteUserId);
      setDeleteUserId(null);
      setOpenConfirmDialog(false);
    }
  }

  const isAdminOrHR = userData?.role === "HR" || userData?.role === "SUPER ADMIN";

  return (
    <>
      <section className='all-employee'>
        <div className="all-employee-container">
          {
            isAdminOrHR && (
              <div className="add-employee-btn d-flex justify-end" >
                <Button className="btn btn-primary" onClick={() => setOpenDialog(true)}>
                  <span> <FaPlus style={{ marginRight: "5px" }} /> Add Employee</span>
                </Button>
              </div>)
          }
          <div className="all-employee-content mt-2">
            <div className="filters-row">
              <Formik
                initialValues={{
                  employeeName: '',
                } as IEmployeeNameSearchModel}
                onSubmit={(values) => {
                  setValues(values);
                }}
                onReset={() => {
                  setValues({
                    employeeName: '',
                  });
                }}
              >
                {({ values, setFieldValue, handleReset }) => {
                  return (
                    <Form>
                      <div className="employee-filter-form-content">
                        <div className="employee-name content-box">
                          <Field
                            placeholder="Employee Name"
                            type="text"
                            className="form-control"
                            id="employeeName"
                            name="employeeName"
                            value={values?.employeeName}
                            component={FormikInput}
                            onChange={(e) => {
                              setValues({
                                ...values,
                                employeeName: e.target.value
                              });
                              setFieldValue("employeeName", e.target.value);
                            }}
                          />
                        </div>
                        <div className="search-btn content-box" onClick={handleReset}>
                          <Button className="btn btn-primary" style={{ backgroundColor: "#8e97a2 !important" }} type="submit">
                            <span>Clear</span>
                          </Button>
                        </div>
                      </div>
                    </Form>
                  )
                }}
              </Formik>
            </div>
            <div className="employee-boxes">
              <div className="employee-box-content">
                {
                  AllEmployees?.allEmployees?.map((employee) => {
                    return (
                      <div className="main-box relative" key={employee?.id} >
                        {
                          isAdminOrHR &&
                          <div className="dropdown profile-action" onClick={() => {
                            setOpenConfirmDialog(true);
                            setDeleteUserId(String(employee?.id));
                          }}>
                            <MdDeleteSweep style={{ color: '#C60C30' }} />
                          </div>
                        }
                        <div className="employee-box white-box" onClick={() => fetchEmployeeByID(String(employee?.id))} key={employee?.id}>
                          <div className="box-avatar">
                            <img src={employee?.profilePicture} alt="" />
                          </div>
                          <div className="box-content">
                            <h5>{employee?.firstName + " " + employee.lastName}</h5>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section >
      <DialogForm
        scroll="body"
        maxWidth="md"
        title="Add Employee"
        className='dialog-form'
        openDialog={openDialog}
        handleDialogClose={() => setOpenDialog(false)}
        bodyContent={<AddEmployeeForm setOpenDialog={setOpenDialog} />}
      />

      <ConfirmDialog
        title="Delete User"
        maxWidth="sm"
        openDialog={openConfirmDialog}
        handleDialogClose={() => setOpenConfirmDialog(false)}
        message={"Are you sure you want to delete this user?"}
        handleSuccess={() => handleDeleteUser()}
      />

    </>
  )
}

export default AllEmployees;
