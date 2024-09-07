import React, { useState, useEffect } from "react";

export const TodoList = () => {
  const host = 'https://playground.4geeks.com/todo';
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);

  const getTask = async () => {
    const uri = `${host}/users/joanfigueira`;

    const options = {
      method: 'GET'
    }

    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log('Error: ', response.status, response.statusText);
      return;
    }

    const data = await response.json();
    console.log('Data es = ', data);
    setList(data.todos);
  }

  const addTask = async () => {
    const uri = `${host}/todos/joanfigueira`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ label: task, done: false })
    }

    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log('Error: ', response.status, response.statusText);
      return;
    }

    const data = await response.json();
    console.log('Data es = ', data);
    setTask('');
    getTask();
  }

  const deleteTask = async (id) => {
    const uri = `${host}/todos/${id}`;

    const options = {
      method: 'DELETE'
    }

    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log(response.status);
      return;
    }

    console.log('Task deleted');
    getTask();
  }

  useEffect(() => {
    getTask();
  }, [])

  

  return (
    <div className="container">
      <h1 className="text-center mt-5">Todo List</h1>
      <input
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        placeholder="Nueva Tarea"
        className="form-control mb-2"
      />
      <button className="btn btn-primary mb-2" onClick={addTask}>Añadir Tarea</button>
      <ul className="list-group">
        {list.map((item) =>
          <li key={item.id} className="list-group-item hidden-icon d-flex justify-content-between">
            {item.label}
            <div>
              <span onClick={() => deleteTask(item.id)}>
                <i className="fas fa-trash text-danger"></i>
              </span>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}