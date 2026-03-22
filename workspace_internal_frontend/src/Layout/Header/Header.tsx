// Header.tsx
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../Shared/components/BreadCrumbs/AppBreadcrumbs';
import { formatTitle } from '../../utils/commanFunctions';
import "./header.css";
import { Button } from '@mui/material';

function parseRouteSegments(pathname: string, id: string): { name: string }[] {
  let segments = pathname.split('/').filter(segment => segment !== '');
  
  // Remove the first two segments (http: and 192.168.29.181:3001)
  segments = segments.slice(1);
  
  // If the last segment is the same as id, remove it
  if (id && segments[segments.length - 1] === id) {
    segments.pop();
  }

  // Map the segments to the required format
  const formattedSegments = segments.map(name => ({ name }));
  
  return formattedSegments;
}


const Header = () => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const segments = parseRouteSegments(location.pathname, id);

  return (
    <div className="header white-box">
      <div className="container">
        <div className="header-content ">
          <div className="perofile-left">
            <div className="profile-component">
              <Breadcrumb
                routeSegments={segments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;