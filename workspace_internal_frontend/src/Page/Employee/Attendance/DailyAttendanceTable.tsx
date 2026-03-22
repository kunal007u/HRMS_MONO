import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IBreakDetails, IDailyLogResponseModal } from "../../../Models/attendance/attendanceM";
import { TableRowsLoader } from "../../../utils/commanFunctions";
import { DateToDateStringWithDay } from "../../../utils/dateFormat";
import "./attendance.css";
import { FaEye } from "react-icons/fa";
import { IApplicationState } from "../../../Store/state/app-state";
import { useSelector } from 'react-redux'

interface IColumn {
    data: string;
    name: string;
    width: string;
    className: string;
}

const columns: IColumn[] = [
    { data: "Date", name: "Date", width: "6%", className: "text-center" },
    { data: "In Time", name: "In Time", width: "2.5%", className: "text-center" },
    { data: "Out Time", name: "Out Time", width: "2.5%", className: "text-center" },
    { data: "Total Out Hour", name: "Total Out Hour", width: "5%", className: "text-center" },
    { data: "Time Log", name: "Time Log", width: "5%", className: "text-center" },
    { data: "Work Log", name: "Work Log", width: "5%", className: "text-center" },
    { data: "Difference[Tl/Wl]", name: "Difference[Tl/Wl]", width: "5%", className: "text-center" },
    { data: "Status", name: "Status", width: "5%", className: "text-center" }
];

interface IProps {
    employeeDailyLog: IDailyLogResponseModal[];
    isLoading: boolean;
    onView: (row) => void;
}

interface CustomedPopupProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    breakDetails: IBreakDetails[];
}

const CustomPopup = ({ anchorEl, onClose, breakDetails }: CustomedPopupProps) => {
    const [popupPosition, setPopupPosition] = useState({ top: -1500, left: 120 });

    useEffect(() => {
        if (anchorEl) {
            const rect = anchorEl.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const popupHeight = 150; // Estimate the height of your popup

            if (spaceBelow < popupHeight && spaceAbove > spaceBelow) {
                // Position above
                setPopupPosition({
                    top: rect.top - popupHeight,
                    left: rect.left
                });
            } else {
                // Position below
                setPopupPosition({
                    top: rect.bottom,
                    left: rect.left
                });
            }
        }
    }, [anchorEl]);

    return (
        <div
            style={{
                position: "fixed",
                top: popupPosition.top,
                left: popupPosition.left,
                backgroundColor: "white",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
                padding: "10px",
                zIndex: 1000,
            }}
            onMouseLeave={onClose}
        >
            <Table style={{ border: "1px solid black " }}>
                <TableHead className="table-head-popup">
                    <TableRow className="table-head-row" >
                        <TableCell className="table-head-col-popup text-center" >Time In</TableCell>
                        <TableCell className="table-head-col-popup text-center">Time Out</TableCell>
                        <TableCell className="table-head-col-popup text-center">Total Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {breakDetails.map((breakDetail, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center table-cell">{breakDetail.in || "-"}</TableCell>
                            <TableCell className="text-center table-cell">{breakDetail.out || "-"}</TableCell>
                            <TableCell className="text-center table-cell">{breakDetail.difference || "-"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

const DailyAttendanceTable = ({ employeeDailyLog, isLoading, onView }: IProps) => {
    const userData = useSelector((state: IApplicationState) => state?.UserData);
    const [popupOpen, setPopupOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [breakDetails, setBreakDetails] = React.useState<IBreakDetails[]>([]);

    const handleMouseOver = async (e: React.MouseEvent, item: IBreakDetails[]) => {
        setBreakDetails(item);
        setAnchorEl(e.currentTarget as HTMLElement);
        setTimeout(() => {
            setPopupOpen(true);
        }, 500);
    }

    const handleMouseLeave = () => {
        setTimeout(() => {
            setPopupOpen(false);
        }, 500);
    };

    const handleView = (item) => {
        onView(item);
    }

    return (
        <>

            <TableContainer className="table-container daily-attendance-table white-box  mb-1">

                <Table className="table" >
                    <TableHead className="table-head">
                        <TableRow className="table-head-row">
                            {columns?.map(({ data, name, width, className }) => (
                                <TableCell key={data} className={`table-head-col ${className}`} width={width}>
                                    {name}
                                </TableCell>
                            ))}
                            {userData?.role !== 'EMPLOYEE' && <TableCell className="table-head-col text-center" width={'5%'}>
                                Actions
                            </TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody className="table-body daily-attendance-table-body">
                        {
                            isLoading ? (
                                <TableRowsLoader rowsNum={employeeDailyLog?.length} columnsNum={columns.length} />
                            ) :
                                employeeDailyLog?.length > 0 ? (
                                    employeeDailyLog?.map((item, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                className="table-body-row"
                                                onMouseOver={(e) => handleMouseOver(e, item?.inOut)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <TableCell className="table-cell text-center">
                                                    {DateToDateStringWithDay(item?.date)}
                                                </TableCell>
                                                <TableCell className="table-cell text-center"  >
                                                    {item?.firstIn ? (item?.firstIn) : "-"}
                                                </TableCell>
                                                <TableCell className="table-cell text-center"  >
                                                    {item?.lastOut ? (item?.lastOut) : "-"}
                                                </TableCell>
                                                <TableCell className="table-cell text-center"  >
                                                    {item?.totalOutTime ? (item?.totalOutTime) : "-"}
                                                </TableCell>
                                                <TableCell className="table-cell text-center"  >
                                                    {item?.totalInTime ? (item?.totalInTime) : "-"}
                                                </TableCell>

                                                <TableCell className="table-cell text-center">
                                                    {item.workLogHours ? item.workLogHours : "-"}
                                                </TableCell>
                                                <TableCell className="table-cell text-center">
                                                    {item.tlwlDifference ? item.tlwlDifference : "-"}
                                                </TableCell>
                                                <TableCell className="table-cell text-center">
                                                    {item.status === 'Absent' && <Chip label="Absent" style={{ backgroundColor: '#ff0000c4', color: 'white', minWidth: '80px' }} />}
                                                    {item.status === 'Half Day' && <Chip label="Half Day" style={{ backgroundColor: '#ec9f00', color: 'white', minWidth: '80px' }} />}
                                                    {item.status === 'Leave' && <Chip label="Leave" style={{ backgroundColor: '#024d81', color: 'white', minWidth: '80px' }} />}
                                                    {item.status === 'Present' && <Chip label="Present" style={{ backgroundColor: '#39a78e', color: 'white', minWidth: '80px' }} />}
                                                    {item.status === 'Holiday' && <Chip label="Holiday" style={{ backgroundColor: '#c7d0db', color: 'black', minWidth: '80px' }} />}
                                                    {item.status === 'Weekend' && <Chip label="Weekend" style={{ backgroundColor: '#848383', color: 'white', minWidth: '80px' }} />}
                                                    {!item.status && '-'}
                                                </TableCell>
                                                {userData?.role !== 'EMPLOYEE' && <TableCell className="table-cell text-center">
                                                    <FaEye onClick={() => handleView(item)} style={{ color: "#024d81", cursor: "pointer", fontSize: "16px" }} />
                                                </TableCell>}
                                            </TableRow>
                                        )
                                    })
                                ) : (
                                    <TableRow className="table-not-found-row">
                                        <TableCell colSpan={12} className="table-not-found-col">
                                            <h2 className="table-no-data-found-text">
                                                No Data Found
                                            </h2>
                                        </TableCell>
                                    </TableRow>
                                )}


                    </TableBody>
                </Table>

            </TableContainer>

            {popupOpen && <CustomPopup anchorEl={anchorEl} onClose={handleMouseLeave} breakDetails={breakDetails} />}
        </>

    )
}

export default DailyAttendanceTable