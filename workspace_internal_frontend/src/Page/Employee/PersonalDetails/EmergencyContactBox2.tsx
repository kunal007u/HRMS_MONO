import React from 'react';
import DialogForm from '../../../Shared/components/DialogForm';
import EmployeeContactForm from './Forms/EmployeeContactForm';
// import { useSelector } from 'react-redux';
// import { IApplicationState } from '../../../Store/state/app-state';
// import { useLocation, useParams } from 'react-router-dom';
import { FaPenToSquare } from 'react-icons/fa6';

const EmergencyContactBox2 = ({ emergencyContacts }) => {
    // const userData = useSelector((state: IApplicationState) => state.UserData);
    // const { id } = useParams()
    // const { pathname } = useLocation()
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleDialogClose = () => setOpenDialog(false);

    const emergencyContact = [
        { title: 'Primary Name', value: emergencyContacts?.primaryName },
        { title: 'Relationship', value: emergencyContacts?.primaryRelationship },
        { title: 'Phone', value: emergencyContacts?.primaryPhoneNo },
        { title: 'Address', value: emergencyContacts?.primaryAddress },
        { title: 'Secondary Name', value: emergencyContacts?.secondaryName },
        { title: 'Relationship', value: emergencyContacts?.secondRelationship },
        { title: 'Phone', value: emergencyContacts?.secondaryPhoneNo },
        { title: 'Address', value: emergencyContacts?.secondaryAddress },
    ];

    // const isAdminOrHR = userData?.role === "HR" || userData?.role === "SUPER ADMIN";

    return (
        <div className="emergency-contact-detail-container white-box ">
            <div className="emergency-contact-detail-content d-flex item-center mb-2 justify-between  mb-2">
                <div className="emergency-contact-detail-main-title ">
                    <h3>Emergency Contact</h3>
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

            <div className="emergency-contact-detail-content-container">
                {emergencyContact?.map((detail, index) => (
                    <div className='emergency-contact-title-value' key={index}>
                        <div className="emergency-contact-detail-title">
                            <h4>{detail.title} : </h4>
                        </div>
                        <div className="emergency-contact-detail-content">
                            <p className='text-muted'>{detail.value ? detail.value : "Not Available"}</p>
                        </div>
                    </div>
                ))}
            </div>
            <DialogForm
                scroll="body"
                maxWidth="lg"
                title="Add Emergency Contact"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={handleDialogClose}
                bodyContent={<EmployeeContactForm emergencyContacts={emergencyContacts} setOpenDialog={setOpenDialog} />}
            />
        </div>
    )
}

export default EmergencyContactBox2