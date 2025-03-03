import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import styles from "../styles/Column.module.css";
import { useTasks } from "../context/TaskContext";

interface ColumnProps {
  title: string;
  columnId: string;
}

const Column: React.FC<ColumnProps> = ({ title, columnId }) => {
  const { tasks, moveTask } = useTasks();

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number }) => moveTask(item.id, columnId),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const filteredTasks = tasks.filter((task) => task.column === columnId);

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`${styles.column} ${isOver ? styles.isOver : ""}`}
    >
      <h2>{title}</h2>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} id={task.id} title={task.title} />
      ))}
    </div>
  );
};

export default Column;
