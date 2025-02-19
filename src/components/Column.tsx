import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import styles from "../styles/Column.module.css";

interface ColumnProps {
  title: string;
  columnId: string;
  tasks: { id: number; title: string; column: string }[];
  onDrop: (taskId: number, newColumn: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, columnId, tasks, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number }) => onDrop(item.id, columnId),
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
      {tasks
        .filter((task) => task.column === columnId)
        .map((task) => (
          <TaskCard key={task.id} id={task.id} title={task.title} />
        ))}
    </div>
  );
};

export default Column;
