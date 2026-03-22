/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ListItemText, Menu, MenuItem, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tooltip } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { FaDownload, FaEdit, FaEye, FaInfoCircle, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { IRoleRoutePermissionModel } from '../../../Models/role';
import { IApplicationState } from '../../../Store/state/app-state';
import { TableRowsLoader } from '../../../utils/commanFunctions';
import { ProviderStatus, ProviderStatusColor, ResignationStatus, ResignationStatusColor } from '../../enums/status';
import "./CustomShortingMuiTable.css";
import { MdKeyboardArrowDown, MdRadioButtonChecked } from "react-icons/md";
import ConfirmDialog from '../ConfirmDialog';
import { DateTimeToDateString, DateToDateStringWithDay } from '../../../utils/dateFormat';


interface Column {
    id: string;
    label: string;
    width?: number | string;
    className?: string
    sortable?: boolean;
    props?: string;
}

interface Row {
    [key: string]: any;
}

interface EnhancedTableProps {
    columns: Column[];
    rows: Row[];
    onEdit?: (row: Row) => void;
    onDelete?: (row: Row) => void;
    onView?: (row: Row) => void;
    onTableRowClick?: (row: Row) => void;
    onDownload?: (row: Row) => void;
    isLoading?: boolean;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    onSalaryViewClick?: (row: Row) => void;
    onStatusChange?: (row: Row) => void;
    isEditAccess?: boolean;
    isPagination?: boolean;
    isViewAction?: boolean;
    isDeleteAction?: boolean;
    isDownloadAction?: boolean;
    isInfoAction?: boolean;
    isEditAction?: boolean;
    onSwitchChange?: (event, row: Row) => void;
    onInfo?: (event, row: Row) => void;
    className?: string;
    rowsPerPage?: number;
    permission?: IRoleRoutePermissionModel;
    sortFlag?: boolean;
    order?: 'asc' | 'desc';
    orderBy?: string;
    onRequestSort?: (property: string) => void;
    editDisabled?: (row: Row) => boolean;
    deleteDisabled?: (row: Row) => boolean;
    viewDisabled?: (row: Row) => boolean;
    downloadDisabled?: (row: Row) => boolean;
    infoDisabled?: (row: Row) => boolean;
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, columns } = props;

    const createSortHandler = (property: string) => () => {
        onRequestSort(property);
    };

    return (
        <TableHead className="table-head">
            <TableRow className="table-head-row">
                {columns.map((column) => (
                    <Tooltip key={column.id} title={column.id}>
                        <TableCell width={column?.width} className={`table-head-col ${column?.className}`} >
                            {column.sortable ? (
                                <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={createSortHandler(column.id)} style={{ color: "white !important" }}>
                                    <span style={{ color: "white" }}>
                                        {column.label}
                                    </span>
                                </TableSortLabel>
                            ) : (
                                column.label
                            )}

                        </TableCell>
                    </Tooltip>
                ))}
            </TableRow>
        </TableHead>
    );
}

function CustomShortingMuiTable(props: EnhancedTableProps) {
    const {
        columns,
        rows = [],
        onEdit,
        onDelete,
        onTableRowClick,
        onView,
        onDownload,
        onSwitchChange,
        onSalaryViewClick,
        isLoading,
        rowsPerPage = 0,
        onStatusChange,
        onInfo,
        isEditAccess,
        isViewAction = false,
        isDeleteAction = false,
        isDownloadAction = false,
        isEditAction = false,
        className,
        permission,
        isInfoAction,
        sortFlag,
        order,
        orderBy,
        onRequestSort,
        editDisabled,
        deleteDisabled,
        viewDisabled,
        downloadDisabled,
        infoDisabled
    } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [background, setBackground] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    const [updateStatus, setUpdateStatus] = useState<any>();
    const [statusMenuOpen, setStatusMenuOpen] = React.useState<{ [key: string]: HTMLElement | null }>({});
    const userData = useSelector((state: IApplicationState) => state?.UserData);


    const handleEdit = (_, row: Row) => {
        onEdit(row);
        setAnchorEl(null);
    };

    const handleInfo = (e, row: Row) => {
        onInfo(e, row);
        setAnchorEl(null);
    }

    const handleDelete = (_, row: Row) => {
        onDelete(row);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTableRowClick = (_, row: Row) => {
        onTableRowClick(row);
    }
    const handleView = (_, row: Row) => {
        onView(row);
    }
    const handleDownload = (_, row: Row) => {
        onDownload(row);
    }
    const handleSwitchChange = (event, row: Row) => {
        onSwitchChange(event, row);
    }

    const sortedRows = useMemo(() => {
        if (sortFlag) {

            return rows.sort((a, b) => {
                const isAsc = order === 'asc';
                const aVal = a[orderBy];
                const bVal = b[orderBy];
                if (typeof aVal === 'string') {
                    return isAsc ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
                }
                return isAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
            }).slice(0 * (rowsPerPage || rows.length), 0 * (rowsPerPage || rows.length) + (rowsPerPage || rows.length));
        }
        else {
            return rows;
        }
    }, [rows, order, orderBy, rowsPerPage]);

    const handleStatusChange = (newStatus, row: Row) => {
        const updatedRow = { ...row, status: newStatus };
        // onStatusChange && onStatusChange(updatedRow);
        setStatusMenuOpen({});
        setOpenConfirmDialog(true);
        setUpdateStatus(updatedRow);
    };

    const handleOpenMenu = (event: React.MouseEvent<SVGElement, MouseEvent>, id: string) => {
        setStatusMenuOpen(prevState => ({ ...prevState, [id]: event.currentTarget as any }));
    };

    const handleCloseMenu = (id: string) => {
        setStatusMenuOpen(prevState => ({ ...prevState, [id]: null }))
    };

    const handleSalaryViewClick = (row: Row) => {
        onSalaryViewClick(row);
    }

    return (
        <>
            <TableContainer className="table-container mb-1  custom-table">
                <Table className={`table ${className}`}>
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={onRequestSort} columns={columns} />

                    <TableBody className="table-body">
                        {isLoading ? (
                            <TableRowsLoader rowsNum={9} columnsNum={columns?.length} />
                        ) : (
                            <>
                                {
                                    sortedRows.length !== 0 ? (
                                        sortedRows.map((row, index) => {

                                            return (

                                                <React.Fragment key={index} >
                                                    <TableRow
                                                        className="table-body-row"
                                                        // d7ecff
                                                        style={{ backgroundColor: index === background ? '#e1ebf5' : '', cursor: onTableRowClick ? 'pointer' : '' }}
                                                        onClick={(e) => handleTableRowClick(e, row)}
                                                        onMouseOver={() => setBackground(index)}
                                                        onMouseOut={() => setBackground(null)}
                                                    >
                                                        {columns.map((column) => {

                                                            if (column.id === 'actions') {
                                                                return (
                                                                    <TableCell key={column.id} className="table-cell text-center">
                                                                        <div className="ellipsis-icon d-flex gap-1 item-center justify-center">
                                                                            {(permission?.canUpdate && isEditAction) && <FaEdit onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => handleEdit(e, row)} style={{ color: "#024d81", cursor: "pointer", fontSize: "16px" }} className={(editDisabled && editDisabled(row) ? 'disabled' : "")} />}
                                                                            {(permission?.canDelete && isDeleteAction) && <FaTrash onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => handleDelete(e, row)} style={{ color: "#ff4343", cursor: "pointer", fontSize: "16px" }} className={(deleteDisabled && deleteDisabled(row) ? 'disabled' : "")} />}
                                                                            {(permission?.canRead && isViewAction) && <FaEye onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => handleView(e, row)} style={{ color: "#024d81", cursor: "pointer", fontSize: "16px" }} className={viewDisabled && viewDisabled(row) ? 'disabled' : ""} />}
                                                                            {(permission?.canRead && isInfoAction) && <FaInfoCircle onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => handleInfo(e, row)} style={{ color: "#024d81", cursor: "pointer", fontSize: "16px" }} className={infoDisabled && infoDisabled(row) ? 'disabled' : ""} />}
                                                                            {isDownloadAction && <FaDownload onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => handleDownload(e, row)} style={{ color: "green", cursor: "pointer", fontSize: "16px" }} className={downloadDisabled && downloadDisabled(row) ? 'disabled' : ""} />}
                                                                        </div>
                                                                    </TableCell>
                                                                );
                                                            } else if (column.id === 'Status') {

                                                                return (
                                                                    <TableCell key={column.id} className={`table-cell ${column?.className}`}>
                                                                        <div
                                                                            // variant="body1"
                                                                            className="status-dropdown"
                                                                            onClick={(e: any) => handleOpenMenu(e, row?.id)}
                                                                        >
                                                                            <div className='d-flex item-center'>
                                                                                <MdRadioButtonChecked style={{ fontSize: "16px", color: ProviderStatusColor[row[column.id] as keyof typeof ProviderStatusColor], marginRight: "10px" }} />
                                                                                <h5>
                                                                                    {row[column.id]}
                                                                                </h5>
                                                                            </div>

                                                                            {(isEditAccess && !(row.employeeID === userData?.id)) && <MdKeyboardArrowDown style={{ fontSize: "16px" }} />}

                                                                        </div>
                                                                        {
                                                                            (isEditAccess && !(row.employeeID === userData?.id)) && (
                                                                                <>
                                                                                    <Menu
                                                                                        anchorEl={statusMenuOpen[row.id]}
                                                                                        open={Boolean(statusMenuOpen[row.id])}
                                                                                        onClose={() => handleCloseMenu(row.id)}
                                                                                        className="status-dropdown-menu"
                                                                                    >
                                                                                        {Object.keys(ProviderStatus).map((status) => {
                                                                                            const providerColor = Object.keys(ProviderStatusColor).find((color) => {
                                                                                                return (color.toLowerCase() === ProviderStatus[status as keyof typeof ProviderStatus])
                                                                                            });
                                                                                            const color = providerColor ? ProviderStatusColor[providerColor as keyof typeof ProviderStatusColor] : 'black';
                                                                                            return (
                                                                                                <MenuItem
                                                                                                    key={ProviderStatus[status as keyof typeof ProviderStatus]}
                                                                                                    onClick={() => handleStatusChange(ProviderStatus[status as keyof typeof ProviderStatus], row)}
                                                                                                    style={{ cursor: 'pointer' }}
                                                                                                    className={
                                                                                                        (row.Status === 'approved' && (status === 'rejected' || status === 'pending' || status === 'approved') ? 'disabled' : '') ||
                                                                                                        (row.Status === 'rejected' && (status === 'rejected' || status === 'pending' || status === 'approved' || status === "cancelled") ? 'disabled' : '') ||
                                                                                                        (row.Status === "cancelled" && (status === 'rejected' || status === 'pending' || status === 'approved' || status === "cancelled") ? 'disabled' : '')

                                                                                                    }
                                                                                                >
                                                                                                    <MdRadioButtonChecked style={{ color, fontSize: "16px" }} />
                                                                                                    <ListItemText primary={status} />
                                                                                                </MenuItem>
                                                                                            );
                                                                                        })}
                                                                                    </Menu>
                                                                                </>
                                                                            )
                                                                        }

                                                                    </TableCell>
                                                                );
                                                            } else if (column.id === 'resignationStatus') {
                                                                return (
                                                                    <TableCell key={column.id} className={`table-cell ${column?.className} text-center d-flex justify-center`}>
                                                                        <div
                                                                            // variant="body1"
                                                                            className="status-dropdown"
                                                                            onClick={(e: any) => handleOpenMenu(e, row?.id)}
                                                                        >
                                                                            <div className='d-flex item-center'>
                                                                                <MdRadioButtonChecked style={{ fontSize: "16px", color: ResignationStatusColor[row[column.id] as keyof typeof ResignationStatusColor], marginRight: "10px" }} />
                                                                                <h5>
                                                                                    {row[column.id]}
                                                                                </h5>
                                                                            </div>

                                                                            {(isEditAccess && !(row.employeeID === userData?.id)) && <MdKeyboardArrowDown style={{ fontSize: "16px" }} />}

                                                                        </div>
                                                                        {
                                                                            (isEditAccess && !(row.employeeID === userData?.id)) && (
                                                                                <>
                                                                                    <Menu
                                                                                        anchorEl={statusMenuOpen[row.id]}
                                                                                        open={Boolean(statusMenuOpen[row.id])}
                                                                                        onClose={() => handleCloseMenu(row.id)}
                                                                                        className="status-dropdown-menu"
                                                                                    >
                                                                                        {Object.keys(ResignationStatus).map((status) => {
                                                                                            const providerColor = Object.keys(ResignationStatusColor).find((color) => {
                                                                                                return (color.toLowerCase() === ResignationStatus[status as keyof typeof ProviderStatus])
                                                                                            });
                                                                                            const color = providerColor ? ResignationStatusColor[providerColor as keyof typeof ResignationStatusColor] : 'black';

                                                                                            return (
                                                                                                <MenuItem
                                                                                                    key={ResignationStatus[status as keyof typeof ResignationStatus]}
                                                                                                    onClick={() => handleStatusChange(ResignationStatus[status as keyof typeof ResignationStatus], row)}
                                                                                                    style={{ cursor: 'pointer' }}
                                                                                                    className={(row.resignationStatus === 'accepted' || row?.resignationStatus === "rejected") && (status === 'pending' || status === row?.resignationStatus) ? 'disabled' : ''}
                                                                                                >
                                                                                                    <MdRadioButtonChecked style={{ color, fontSize: "16px" }} />
                                                                                                    <ListItemText primary={status} />
                                                                                                </MenuItem>
                                                                                            );
                                                                                        })}
                                                                                    </Menu>
                                                                                </>
                                                                            )
                                                                        }

                                                                    </TableCell>
                                                                );
                                                            } else if (column.id === 'PaySlip') {
                                                                return (
                                                                    <TableCell key={column.id} className={`table-cell ${column?.className}`}>
                                                                        <div className="add-btn">
                                                                            <Button className='btn' onClick={() => handleSalaryViewClick(row)} >
                                                                                <span>View</span>
                                                                            </Button>
                                                                        </div>
                                                                    </TableCell>
                                                                );

                                                            } else if (column.id === 'switches') {
                                                                return (
                                                                    <TableCell key={column.id} className={`table-cell ${column?.className} text-center`}>
                                                                        {/* <Switch onChange={(event) => handleSwitchChange(event, row)} /> */}
                                                                        <label className="switch" >
                                                                            <input type="checkbox" checked={row.switches} onChange={(event) => handleSwitchChange(event, row)} />
                                                                            <div className="slider">
                                                                                <div className="circle">
                                                                                    <svg className="cross" style={{ background: 'new 0 0 512 512' }} viewBox="0 0 365.696 365.696" y={0} x={0} height={6} width={6} version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                                                        <g>
                                                                                            <path data-original="#000000" fill="currentColor" d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0" />
                                                                                        </g>
                                                                                    </svg>
                                                                                    <svg className="checkmark" style={{ background: 'new 0 0 512 512' }} viewBox="0 0 24 24" y={0} x={0} height={10} width={10} version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                                                        <g>
                                                                                            <path data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                                                                                        </g>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </label>
                                                                    </TableCell>
                                                                );
                                                            } else if (column.id === 'date' || column.id === 'startDate' || column.id === 'endDate' || column.id === 'fromDate') {
                                                                return (
                                                                    <Tooltip key={column.id} title={row[column.id]?.length > 100 ? row[column.id] : null}>
                                                                        <TableCell key={column.id} className={`table-cell ${column?.className}`} >
                                                                            {column.props === 'day' ? (row[column.id] ? DateToDateStringWithDay(row[column.id]) : '') : column.props === 'same' ? row[column.id] : (row[column.id] ? DateTimeToDateString(row[column.id]) : '')}
                                                                        </TableCell>
                                                                    </Tooltip>
                                                                );
                                                            } else {
                                                                return (
                                                                    <Tooltip key={column.id} title={row[column.id]?.length > 100 ? row[column.id] : null}>
                                                                        <TableCell key={column.id} className={`table-cell ${column?.className}`} >
                                                                            {row[column.id]?.length > 100 ? `${row[column.id]?.substring(0, 100)}...` : row[column.id]}
                                                                        </TableCell>
                                                                    </Tooltip>
                                                                );
                                                            }
                                                        })}
                                                    </TableRow>
                                                </React.Fragment>
                                            )
                                        })
                                    ) : (
                                        <TableRow className="table-not-found-row">
                                            <TableCell colSpan={11} className="table-not-found-col">
                                                <h2 className="table-no-data-found-text">
                                                    No Data Found
                                                </h2>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }

                            </>

                        )}
                    </TableBody>

                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <div className="d-flex direction-column gap-1" style={{ width: "150px", padding: "10px" }}>
                            <MenuItem onClick={(e) => handleEdit(e, rows)} className='btn' >Edit </MenuItem>
                            <MenuItem onClick={(e) => handleDelete(e, rows)} className='btn-secondary'>Delete</MenuItem>
                        </div>
                    </Popover>
                </Table>

            </TableContainer >

            <ConfirmDialog
                title="Status Change"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={"Are you sure you want to change the status?"}
                handleSuccess={() => {
                    onStatusChange(updateStatus);
                    setOpenConfirmDialog(false);
                }}
            />
        </>

    );
}

export default React.memo(CustomShortingMuiTable);