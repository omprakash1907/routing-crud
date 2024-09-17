import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const userRole = sessionStorage.getItem('role'); // Retrieve role from sessionStorage

  // Fetch tasks based on the user role
  const fetchTasks = async () => {
    try {
      const endpoint = userRole === 'admin' ? "http://localhost:5000/api/tasks/all" : "http://localhost:5000/api/tasks";
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
        },
      });
      setTasks(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching tasks. Please try again.");
      console.error("Error fetching tasks:", error.response?.data || error.message);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      fetchTasks(); 
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
      setError("Error deleting task. Please try again.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userRole]);

  return (
    <div className="container mt-5">
      <div className="shadow-lg my-3 p-3 d-flex justify-content-between">
        <h2>{userRole === 'admin' ? "All Tasks" : "Your Tasks"}</h2>
        <Link to="/tasks/new" className="btn btn-danger fw-bold">Add Task +</Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      <ul className="list-group">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <p><strong>Category:</strong> {task.category}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate(`/tasks/edit/${task._id}`)} 
                >
                  Edit
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => deleteTask(task._id)} 
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">No tasks available.</li>
        )}
      </ul>
    </div>
  );
};

export default Tasks;
