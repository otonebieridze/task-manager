import React, { useState } from "react";
import Column from "./Column";
import styles from "../styles/Board.module.css";
import { useTaskManagement } from "../hooks/useTaskManagement";

const Board: React.FC = () => {
  const {
    taskTitle,
    setTaskTitle,
    priority,
    setPriority,
    taskColumn,
    setTaskColumn,
    handleSubmit,
  } = useTaskManagement();

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className={styles.board}>
      <button className={styles["theme-toggle"]} onClick={toggleTheme}>
        {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <form onSubmit={handleSubmit} className={styles.taskForm}>
        <input
          type="text"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "High" | "Medium" | "Low")
          }
        >
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">✅ Low</option>
        </select>
        <select
          value={taskColumn}
          onChange={(e) => setTaskColumn(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <div className={styles.columns}>
        <Column title="To Do" columnId="todo" />
        <Column title="In Progress" columnId="inProgress" />
        <Column title="Done" columnId="done" />
      </div>
    </div>
  );
};

export default Board;
