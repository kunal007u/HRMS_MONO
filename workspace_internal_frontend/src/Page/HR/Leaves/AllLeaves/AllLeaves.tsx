
import { Avatar, Button, TablePagination, debounce } from '@mui/material'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { toast } from 'react-toastify'
import { ILeaveResponseModel } from '../../../../Models/Leaves/leavesM'
import leavesServices from '../../../../Services/leaves-services'
import CustomShortingMuiTable from '../../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import DialogForm from '../../../../Shared/components/DialogForm'
import { Modules } from '../../../../Shared/enums/modules'
import FormikInput from '../../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../../Shared/formik-fields/FormikSelect'
import { allLeaveRemarksValidationSchema } from '../../../../Validations/leaveV'
import { getModulePermission } from '../../../../utils/commanFunctions'
import { DateTimeToDateString } from '../../../../utils/dateFormat'
import MyLeavesForm from '../../../Employee/Leaves/MyLeaves/MyLeavesForm'
import '../all-leaves.css'

const columns = [
  { id: 'index', label: 'S.No', width: 10, className: 'text-center' },
  { id: 'employees', label: 'Employees', width: 100, className: 'text-center' },
  { id: 'startDate', label: 'From', width: 100, sortable: true, className: 'text-center' },
  { id: 'endDate', label: 'To', width: 100, sortable: true, className: 'text-center' },
  { id: 'numberOfDays', label: 'No Of Days', width: 70, className: 'text-center' },
  { id: "halfLeaveDays", label: "Half days", width: 100, className: "text-center" },
  { id: 'Status', label: 'Status', width: 50, className: 'text-center' },
  { id: 'approvedBy', label: 'Status Changed By', width: 150, className: 'text-center' },
  { id: 'actions', label: 'Actions', width: 20, className: 'text-center' },
];

type Value = {
  status: string;
  remark?: string;
};

interface IRow {
  id: number;
  isHalfDay: boolean;
  shift: string;
  halfLeaveDate: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  leaveReason: string;
  status: string;
  remarks: string;
  approvedBy: string;
  employees: JSX.Element;
  employeeID: number;
}

interface ISearchLeaveValues {
  employeeName: string;
  leaveType: string;
  status: string;
  order?: any;
  orderBy?: string;
}

const AllLeaves = () => {
  const queryClinet = useQueryClient();

  const [openRemarkDialog, setOpenRemarkDialog] = useState(false);
  const [remark, setRemark] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [row, setRow] = useState<IRow | null>(null);
  const [permission, setPermission] = useState(null);
  const rowsPerPageOptions = [10, 50, 100, 200];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);


  const [state, setState] = React.useState([
    {
      startDate: null,
      endDate: new Date(""),
      key: 'selection'
    }
  ]);

  const [values, setValues] = useState<ISearchLeaveValues>({
    employeeName: '',
    leaveType: '',
    status: '',
    order: '',
    orderBy: '',
  });

  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    (async function () {
      const permission = await getModulePermission(Modules.AllLeaves);
      setPermission(permission);
    })();
  }, []);

  const handleInfo = (_, row) => {
    setOpenDialog(true);
    setRow(row);
  };

  const handleStatusChange = async (row) => {
    setRow(row);
    let value: Value = {
      status: row?.status,
    };

    if (value.status === 'rejected' || value.status === 'cancelled') {
      setOpenRemarkDialog(true);
    } else {
      await changeLeaveStatus(row, value);
    }
  };

  const handleCloseRemarkDialog = async () => {
    let value = {
      status: row?.status,
      remark: remark,
    };
    await changeLeaveStatus(row, value);
    setOpenRemarkDialog(false);
  };

  const changeLeaveStatus = async (row, value: Value) => {
    try {
      const res = await leavesServices.changeLeaveStatus(row.id, value);
      if (res.status === 200) {
        queryClinet.invalidateQueries({ queryKey: ['getAllLeave'] });
        toast.success(res?.data?.status?.message);
        setRemark('');
        setRow(null);
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const { data: getAllLeave, isLoading, refetch } = useQuery<ILeaveResponseModel>({
    queryKey: ['getAllLeave', page, rowsPerPage, values, submit],
    queryFn: async () => {
      const endDate = state[0].endDate instanceof Date ? DateTimeToDateString(state[0].endDate) : "";
      const res = await leavesServices.getAllEmployeesLeaves(values, state[0].startDate ? DateTimeToDateString(state[0].startDate) : "", endDate !== "Invalid date" ? endDate : "", page * rowsPerPage, rowsPerPage, values?.order, values?.orderBy);
      return res?.data?.data;
    },
    placeholderData: keepPreviousData,
    retry: 1,
  });

  const handleRequestSort = (property: string) => {
    const isAsc = values.orderBy === property && values.order === 'asc';
    setValues({
      ...values,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    });
    setPage(0); 
  };

  const mapResponseToColumns = (res, index: number) => {
    return {
      id: res.id,
      index: index + 1 + page * rowsPerPage,
      isHalfDay: res?.isHalfDay ? res?.isHalfDay : false,
      halfLeaveDays: res?.halfLeaveDays ? res?.halfLeaveDays : '-',
      startDate: res?.startDate,
      endDate: res?.endDate,
      numberOfDays: res?.numberOfDays ? res?.numberOfDays : '-',
      Status: res?.status ? res?.status : '-',
      remarks: res?.remarks ? res?.remarks : '-',
      approvedBy: res?.approvedBy ? res?.approvedBy : '-',
      employees: <span className='d-flex item-center gap-1'><Avatar src={res?.profilePicture} /> {res?.fullName}</span>,
      employeeId: res?.employeeId,
      reason: res?.reason || '-',
      remark: res?.remark,
      leaveInfos: res.leaveInfos.map(info => ({
        id: info.id,
        date: info.date,
        selectedDuration: info.selectedDuration,
        leaveId: info.leaveId,
      })),
      infoBool: true,
    };
  };

  const customResponse = getAllLeave?.rows?.map(mapResponseToColumns);

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };
  const debouncedSetSearchKey = debounce((search: string) => {

    setValues({
      ...values,
      employeeName: search,
    });
  }, 300);

  return (
    <>
      <div className="all-leave-dashboard-boxes mt-1 ">
        <div className="today-presents white-box content-box">
          <h3>Today Presents</h3>
          <span>{getAllLeave?.todayPresents}</span>
        </div>
        <div className="pending-leave white-box content-box">
          <h3>pending Leaves</h3>
          <span>{getAllLeave?.totalPendingLeaves || '-'}</span>
        </div>
      </div>

      <section className="leave-hr white-box mt-1">
        <Formik
          initialValues={{
            employeeName: '',
            leaveType: '',
            status: '',
          }}
          onSubmit={(values) => { }}
          onReset={() => {
            setValues({
              employeeName: '',
              leaveType: '',
              status: '',
              order: '',
              orderBy: 'startDate',
            });
          }}
        >
          {({ values, setFieldValue, handleReset }) => {
            return (
              <Form className="leave-filter-form-container">
                <div className="leave-filter-form-content">
                  <div className="employee-name content-box">
                    <Field
                      placeholder="Employee Name"
                      type="text"
                      className="form-control"
                      id="EmployeeName"
                      name="employeeName"
                      value={values?.employeeName}
                      component={FormikInput}
                      onChange={(e: any) => {
                        debouncedSetSearchKey(e.target.value),
                          setFieldValue('employeeName', e.target.value);
                      }}
                    />
                  </div>

                  <div className="status content-box">
                    <Field
                      placeholder="Status"
                      type="text"
                      className="form-control"
                      id="status"
                      name="status"
                      value={values?.status}
                      options={[
                        { value: 'approved', title: 'Approved' },
                        { value: 'pending', title: 'Pending' },
                        { value: 'rejected', title: 'rejected' },
                        { value: 'cancelled', title: 'cancelled' },
                      ]}
                      component={FormikSelect}
                      onChange={(e: any) => {
                        setValues({
                          ...values,
                          status: e.target.value,
                        });
                        setFieldValue('status', e.target.value);
                      }}
                    />
                  </div>
                  <div className="date-range-picker">
                    <div className="relative">
                      <input
                        type="hidden"
                        name="date"
                        x-ref="date"
                        value={state[0].startDate && state[0].endDate ? `${DateTimeToDateString(state[0].startDate)} - ${DateTimeToDateString(state[0].endDate)}` : ''}
                      />
                      <input
                        type="text"
                        readOnly
                        x-model="datepickerValue"
                        className="form-control "
                        placeholder="Select date"
                        value={state[0].startDate && state[0].endDate ? `${DateTimeToDateString(state[0].startDate)} - ${DateTimeToDateString(state[0].endDate)}` : ''}
                      />
                      <div className="date-icon" onClick={() => setIsOpen(!isOpen)}>
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>

                    </div>
                    <div className="search-btn content-box" onClick={() => {
                      setState([{ startDate: '', endDate: new Date(''), key: 'selection' }])
                      setIsOpen(false)
                      setSubmit(false)
                      handleReset()
                    }}>
                      <Button className="btn btn-secondary" style={{ backgroundColor: '#8e97a2 !important' }} type="submit">
                        <span>Clear</span>
                      </Button>
                    </div>
                  </div>
                  {isOpen && (
                    <>
                      <div className="date-range-picker-container" >
                        <DateRange
                          onChange={(item) => {
                            setState([item.selection]);
                          }}
                          showSelectionPreview={true}
                          moveRangeOnFirstSelection={false}
                          months={2}
                          ranges={state}
                          editableDateInputs={true}
                          direction="horizontal"
                        // maxDate={new Date()}
                        />

                        <div className="d-flex gap-1">
                          <Button
                            onClick={() => { setIsOpen(false), setSubmit(!submit) }}
                            className="btn btn-primary "
                          >
                            Done
                          </Button>
                          <Button
                            onClick={() => {
                              setIsOpen(false)
                              setState([{ startDate: '', endDate: new Date(''), key: 'selection' }])
                            }}
                            className="btn btn-primary"
                          >
                            Close
                          </Button>

                        </div>

                      </div>
                    </>

                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className=" mt-1">
          <CustomShortingMuiTable
            columns={columns}
            rows={customResponse || []}
            onStatusChange={handleStatusChange}
            isLoading={isLoading}
            isEditAccess={true}
            isInfoAction
            onInfo={handleInfo}
            permission={permission || { canCreate: false, canRead: false, canUpdate: false, canDelete: false }}
            sortFlag
            order={values?.order}
            orderBy={values?.orderBy}
            onRequestSort={handleRequestSort}
          />

          <TablePagination
            component="div"
            count={getAllLeave?.count || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={rowsPerPageOptions}
          />

        </div>
      </section>

      <DialogForm
        scroll="body"
        maxWidth="md"
        title="Leave Info"
        openDialog={openDialog}
        handleDialogClose={() => setOpenDialog(false)}
        bodyContent={
          <MyLeavesForm row={row} setOpenDialog={setOpenDialog} />
        }
      />

      <DialogForm
        scroll="body"
        maxWidth="md"
        title="Remarks"
        openDialog={openRemarkDialog}
        handleDialogClose={() => setOpenRemarkDialog(false)}
        bodyContent={
          <>
            <div className="leave-remarks">
              <Formik
                initialValues={{
                  remarks: '',
                }}
                onSubmit={(values) => {
                  setRemark(values?.remarks);
                  handleStatusChange(row);
                  handleCloseRemarkDialog();
                }}
                validationSchema={allLeaveRemarksValidationSchema}
              >
                {({ values, setFieldValue }) => {
                  return (
                    <Form>
                      <div className="leave-remarks-content">
                        <div className="remarks content-box">
                          <Field
                            placeholder="Remarks"
                            type="text"
                            multiline
                            rows={4}
                            maxLength="5000"
                            className="form-control"
                            id="remarks"
                            name="remarks"
                            value={values?.remarks}
                            component={FormikInput}
                            onChange={(e: any) => {
                              setFieldValue('remarks', e.target.value);
                              setRemark(e.target.value);
                            }}
                          />
                        </div>
                        <div className="remarks-btn content-box">
                          <Button className="btn btn-primary" type="submit">
                            <span>Submit</span>
                          </Button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </>
        }
      />
    </>
  );
};

export default AllLeaves;
