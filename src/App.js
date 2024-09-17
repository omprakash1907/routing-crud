import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './Admin-panel/Sidebar';
import Header from './Admin-panel/Header';
import Footer from './Admin-panel/Footer';
import Dashboard from './Admin-panel/Dashboard';
import Tasks from './Admin-panel/Tasks';
import Login from './Admin-panel/Login';
import Register from './Admin-panel/Register';
import ProtectedRoute from './Admin-panel/ProtectedRoute'; // Import the ProtectedRoute component
import TaskForm from './Admin-panel/TaskForm';
import EditTask from './Admin-panel/EditTask';

// Layout component to wrap the admin panel routes
const AdminLayout = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <Header /> {/* Common header for all pages */}
      <div className="d-flex flex-grow-1">
        <Sidebar /> {/* Sidebar for navigation */}
        <div className="main-content flex-grow-1">
          <div className="p-4 h-100">
            <Outlet /> {/* Renders the child route component */}
          </div>
        </div>
      </div>
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null); // For handling user authentication state

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Register />} />

        {/* Protected Admin Panel Layout with nested routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute> {/* Wrap protected routes with ProtectedRoute */}
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/new" element={<TaskForm />} />
          <Route path="tasks/edit/:id" element={<EditTask />} />
          {/* Catch-all for 404 */}
          <Route path="*" element={<h1 className="container vh-100">404 Page Error...</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
