import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { withRouter } from 'react-router-dom';

const LogoutButton = ({history}) => {
  const auth = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("email")
    
    auth.signout().then(() => history.push('/'));

  }
  return (
    (localStorage.id || auth.isAuthenticated) && <button className="btn btn-primary" onClick={logout}>
      Log Out
    </button>
  );
};

export default withRouter(LogoutButton);