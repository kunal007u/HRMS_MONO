import React from 'react';
import DialogForm from '../../../Shared/components/DialogForm';
import PersonalInfoBox1Form from './Forms/PersonalInfoBox1Form';
// import { useSelector } from 'react-redux';
// import { IApplicationState } from '../../../Store/state/app-state';
// import { useLocation, useParams } from 'react-router-dom';
import { FaPenToSquare } from 'react-icons/fa6';
import { DateTimeToDateString } from '../../../utils/dateFormat';

const PersonalInformationBox1 = ({ employee }) => {
    // const userData = useSelector((state: IApplicationState) => state.UserData);
    // const { id } = useParams()
    // const { pathname } = useLocation();
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleDialogClose = () => setOpenDialog(false);

    const personalDetails = [
        { title: 'Current Address', value: employee?.currentAddress || '' },
        { title: 'Permanent Address', value: employee?.permanentAddress || '' },
        { title: 'Birthday', value: DateTimeToDateString(employee?.dateOfBirth) || '' },
        { title: 'Qualifications', value: employee?.qualification || '' },
        { title: 'Nationality', value: employee?.nationality || '' },
        { title: 'Passport Number', value: employee?.passportNumber || '' },
        { title: 'Father\'s Full Name', value: employee?.fatherName || '' },
        { title: 'Mother\'s Full Name', value: employee?.motherName || '' },
    ];

    // const isAdminOrHR = userData?.role === "HR" || userData?.role === "SUPER ADMIN";

    return (
        <div className="personal-detail-container white-box ">
            <div className="personal-detail-content d-flex item-center mb-2 justify-between ">
                <div className="personal-detail-main-title ">
                    <h3>Personal information</h3>
                </div>
                {/* {
                        (
                            (isAdminOrHR && pathname.includes("admin/employee/personal-details"))
                            || isAdminOrHR && id && bankDetails?.accountNo
                            || (userData?.role === "EMPLOYEE" && !bankDetails?.accountNo && !id)
                        ) && ( */}
                <div className="edit-icon" onClick={() => setOpenDialog(true)}>
                    <FaPenToSquare />
                </div>
                {/* )} */}
            </div>

            <div className="personal-detail-content-container">
                {personalDetails.map((detail, index) => {
                    return (
                        <div className='personal-title-value' key={index}>
                            <div className="personal-detail-title">
                                <h4>{detail.title} : </h4>
                            </div>
                            <div className="personal-detail-content">
                                <p className='text-muted'>{detail.value ? detail.value : "Not Available"}</p>
                            </div>
                        </div>
                    )
                }
                )}
            </div>

            <DialogForm
                scroll="body"
                maxWidth="lg"
                title="Add Personal Information"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={handleDialogClose}
                bodyContent={<PersonalInfoBox1Form employee={employee} setOpenDialog={setOpenDialog} />}
            />

        </div>
    )
}

export default PersonalInformationBox1