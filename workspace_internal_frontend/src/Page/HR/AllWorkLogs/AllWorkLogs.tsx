import { Button, debounce } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import personalDetailService from '../../../Services/personal-detail-service';
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import FormikInput from '../../../Shared/formik-fields/FormikInput';
import { Modules } from '../../../Shared/enums/modules';
import { getModulePermission } from '../../../utils/commanFunctions';

interface Iprops {
    employeeName: string;
}

const AllWorkLogs = () => {

    const [values, setValues] = React.useState<Iprops>({
        employeeName: '',
    });

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.AllAttendance),
    });


    const debouncedSetSearchKey = debounce((search: string) => {
        setValues({
            ...values,
            employeeName: search,
        });
    }, 300);


    const navigate = useNavigate();

    const columns = [
        { id: 'index', label: 'S.No', width: 20, className: 'text-center' },
        { id: 'employeeCode', label: 'Code', width: 20, className: 'text-center' },
        { id: 'employees', label: 'Employees', width: 160, className: 'text-center' },
        { id: 'department', label: 'Department', width: 160, className: 'text-center' },
        { id: 'reportTo', label: 'Report To', width: 160, className: 'text-center' },
        // { id: 'actions', label: 'Actions', width: 20, className: 'text-center' },
    ];

    const handleTableRowClick = (row) => {
        const pathPrefix = import.meta.env.VITE_PATH_PREFIX;
        navigate(`${pathPrefix}/hr/workLogs/${row.id}`, { state: { employeeName: row.employees } });
    }

    const { data: AllEmployees, isLoading } = useQuery({
        queryKey: ["getAllEmployee", values],
        queryFn: async () => {
            const response = await personalDetailService.getAllEmployees(values);
            return response?.data?.data;
        },
        enabled: permission?.canRead
    });

    const rows = AllEmployees?.allEmployees?.map((row, index) => {
        return {
            id: row.id,
            index: index + 1,
            employees: row?.firstName + " " + row?.lastName,
            department: row?.department?.name,
            reportTo: row?.reportToPerson?.firstName + " " + row?.reportToPerson?.lastName,
            employeeCode: row?.employeeCode,
        };
    })

    return (
        <>
            <div className="all-employee-content mt-2">
                <div className="white-box">
                    <div className="filters-row d-flex direction-column gap-2">
                        <Formik
                            initialValues={{
                                employeeName: '',
                            }}
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
                                    <Form >
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
                                                        debouncedSetSearchKey(e.target.value),
                                                            setFieldValue("employeeName", e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className="search-btn content-box" onClick={() => {
                                                handleReset();
                                                setValues({
                                                    employeeName: '',
                                                });
                                            }}>
                                                <Button className="btn btn-primary" style={{ backgroundColor: "#8e97a2 !important" }} type="submit">
                                                    <span>Clear</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>

                        <CustomShortingMuiTable
                            columns={columns}
                            isLoading={isLoading}
                            rows={rows || []}
                            // onView={handleView}
                            // isViewAction={true}
                            onTableRowClick={handleTableRowClick}
                            
                            permission={permission || { canCreate: false, canRead: false, canUpdate: false, canDelete: false }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllWorkLogs