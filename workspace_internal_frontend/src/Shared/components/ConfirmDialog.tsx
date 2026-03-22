import { Breakpoint, Button, Dialog } from '@mui/material';
import React from 'react';

interface IConfirmDialogProps {
    openDialog?: boolean;
    title?: string;
    message?: string;
    maxWidth?: Breakpoint | false;
    handleDialogClose?: () => void;
    handleSuccess?: () => void;
    isOtherOptions?: boolean;
    handleBonus?: () => void;
    handleSalaryCalculation?: () => void;
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({ openDialog, title, message, maxWidth, handleSuccess, handleDialogClose, isOtherOptions,handleBonus,handleSalaryCalculation }) => {
    return (
        <Dialog open={openDialog} scroll="paper" maxWidth={maxWidth} onClose={handleDialogClose} className='confirm-dialog-box'>

            <div style={{ display: 'inline-block', width: 328 }} data-ignore="used only for top most containter width">
                <div className="confirm-box">
                    <p className="confirm-box1">{title}</p>
                    <p className="confirm-box2">{message}.</p>
                    <div className="confirm-box-container">
                        {
                            isOtherOptions ? (
                                <>
                                    <Button className="primary-button btn" onClick={handleBonus}>
                                        <span>
                                            Bonus
                                        </span>
                                    </Button>
                                    <Button className="primary-button btn" onClick={handleSalaryCalculation}>
                                        <span>
                                            Salary
                                        </span>
                                    </Button>
                                    <Button className="primary-button btn" onClick={handleDialogClose}>
                                        <span>
                                           Cancel
                                        </span>
                                    </Button>
                                </>

                            ) : (
                                <>
                                    <Button className="cancel-button" onClick={handleDialogClose}>
                                        <span>
                                           Cancel
                                        </span>
                                    </Button>
                                    <Button className="primary-button btn" onClick={handleSuccess}>
                                        <span>
                                            Confirm
                                        </span>
                                    </Button>
                                </>

                            )

                        }

                    </div>
                </div>
            </div>
        </Dialog>

    );
};

export default ConfirmDialog;
