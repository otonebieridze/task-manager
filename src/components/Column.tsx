import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import styles from "../styles/Column.module.css";

interface ColumnProps {
  title: string;
  tasks: { id: number; title: string }[];
  onDrop: (id: number) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number }) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`${styles.column} ${isOver ? styles.isOver : ""}`}
    >
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} id={task.id} title={task.title} />
      ))}
    </div>
  );
};

export default Column;
