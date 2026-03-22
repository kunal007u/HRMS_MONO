import { Button, debounce } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Field, Formik } from 'formik'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import { EmployeeSalaryModel } from '../../../Models/employee/employeeM'
import salaryServices from '../../../Services/salary-services'
import ConfirmDialog from '../../../Shared/components/ConfirmDialog'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import DialogForm from '../../../Shared/components/DialogForm'
import messages from '../../../Shared/constants/messages'
import { Modules } from '../../../Shared/enums/modules'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import { getModulePermission } from '../../../utils/commanFunctions'
import AddSalaryForm from './AddSalaryForm'
import "./salary.css"

const EmployeeSalary = () => {
    const queryClient = useQueryClient()
    const [row, setRow] = React.useState(null)
    const [formValues, setFormValues] = React.useState(null)
    const [openDialog, setOpenDialog] = React.useState(false);
    const [deleteRows, setDeleteRows] = React.useState(null)
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false)

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.EmployeeSalary),
    });

    const columns = [
        { id: 'index', label: 'S.No', className: 'text-center', width: "50px" },
        { id: 'employeeCode', label: 'Code', className: 'text-center', width: "50px" },
        { id: 'employeeName', label: 'Name', className: 'text-center' },
        { id: 'fromDate', label: 'Joining Date', className: 'text-center', width: "120px" },
        { id: 'basic', label: 'basic', className: 'text-center', width: "120px" },
        { id: 'milestone', label: 'Milestone', className: 'text-center', width: "120px" },
        { id: 'pf', label: 'PF', className: 'text-center' },
        { id: 'pt', label: 'PT', className: 'text-center' },
        { id: 'totalSalary', label: 'Total Salary', className: 'text-center' },
        { id: 'actions', label: 'Actions', className: 'text-center' },
    ]

    const { data: employeesSalary } = useQuery({
        queryKey: ["getAllEmployeesSalary", formValues],
        queryFn: async () => {
            const response = await salaryServices.getAllEmployeesSalary(formValues);
            return response?.data?.data;
        },
    });

    const mapResponseToColumns = (row: EmployeeSalaryModel, index: number) => {
        return {
            ...row,
            index: index + 1,
            employeeId: row?.employeeId,
            employeeCode: row?.employee?.employeeCode,
            employeeName: row?.employee?.firstName + ' ' + row?.employee?.lastName,
            fromDate: row?.fromDate,
            basic: row?.basic,
            milestone: row?.milestone,
            pf: row?.pf,
            pt: row?.pt,
            totalSalary: row?.totalSalary,
            actions: "actions"
        };
    };

    const customResponse = employeesSalary?.map(mapResponseToColumns);

    const handleEdit = (row) => {
        setRow(row);
        setOpenDialog(true);
    }

    const DeleteAssetsMutation = useMutation({
        mutationFn: (values: number) => salaryServices.deleteEmployeesSalary(values),
        onSuccess: (res) => {
            if (res?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllEmployeesSalary'] });
                setOpenDialog(false);
                toast.success(res?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.log(error.message);
        },
    })

    const handleDelete = (row) => {
        setOpenConfirmDialog(true)
        setDeleteRows(row)
    }

    const handleDeleteConfirm = () => {
        DeleteAssetsMutation.mutate(deleteRows.id)
        setOpenConfirmDialog(false)
        setDeleteRows(null)
    }

    const debouncedSetSearchKey = debounce((search: string) => {
        setFormValues(search);
    }, 300);

    return (
        <>
            <section className='all-employee-salary'>
                <div className="all-employee-salary">
                    <div className="add-salary-btn d-flex justify-end">
                        <Button className="btn btn-primary" onClick={() => setOpenDialog(true)}>
                            <span> <FaPlus style={{ marginRight: "5px" }} /> Add Salary</span>
                        </Button>
                    </div>
                </div>
            </section>
            <div className="all-employee-salary-content mt-2 white-box">
                <div className="filters-row mb-1">
                    <Formik
                        initialValues={{
                            search: ''
                        }}
                        onSubmit={(values) => {
                            setFormValues(values);
                        }}
                    >
                        {({ handleSubmit, values, setFieldValue, handleReset }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <div className="salary-filter-form-content">
                                        <div className='search content-box'>
                                            <Field
                                                placeholder="Search"
                                                type="text"
                                                className="form-control"
                                                id="search"
                                                name="search"
                                                value={values?.search}
                                                component={FormikInput}
                                                onChange={(e) => {
                                                    // setFormValues(e.target.value);
                                                    debouncedSetSearchKey(e.target.value),
                                                        setFieldValue("search", e.target.value);
                                                }}
                                            />

                                        </div>

                                        <div className="search-btn content-box" onClick={handleReset}>
                                            <Button className="btn btn-primary" style={{ backgroundColor: "#8e97a2 !important" }} type="submit">
                                                <span>
                                                    Clear
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
                <CustomShortingMuiTable
                    columns={columns}
                    rows={customResponse}
                    permission={permission}
                    isEditAccess={true}
                    isDeleteAction={true}
                    isEditAction={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    
                    className="employee-salary-table"
                />

            </div>
            <DialogForm
                scroll="body"
                maxWidth="md"
                title={row ? "Edit Salary" : "Add Salary"}
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => {
                    setOpenDialog(false)
                    setRow(null)
                }}
                bodyContent={
                    <AddSalaryForm
                        employeeSalary={row}
                        setOpenDialog={setOpenDialog}
                    />
                }
            />
            <ConfirmDialog
                title="Delete Salary"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={messages.SalaryDeleteMsg}
                handleSuccess={handleDeleteConfirm}
            />

        </>

    )
}

export default EmployeeSalary