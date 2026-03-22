
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { IAvgLogResponseModal } from "../../../Models/attendance/attendanceM";
import { TableRowsLoader } from "../../../utils/commanFunctions";

interface IColumn {
    data: string;
    name: string;
    width: string;
    className: string;
}

const columns: IColumn[] = [
    { data: "totalInTime", name: "Hours", width: "8%", className: "text-center" },
    { data: "totalOutTime", name: "Out Hours", width: "10%", className: "text-center" },
    { data: "averageInTime", name: "Avg Time Log", width: "12%", className: "text-center" },
    { data: "absentDays", name: "Absent Days", width: "10%", className: "text-center" },
    { data: "presentDays", name: "Present Days", width: "8%", className: "text-center" },
    { data: "halfDays", name: "Half Leave", width: "10%", className: "text-center" },
    { data: "lateDays", name: "Late Days", width: "10%", className: "text-center" },
    { data: "averageWorkLogHours", name: "Avg Work Log", width: "12%", className: "text-center" },
    { data: "averageTlwlDiff", name: "Avg[TL/WL]", width: "8%", className: "text-center" },

];
interface IProps {
    employeeAvgLog: IAvgLogResponseModal;
    isLoading: boolean
}

const AttendanceTable = ({ employeeAvgLog, isLoading }: IProps) => {
    return (
        <TableContainer className="table-container mb-1">
            <Table className="table">
                <TableHead className="table-head">
                    <TableRow className="table-head-row">
                        {columns.map(({ data, name, width, className }) => (
                            <TableCell key={data} className={`table-head-col ${className}`} width={width}>
                                {name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className="table-body">
                    {isLoading ? (
                        <TableRowsLoader rowsNum={1} columnsNum={columns.length} />
                    ) : employeeAvgLog?.totalInTime ? (
                        <TableRow className="table-body-row">
                            {columns.map(({ data }) => (
                                <TableCell key={data} className="table-cell text-center">
                                    {employeeAvgLog[data] || "0"}
                                </TableCell>
                            ))}
                        </TableRow>
                    ) : (
                        <TableRow className="table-not-found-row">
                            <TableCell colSpan={columns.length} className="table-not-found-col">
                                <h2 className="table-no-data-found-text">No Data Found</h2>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AttendanceTable