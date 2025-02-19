import React, { useState } from "react";
import Column from "./Column";
import styles from "../styles/Board.module.css";

const initialTasks = [
  { id: 1, title: "Task 1" },
  { id: 2, title: "Task 2" },
  { id: 3, title: "Task 3" },
];

const Board: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDrop = (id: number) => {
    console.log("Dropped Task:", id);
  };

  return (
    <div className={styles.board}>
      <Column title="To Do" tasks={tasks} onDrop={handleDrop} />
      <Column title="In Progress" tasks={[]} onDrop={handleDrop} />
      <Column title="Done" tasks={[]} onDrop={handleDrop} />
    </div>
  );
};

export default Board;
