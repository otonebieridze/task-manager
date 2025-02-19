import React from "react";
import { useDrag } from "react-dnd";
import styles from "../styles/TaskCard.module.css";

interface TaskCardProps {
  id: number;
  title: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`${styles.taskCard} ${isDragging ? styles.dragging : ""}`}
    >
      {title}
    </div>
  );
};

export default TaskCard;
