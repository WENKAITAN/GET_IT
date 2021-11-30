import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom'



const Profile = () => {
  const auth = useContext(AuthContext);
  const { user, isAuthenticated } = auth;
  let name = ""
  if(user.email){
    name = user.email
  }else{
    name = localStorage.getItem('id');
  }
  return (
    (localStorage.id || isAuthenticated) && (
      <div className="nav-item nav-link">
         <Link to="/account">{name}</Link>
      </div>
    )
  );
};
export default Profile;