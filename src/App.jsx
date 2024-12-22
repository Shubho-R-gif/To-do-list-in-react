import  { useState, useEffect } from "react";
import logo from "./assets/dustbin.png";
import logo1 from "./assets/green-tick.png";
import './App.css'
function App() {
  return <TodoList />;
}

export default App;

function TodoList() {
  const [tasks, setTask] = useState(() => {
    const savedItems = localStorage.getItem("tasks");
    return savedItems
      ? JSON.parse(savedItems)
      : ["Go to work", "Play video game", "Study 4pm- 6pm"];
  });
    console.log(`${tasks}`);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handelNewTask(e) {
    setNewTask(e.target.value);
  }
  function submitTask() {
    if (newTask.trim() !== "") {
      setTask((prevTasks) => [...prevTasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    setTask(tasks.filter((_, i) => i !== index));
  }

  return (
    <div className="Todo">
      <img className="logo1" src={logo1} alt="this is an image"></img>
      <br />
      <h1>To - Do List</h1>
      <label>Todo Task</label>
      <br />
      <input
        type="text"
        value={newTask}
        onChange={handelNewTask}
        placeholder="Write your todo tasks..."
      />
      <button onClick={submitTask}>Submit</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="listItems">{task}</span>
            {/*    <button onClick={() => deleteTask(index) }></button> */}
            <img
              onClick={() => deleteTask(index)}
              className="logo"
              alt="this is an image"
              src={logo}
            ></img>
          </li>
        ))}
      </ul>
    </div>
  );
}
