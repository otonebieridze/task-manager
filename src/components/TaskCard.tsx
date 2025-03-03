import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { useTasks } from "../context/TaskContext";
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
    updateTask(id, newTitle);
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
        <div onClick={handleEditClick}>{title}</div>
      )}
      <button onClick={handleDeleteClick} className={styles["delete-button"]}>
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
