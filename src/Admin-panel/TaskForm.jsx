import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description, category };

    try {
      // Sending the POST request to create a new task
      const response = await axios.post('http://localhost:5000/api/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Pass the JWT token
        },
      });

      setSuccess('Task created successfully!');
      setError(null);

      // Reset the form
      setTitle('');
      setDescription('');
      setCategory('');
    } catch (error) {
      setSuccess(null);
      setError('Error creating task. Please try again.');
      console.error('Error creating task:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Task</h2>
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
        <button type="submit" className="btn btn-primary">Create Task</button>
      </form>

      {/* Show success message */}
      {success && <div className="alert alert-success mt-3">{success}</div>}
      
      {/* Show error message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default TaskForm;
