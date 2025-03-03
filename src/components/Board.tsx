import React, { useState } from "react";
import Column from "./Column";
import styles from "../styles/Board.module.css";
import { useTasks } from "../context/TaskContext";

const Board: React.FC = () => {
  const { addTask } = useTasks();
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === "") {
      setTaskTitle("");
      return;
    }
    addTask(taskTitle);
    setTaskTitle("");
  };

  return (
    <div className={styles.board}>
      <form onSubmit={handleSubmit} className={styles.taskForm}>
        <input
          type="text"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
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
