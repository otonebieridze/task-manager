import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { useTasks } from "../context/TaskContext";
import styles from "../styles/TaskCard.module.css";

import {
  FaExclamationCircle,
  FaExclamationTriangle,
  FaCircle,
} from "react-icons/fa";

interface TaskCardProps {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
}

const priorityIcons = {
  High: <FaExclamationCircle className={styles.high} />,
  Medium: <FaExclamationTriangle className={styles.medium} />,
  Low: <FaCircle className={styles.low} />,
};

const TaskCard: React.FC<TaskCardProps> = ({ id, title, priority }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const { updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateTask(id, newTitle, priority);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    deleteTask(id);
  };

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`${styles.taskCard} ${isDragging ? styles.dragging : ""}`}
    >
      <div className={styles.priority}>
        {priorityIcons[priority]} {priority}
      </div>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleSaveClick}
          />
          <button onClick={handleSaveClick} className={styles["save-button"]}>
            Save
          </button>
        </div>
      ) : (
        <div onClick={handleEditClick} className={styles.taskTitle}>
          {title}
        </div>
      )}
      <button onClick={handleDeleteClick} className={styles["delete-button"]}>
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
