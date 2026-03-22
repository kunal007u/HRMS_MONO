import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { FaCalendar, FaEnvelope, FaPhone, FaVenusMars } from 'react-icons/fa';
import { FaPenToSquare } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IAllemployeeData } from '../../../Models/employee/employeeM';
import personalDetailService from '../../../Services/personal-detail-service';
import DialogForm from '../../../Shared/components/DialogForm';
import CustomTabbing from '../../../Shared/components/MuiTabbing';
import { Modules } from '../../../Shared/enums/modules';
import { IApplicationState } from '../../../Store/state/app-state';
import { getModulePermission } from '../../../utils/commanFunctions';
import { DateTimeToDateString } from '../../../utils/dateFormat';
import AssetTable from '../AllEmployees/AssetTable/AssetTable';
import AddEmployeeForm from '../AllEmployees/Forms/AddEmployeeForm';
import EmployeeDocumentForm from './Forms/EmployeeDocumentForm';
import ReimbursementForm from './Forms/ReimbursementForm';
import PersonalDetailContent from './PersonalDetailContent';
import "./personaldetail.css";

const PersonalDetails = () => {
    const userData = useSelector((state: IApplicationState) => state.UserData);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const [openDialog, setOpenDialog] = React.useState(false);
    const [tabIndex, setTabIndex] = React.useState(0);

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.PersonalDetail),
    });

    const { data: employeeDetail } = useQuery({
        queryKey: ['employeeDetail', id],
        queryFn: async () => {
            const res = await personalDetailService.getByIdEmployee(id || userData?.id);
            return res?.data?.data as IAllemployeeData;
        },
        enabled: permission?.canRead
    })

    const tabs = [
        {
            label: 'Profile',
            content: <PersonalDetailContent employeeDetail={employeeDetail} />,
        },
        {
            label: 'Documents',
            content: <EmployeeDocumentForm documents={employeeDetail?.documents} setOpenDialog={setOpenDialog} />,
        },
        {
            label: 'Assets',
            content: <AssetTable assetsDetails={employeeDetail?.assets} tabIndex={tabIndex} />,
        },
        {
            label: 'Reimbursement',
            content: <ReimbursementForm />,
        }
    ];

    useEffect(() => {
        navigate(location.pathname, {
            state: { ...location.state, breadcrumb: employeeDetail?.employee?.firstName + " " + employeeDetail?.employee?.lastName },
            replace: true
        });
    }, [employeeDetail?.employee?.firstName, employeeDetail?.employee?.lastName, location.pathname, navigate]);


    return (
        <section className="personal-detail">
            <div className="d-flex justify-end mb-2 gap-1">
                <Button
                    size="medium"
                    variant="contained"
                    className="btn btn-primary"
                    disableElevation
                    onClick={() => navigate(-1)}

                >
                    Back
                </Button>

            </div>
            <div className="white-box">
                {
                    (userData?.role === "SUPER ADMIN" || userData?.role === "HR") && (
                        <div className="edit-icon">
                            <FaPenToSquare onClick={() => setOpenDialog(true)} style={{ cursor: "pointer" }} />
                        </div>
                    )
                }
                <div className='d-flex gap-1'>
                    <div className="employee-img">
                        <img src={employeeDetail?.employee?.profilePicture} alt="Hero" />
                    </div>
                    <div className="employee-info ">
                        <div className="employee-name">
                            <p>{employeeDetail?.employee?.firstName} {employeeDetail?.employee?.lastName} </p>
                        </div>
                        <div className="employee-loc-email-phone">
                            <div className="employee-email">
                                <span>
                                    <FaEnvelope />
                                    {employeeDetail?.employee?.email}
                                </span>
                            </div>
                            <div className="employee-phone">
                                <span>
                                    <FaPhone />
                                    {employeeDetail?.employee?.phoneNumber}
                                </span>
                            </div>
                            <div className="employee-doj">
                                <span>
                                    <FaCalendar />
                                    {DateTimeToDateString(employeeDetail?.employee?.dateOfJoining)}
                                </span>
                            </div>
                            <div className="employee-gender">
                                <span>
                                    <FaVenusMars />
                                    {employeeDetail?.employee?.gender}
                                </span>
                            </div>
                        </div>
                        <hr style={{ width: "100%", marginTop: "10px" }} />
                        <div className="other-info">
                            <div className="designation">
                                <p>Designation</p>
                                <span>{employeeDetail?.employee?.designationName}</span>
                            </div>
                            <div className="department">
                                <p>Department</p>
                                <span>{employeeDetail?.employee?.departmentName}</span>
                            </div>
                            <div className="reporting-to">
                                <p>Reporting To</p>
                                <span>{employeeDetail?.employee?.reportTo}</span>
                            </div>
                            <div className="employee-id">
                                <p>Employee ID</p>
                                <span>{employeeDetail?.employee?.employeeCode}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <CustomTabbing tabs={tabs} tabIndex={setTabIndex} />

            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Update Employee"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => setOpenDialog(false)}
                bodyContent={<AddEmployeeForm employee={employeeDetail?.employee} setOpenDialog={setOpenDialog} />}
            />

        </section>
    );
};

export default PersonalDetails;