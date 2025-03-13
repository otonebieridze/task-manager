import React from "react";
import Column from "./Column";
import styles from "../styles/Board.module.css";
import { useTaskManagement } from "../hooks/useTaskManagement";
import ThemeToggle from "./ThemeToggle";

const Board: React.FC = () => {
  const {
    taskTitle,
    setTaskTitle,
    priority,
    setPriority,
    taskColumn,
    setTaskColumn,
    handleSubmit,
    error,
    setError,
  } = useTaskManagement();

  return (
    <div className={styles.board}>
      <ThemeToggle />

      <form onSubmit={handleSubmit} className={styles.taskForm}>
        <input
          type="text"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.target.value);
            setError(false);
          }}
          className={error ? styles["input-error"] : ""}
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
        {error && (
          <p className={styles["error-message"]}>Task title cannot be empty!</p>
        )}
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
