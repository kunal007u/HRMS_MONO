import { Breakpoint, Dialog, DialogTitle, IconButton, PaperProps } from '@mui/material';
import React from 'react';
import { RxCross1 } from "react-icons/rx";

interface IDialogFormProps {
    scroll?: 'body' | 'paper';
    maxWidth?: Breakpoint | false;
    openDialog?: boolean;
    title?: string;
    className?: string;
    bodyContent?: React.ReactNode;
    paperProps?: Partial<PaperProps>;
    disableEnforceFocus?: boolean;
    handleDialogClose?: () => void;
    open?: boolean;
}

const DialogForm: React.FC<IDialogFormProps> = ({
    scroll,
    maxWidth,
    openDialog = false,
    handleDialogClose,
    title,
    className,
    bodyContent,
    disableEnforceFocus,
    paperProps,
}) => {
    return (
        <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            className={`${className}`}
            scroll={scroll}
            maxWidth={maxWidth}
            PaperProps={paperProps}
            disableEnforceFocus={disableEnforceFocus}
        >
            {title && (
                <div className="d-flex" style={{ marginBottom: "-10px" }}>
                    <DialogTitle className='dialog-title'>
                        {title}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,

                        }}
                    >
                        <RxCross1 color='#024d81' />
                    </IconButton>
                </div>
            )}
            <div style={{maxHeight:"80vh", overflow:"auto"}}>

                {bodyContent}
            </div>  
        </Dialog>
    );
};

export default DialogForm;
