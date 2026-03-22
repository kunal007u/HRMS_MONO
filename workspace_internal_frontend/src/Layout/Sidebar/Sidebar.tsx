/* eslint-disable no-unsafe-optional-chaining */
import { Avatar, Box, Collapse, List, Popover } from '@mui/material'
import React from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { PiDotsThreeOutlineVerticalDuotone } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import pragetx from '../../Assets/Images/pragetx.png'
import ChangePassword from '../../Page/Account/ChangePassword'
import { Routing } from '../../Routes/routing'
import DialogForm from '../../Shared/components/DialogForm'
import { adminLogout } from '../../Store/slices/authSlice'
import { IApplicationState } from '../../Store/state/app-state'
import store from '../../Store/store'
import { ISidebarData, sidebarRoutes } from './sidebar-data'
import './sidebar.css'
import { TbPasswordFingerprint } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { useMutation } from '@tanstack/react-query'
import accountService from '../../Services/account-service'
import { toast } from 'react-toastify'

const Sidebar = () => {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state: IApplicationState) => state?.UserData);
    const [activeParentMenu, setActiveParentMenu] = React.useState<null | string>(null);
    const [activeChildMenu, setActiveChildMenu] = React.useState<null | string>(null);
    const storeData = store.getState();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null | EventTarget & HTMLDivElement>(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const open = Boolean(anchorEl);

    const logOutMutation = useMutation({
        mutationFn: accountService.logout,
        onSuccess: (response) => {
            if (response?.data?.status?.code) {
                localStorage.removeItem('Hrms-state')
                toast.success(response?.data?.status?.message);
                dispatch(adminLogout(),);
                navigate(Routing.Login)
            }
        },
        onError: (error: Error) => { console.log(error?.message) },
    });

    const handleLogout = () => logOutMutation.mutate();

    React.useEffect(() => {
        for (const route of sidebarRoutes) {
            if (pathname.startsWith(route?.route)) {
                setActiveParentMenu(route?.route);
                if (route?.childs) {
                    for (const child of route?.childs) {
                        if (pathname.startsWith(child.route)) {
                            // Use the route path instead of the ID
                            setActiveChildMenu(child.route);
                            break;
                        }
                    }
                }
                break;
            }
        }
    }, [pathname]);

    const handleChnagePassword = () => {
        setOpenDialog(true);
        setAnchorEl(null);
    }


    return (
        <aside className='sidebar' >
            <div className="sidebar-header">
                <Link to={storeData?.UserData?.permissions![0]?.route} className="sidebar-logo" >
                    <img src={pragetx} alt="logo" />
                </Link>
            </div>
            <List className="sidebar-container">
                {
                    userData?.permissions?.map((route, index) => {

                        const isActive = route.childs?.some(child => child.route === pathname) || route.route === pathname;
                        const isChildActive = route.childs?.some(child => child.childs?.some(subChild => subChild.route === pathname))

                        const handleOnClick = (routePath: string) => {
                            setActiveParentMenu(routePath === activeParentMenu ? null : routePath);
                        }

                        return route?.childs ? (
                            <React.Fragment key={route?.id}>
                                <div
                                    onClick={() => handleOnClick(route.route)}
                                    className={`${isActive ? 'active sidebar-menu-item ' : "sidebar-menu-item"}  ${activeParentMenu === route.route || isChildActive ? " sidebar-link-active-open" : ""}`}
                                >
                                    <div className="sidebar-link-item">
                                        <i className="sidebar-list-item-icon">
                                            {
                                                route.icon ? (
                                                    <img src={route.icon} alt="" />
                                                ) : null
                                            }
                                        </i>
                                        <span className="sidebar-list-item-text">{route?.name}</span>
                                    </div>
                                    <div className="sidebar-list-item-down-icon">
                                        {activeParentMenu === route.route ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                </div>

                                <Collapse in={(activeParentMenu === route.route)} timeout="auto" className={`sidebar-collapse ${(activeParentMenu === route.route) ? "child-open" : ""}`}>
                                    {
                                        route.childs?.map((child: ISidebarData) => {
                                            const isChildMenuActive = child.childs?.some(subChild => subChild.route === pathname) || child.route === pathname;
                                            const handleChildClick = (route: string) => {
                                                setActiveChildMenu(route === activeChildMenu ? null : route);
                                            }
                                            return (
                                                child?.childs ? (
                                                    <React.Fragment key={child.id}>
                                                        <div onClick={() => handleChildClick(child.route)} className={`${isChildMenuActive ? 'active subchild-sidebar-menu-item' : ""} subchild-sidebar-link subchild-sidebar-menu-item ${activeChildMenu === child.route ? "subchild-sidebar-link-active-open" : ""}`} >
                                                            <div className="subchild-sidebar-link-item">
                                                                <span className="subchild-sidebar-list-item-text">{child?.name}</span>
                                                            </div>
                                                            <div className="subchild-sidebar-list-item-down-icon">
                                                                {activeChildMenu === child.route ? <FaChevronUp /> : <FaChevronDown />}
                                                            </div>
                                                        </div>
                                                        <Collapse in={activeChildMenu === child.route} timeout="auto" className={` subchild-sidebar-collapse`} >
                                                            {child?.childs?.map((subChild: ISidebarData,) => {
                                                                return (
                                                                    <NavLink
                                                                        to={subChild?.route ? subChild?.route : ""}
                                                                        key={subChild.id}
                                                                        className={({ isActive }) => (`${isActive ? 'active sidebar-link ' : ''}  child-menu-list sidebar-link`)}
                                                                    >
                                                                        <div className="sidebar-link-item">
                                                                            <span className="subchild-sidebar-list-item-text">{subChild?.name}</span>
                                                                        </div>
                                                                    </NavLink>
                                                                )
                                                            })}
                                                        </Collapse>
                                                    </React.Fragment>
                                                ) : (
                                                    <NavLink
                                                        to={child?.route ? child?.route : ""}
                                                        key={child.id}
                                                        className={({ isActive }) => (isActive ? 'active sidebar-link' : 'sidebar-link')}
                                                    >
                                                        <div className="sidebar-link-item">
                                                            <span className="child-sidebar-list-item-text" style={{ color: "white", fontSize: "14px" }}>{child?.name}</span>
                                                        </div>
                                                    </NavLink>
                                                )
                                            )
                                        })
                                    }
                                </Collapse>
                            </React.Fragment>
                        ) : (
                            <React.Fragment key={index}>
                                <NavLink
                                    to={route?.route ? route?.route : "/"}
                                    className={({ isActive }) => (isActive ? 'active sidebar-main-menu-link' : 'sidebar-main-menu-link')}
                                    key={index}
                                >
                                    <div className="sidebar-link-item">
                                        <i className="sidebar-list-item-icon">
                                            {
                                                route.icon ? (
                                                    <img src={route.icon} alt="" />
                                                ) : null
                                            }
                                        </i>
                                        <span className="sidebar-list-item-text">{route?.name}</span>
                                    </div>
                                </NavLink>
                            </React.Fragment>

                        )
                    })
                }

            </List>
            <footer className='sidebar-footer'>
                <div className="sidebar-footer-container">
                    <div className='d-flex gap-1'>
                        <Avatar sx={{color: '#024D81'}} src={userData?.profilePicture} />
                        <div className='sidebar-footer-content'>
                            <h4>
                                {userData?.name}
                            </h4>
                            <p className='text-muted'>{userData?.role}</p>
                        </div>
                    </div>
                    <div className='sidebar-footer-content' onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <PiDotsThreeOutlineVerticalDuotone />
                    </div>
                </div>
            </footer>

            <DialogForm
                scroll="body"
                maxWidth="sm"
                paperProps={{
                    style: {
                        maxWidth: 500,
                        width: 500,
                    },
                }}
                title="Change Password"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => setOpenDialog(false)}
                bodyContent={
                    <ChangePassword
                        dialogBoxClose={() => setOpenDialog(false)}
                    />
                }
            />
            <Popover
                id={open ? 'simple-popover' : undefined}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box sx={{ p: 2 }} className="d-flex gap-1 direction-column ">
                    <div onClick={handleLogout} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}><TbLogout2 /> Log Out</div>
                    <div onClick={handleChnagePassword} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}><TbPasswordFingerprint /> Change Passowrd</div>
                </Box>
            </Popover>


        </aside >
    )
}

export default Sidebar