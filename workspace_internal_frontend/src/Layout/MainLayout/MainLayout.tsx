import * as React from 'react';
import Header from '../Header/Header';
import './mainlayout.css';
import SidebarMain from '../Sidebar/Sidebar';

interface IMainLayoutProps {
    children: React.ReactElement | React.ReactElement[];
}

const MainLayout = React.memo(({ children }: IMainLayoutProps) => {
    return (
        <div className='main-layout'>
            <div className="container">
                <div className="sidebar-main relative">
                    <SidebarMain />
                </div>
                <div className='main-content-container'>
                    <div className="header-main">
                        <Header />
                    </div>
                    <div className="content-main">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
})

export default MainLayout