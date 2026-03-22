import '../all-leaves.css'

/**
 * Renders a dialog box containing information about a leave request.
 * @param {Object} row - An object containing information about the leave request.
 * @param {string} row.leaveReason - The reason for the leave request.
 * @param {string} row.remarks - Additional remarks for the leave request.
 * @returns {JSX.Element} - The rendered dialog box.
 */
const 
LeaveInfo = ({ row }) => {
    const { reason, remark } = row;

    return (
        <div className='leaveinfo-dialog-box-container'>
            <div className='row mb-2'>
                <div className='col-md-4'>
                    <h4 className='text-muted'>Reason:</h4>
                </div>
                <div className='preformatted-text'>
                    <p>{reason}</p>
                </div>
            </div>
            {
                remark && remark?.length > 0 && (
                    <div className='row'>
                        <div className='col-md-4'>
                            <h4 className='text-muted'>Remarks:</h4>
                        </div>
                        <div className='preformatted-text'>
                            <p>{remark}</p>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default LeaveInfo