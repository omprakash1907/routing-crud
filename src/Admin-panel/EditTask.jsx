import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams(); // Get task ID from URL params
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  // Fetch task details when component mounts
  const fetchTaskDetails = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const task = response.data;
      if (!task) {
        setError("No task data found.");
        return;
      }

      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setError(null); // Clear error if successful
    } catch (error) {
      console.error("Error fetching task details:", error);
      setError("Error fetching task details.");
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  // Handle form submission to update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { title, description, category };
    const token = sessionStorage.getItem("token");

    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Navigate back to task list after updating
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Error updating task.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Task</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
