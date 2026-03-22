import React from "react";
// import { useSelector } from "react-redux";
// import { IApplicationState } from "../../../Store/state/app-state";
// import { useLocation, useParams } from "react-router-dom";
import DialogForm from "../../../Shared/components/DialogForm";
import BankDetailForm from "./Forms/BankDetailForm";
import { FaPenToSquare } from "react-icons/fa6";

interface BankDetailBox3Props {
    bankDetails: {
        bankName: string;
        branchName: string;
        accountNo: string;
        ifsc?: string;
    };
}
const BankDetailBox3 = ({ bankDetails }: BankDetailBox3Props) => {
    // const userData = useSelector((state: IApplicationState) => state.UserData);
    // const { id } = useParams()
    // const { pathname } = useLocation()
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleDialogClose = () => setOpenDialog(false);

    const bankDetail = [
        { title: 'Bank name', value: bankDetails?.bankName },
        { title: 'Branch name', value: bankDetails?.branchName },
        { title: 'Account number', value: bankDetails?.accountNo },
        { title: 'IFSC code', value: bankDetails?.ifsc },
    ];

    // const isAdminOrHR = userData?.role === "HR" || userData?.role === "SUPER ADMIN";

    return (
        <div className="bank-detail-container white-box ">
            <div className="bank-detail-content d-flex item-center mb-2 justify-between  mb-2">
                <div className="bank-detail-main-title ">
                    <h3>Bank Details</h3>
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

            <div className="bank-detail-content-container">
                {bankDetail.map((detail, index) => (
                    <div className='bank-title-value' key={index}>
                        <div className="bank-detail-title">
                            <h4>{detail.title} : </h4>
                        </div>
                        <div className="bank-detail-content">
                            <p className='text-muted'>{detail.value ? detail.value : "Not Available"}</p>
                        </div>
                    </div>
                ))}
            </div>
            <DialogForm
                scroll="body"
                maxWidth="lg"
                title="Add Bank Details"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={handleDialogClose}
                bodyContent={<BankDetailForm bankDetails={bankDetails} setOpenDialog={setOpenDialog} />}
            />
        </div>
    )
}

export default BankDetailBox3