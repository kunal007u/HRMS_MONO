import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogout } from "../Store/slices/authSlice";
import store from "../Store/store";
import { Routing } from "./routing";

/**
 * This function is used to protect routes in a React application.
 * It checks if the user is authenticated by accessing the state from the Redux store.
 * If the user is not authenticated, it dispatches an action to log out the user and redirects them to the login page.
 * If the user is authenticated, it renders the provided element.
 *
 * @param {React.Component} element - The React component to be rendered if the user is authenticated.
 * @returns {React.Component} - The protected route component.
 */
const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const state = store?.getState();

  const isAuthenticated = state?.UserData?.token;

  if (!isAuthenticated) {
    dispatch(adminLogout());
    return <Navigate to={Routing.Login} />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
