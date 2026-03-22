import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import projectService from '../../../Services/project-service';
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import { months } from '../../../Shared/constants/commonConstants';
import { Modules } from '../../../Shared/enums/modules';
import FormikSelect from '../../../Shared/formik-fields/FormikSelect';
import { getModulePermission, years } from '../../../utils/commanFunctions';
import moment from 'moment';

const columns = [
    { id: 'index', label: 'S.No', className: 'text-center' },
    { id: 'projectName', label: 'Project Name', className: 'text-center' },
    { id: 'week1', label: 'Week 1', className: 'text-center' },
    { id: 'week2', label: 'Week 2', className: 'text-center' },
    { id: 'week3', label: 'Week 3', className: 'text-center' },
    { id: 'week4', label: 'Week 4', className: 'text-center' },
    { id: 'week5', label: 'Week 5', className: 'text-center' }, 
    { id: 'totalHours', label: 'Total Hours', className: 'text-center' },
];

const ProjectStatistics = () => {
    const currentDate = moment();
    const currentMonth = currentDate.month() + 1;
    const currentYear = currentDate.year();

    const [values, setValues] = React.useState({
        month: currentMonth,
        year: currentYear,
    });

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.ProjectStatistics),
    });

    const { data: getAllLogHours } = useQuery({
        queryKey: ["getAllLogHours", values],
        queryFn: async () => {
            const response = await projectService.getAllLogHours(values);
            return response?.data?.data;
        },
        enabled: permission?.canRead
    });

    const mapResponseToColumns = (res, index: number) => {
        return {
            index: index + 1,
            projectName: res.projectName,
            totalHours: res.totalHours,
            week1: res.week1,
            week2: res.week2,
            week3: res.week3,
            week4: res.week4,
            week5: res.week5 ? res.week5 :"-"
        };
    };

    const customResponse = getAllLogHours?.map(mapResponseToColumns);

    return (
        <>
            <div className='white-box d-flex direction-column gap-2'>

                <Formik
                    initialValues={{
                        month: currentMonth,
                        year: currentYear,

                    }}
                    onSubmit={(values) => {
                        setValues(values);
                    }}
                    onReset={() => {
                        setValues({
                            month: currentMonth,
                            year: currentYear,
                        });
                    }}
                >
                    {({ values, setFieldValue, handleReset }) => {
                        return (
                            <Form >
                                <div className='employee-filter-form-content'>
                                    <div className="month content-box">
                                        <Field
                                            placeholder="Month"
                                            name="month"
                                            as="select"
                                            className="attendance-month"
                                            component={FormikSelect}
                                            options={months}
                                            value={values.month}
                                            onChange={(e) => {
                                                setValues({
                                                    ...values,
                                                    month: e.target.value
                                                });
                                                setFieldValue("month", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="year content-box">
                                        <Field
                                            placeholder="Year"
                                            name="year"
                                            as="select"
                                            className="attendance-year"
                                            component={FormikSelect}
                                            options={years}
                                            value={values.year}
                                            onChange={(e) => {
                                                setValues({
                                                    ...values,
                                                    year: e.target.value
                                                });
                                                setFieldValue("year", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="search-btn content-box" onClick={() => {
                                        handleReset();
                                        setValues({
                                            month: currentMonth,
                                            year: currentYear,
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
                    rows={customResponse}
                    
                    isViewAction={true}
                    permission={permission}
                />
            </div>
        </>


    )
}

export default ProjectStatistics