import React, { useState } from "react";
import Column from "./Column";
import styles from "../styles/Board.module.css";

interface Task {
  id: number;
  title: string;
  column: string;
}

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Task 1", column: "todo" },
    { id: 2, title: "Task 2", column: "todo" },
    { id: 3, title: "Task 3", column: "inProgress" },
  ]);

  const moveTask = (taskId: number, newColumn: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, column: newColumn } : task
      )
    );
  };

  return (
    <div className={styles.board}>
      <Column title="To Do" columnId="todo" tasks={tasks} onDrop={moveTask} />
      <Column
        title="In Progress"
        columnId="inProgress"
        tasks={tasks}
        onDrop={moveTask}
      />
      <Column title="Done" columnId="done" tasks={tasks} onDrop={moveTask} />
    </div>
  );
};

export default Board;
