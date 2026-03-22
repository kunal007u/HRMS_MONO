import { Breadcrumbs, Typography } from '@mui/material';
import { FaChevronRight } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import store from '../../../Store/store';
import './breadcrumbs.css';

interface BreadcrumbProps {
    routeSegments: { name: string; path?: string }[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ routeSegments }) => {
    const storeData = store.getState();
    const location = useLocation();

    const customBreadcrumb = location.state?.breadcrumb;
    return (

        <Breadcrumbs
            key="breadcrumbs"
            separator={<FaChevronRight style={{ fontSize: 12 }} />}
            sx={{ display: 'flex', alignItems: 'center', position: 'relative', }
            }
        >
            <Link to={storeData?.UserData?.permissions![0]?.route || '/'} >
                <FaHome style={{ fontSize: 24, color: '#024d81' }} />
            </Link>

            {
                routeSegments
                    ? [...routeSegments, { name: customBreadcrumb, path: null }].map((route, index) => {
                        return (
                            index !== routeSegments.length - 1 && route.path ? (
                                <Link key={index} to={route.path}>
                                    <Typography className='bread-crumbs-text'>{route.name}</Typography>
                                </Link>
                            ) : (
                                <Typography key={index} className='bread-crumbs-text'>{route.name}</Typography>
                            )
                        )
                    })
                    : null
            }
        </Breadcrumbs>

    );
};

export default Breadcrumb;

// Breadcrumb.tsx
// import { Breadcrumbs, Typography } from '@mui/material';
// import { FaChevronRight, FaHome } from "react-icons/fa";
// import { FC } from 'react';
// import { Link } from 'react-router-dom';
// import store from '../../../Store/store';
// import './breadcrumbs.css';

// interface BreadcrumbProps {
//     routeSegments: { name: string; path?: string }[];
//     customBreadcrumb?: string;
// }

// const Breadcrumb: FC<BreadcrumbProps> = ({ routeSegments, customBreadcrumb }) => {
//     const storeData = store.getState();

//     return (
//         <Breadcrumbs
//             separator={<FaChevronRight style={{ fontSize: 12 }} />}
//             sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
//         >
//             <Link to={storeData?.UserData?.permissions![0]?.route || '/'}>
//                 <FaHome style={{ fontSize: 24, color: '#024d81' }} />
//             </Link>

//             {routeSegments.map((route, index) => {
//                 if (index === routeSegments.length - 1 && customBreadcrumb) {
//                     // Display custom breadcrumb for the last segment if available
//                     return (
//                         <Typography key={index} className='bread-crumbs-text'>
//                             {customBreadcrumb}
//                         </Typography>
//                     );
//                 } else {
//                     // Display other path segments
//                     return (
//                         <Link key={index} to={route.path || '#'}>
//                             <Typography className='bread-crumbs-text'>{route.name}</Typography>
//                         </Link>
//                     );
//                 }
//             })}
//         </Breadcrumbs>
//     );
// };

// export default Breadcrumb;
