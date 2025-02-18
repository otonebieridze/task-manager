import styles from './Board.module.css';
import Task from '../Task/Task';

const Board = () => {
  const tasks = [
    { title: 'Task 1', description: 'Description for task 1' },
    { title: 'Task 2', description: 'Description for task 2' }
  ];

  return (
    <div className={styles.board}>
      <div className={styles.column}>
        <h2>To Do</h2>
        {tasks.map((task, index) => (
          <Task key={index} title={task.title} description={task.description} />
        ))}
      </div>
      <div className={styles.column}>
        <h2>In Progress</h2>
      </div>
      <div className={styles.column}>
        <h2>Done</h2>
      </div>
    </div>
  );
};

export default Board;
