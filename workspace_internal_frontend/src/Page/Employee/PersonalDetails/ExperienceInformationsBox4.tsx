import React from 'react'
import DialogForm from '../../../Shared/components/DialogForm'
import { DateTimeToMonthYear_String } from '../../../utils/dateFormat'
import EmployeeExperienceForm from './Forms/EmployeeExperienceForm'
// import { useSelector } from 'react-redux'
// import { useLocation, useParams } from 'react-router-dom'
// import { IApplicationState } from '../../../Store/state/app-state'
import { FaPenToSquare } from 'react-icons/fa6'
import "./personaldetail.css"


const ExperienceInformationsBox4 = ({ employeeDetail }) => {
    console.log("🚀 ~ ExperienceInformationsBox4 ~ employeeDetail:", employeeDetail)
    // const userData = useSelector((state: IApplicationState) => state.UserData);
    // const { pathname } = useLocation()
    // const { id } = useParams()
    const [openDialog, setOpenDialog] = React.useState(false);

    // const isAdminOrHR = userData?.role === "HR" || userData?.role === "SUPER ADMIN";

    return (
        <div className="experience-information-container white-box ">
            <div className="experience-information-content d-flex item-center mb-2 justify-between  mb-2">
                <div className="experience-information-main-title ">
                    <h3>Experience</h3>
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

            <div className="experience-information-content-container">
                <div className="experience-box">
                    {
                        employeeDetail?.experienceDetails?.length > 0 ? employeeDetail?.experienceDetails?.map((item, index) => {
                            return (
                                <ul className="experience-list" key={index}>
                                    <li>
                                        <div className="experience-user">
                                            <div className="before-circle" />
                                        </div>
                                        <div className="experience-content">
                                            <div className="timeline-content">
                                                <a href="#" className="name">{item?.companyName ? item?.companyName : "-"}</a>
                                                <span className="designation time">{item?.designation}</span>
                                                <span className="time">{DateTimeToMonthYear_String(item?.periodFrom)} - {item?.periodTo ? DateTimeToMonthYear_String(item?.periodTo) : "Present"} - {item?.duration}</span>
                                                <span className="time">{item?.location ? item?.location : "-"}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            )
                        }) : (
                            <div className="experience-box">
                                <ul className="experience-list">
                                    <li>
                                        <div className="experience-user">
                                            <div className="before-circle" />
                                        </div>
                                        <div className="experience-content">
                                            <div className="timeline-content">
                                                <a href="#" className="name">-</a>
                                                <span className="time">-</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                </div>
            </div>
            <DialogForm
                scroll="body"
                maxWidth="lg"
                title="Experience Information"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => setOpenDialog(false)}
                bodyContent={<EmployeeExperienceForm employeeDetail={employeeDetail} setOpenDialog={setOpenDialog} />}
            />
        </div>
    )
}

export default ExperienceInformationsBox4