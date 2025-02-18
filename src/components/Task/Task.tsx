import React from 'react';
import styles from './Task.module.css';

interface TaskProps {
  title: string;
  description: string;
}

const Task: React.FC<TaskProps> = ({ title, description }) => {
  return (
    <div className={styles.task}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Task;
