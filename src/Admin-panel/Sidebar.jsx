import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage and sessionStorage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="sidebar bg-dark text-white p-3 d-flex flex-column h-100">
      <ul className="nav flex-column flex-grow-1">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link text-white">Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/users" className="nav-link text-white">Users</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/tasks" className="nav-link text-white">Tasks</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/settings" className="nav-link text-white">Settings</NavLink>
        </li>
      </ul>
      <div className="mt-auto">
        <button onClick={handleLogout} className="btn btn-danger w-100">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
