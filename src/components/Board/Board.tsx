import styles from './Board.module.css';

const Board = () => {
  return (
    <div className={styles.board}>
      <div className={styles.column}>
        <h2>To Do</h2>
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
