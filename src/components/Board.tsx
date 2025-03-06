import React, { useState } from "react";
import Column from "./Column";
import styles from "../styles/Board.module.css";
import { useTasks } from "../context/TaskContext";

const Board: React.FC = () => {
  const { addTask } = useTasks();
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === "") {
      setTaskTitle("");
      return;
    }
    addTask(taskTitle, "todo", priority);
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
