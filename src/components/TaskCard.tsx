import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { useTasks } from "../context/TaskContext";
import styles from "../styles/TaskCard.module.css";
import { TaskCardProps } from "../types/taskCard";
import { PriorityIcon } from "./PriorityIcon";

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
        <PriorityIcon priority={priority} />{" "}
        <span
          className={
            styles[priority.charAt(0).toLowerCase() + priority.slice(1)]
          }
        >
          {priority}
        </span>
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
