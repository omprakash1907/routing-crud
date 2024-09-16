import React, { useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', status: 'Pending' },
    { id: 2, title: 'Task 2', status: 'Completed' },
  ]);

  return (
    <div className="p-4">
      <h3>Task Management</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
