import React from "react";
import Column from "./Column";
import styles from "../styles/Board.module.css";

const Board: React.FC = () => {
  return (
    <div className={styles.board}>
      <Column title="To Do" columnId="todo" />
      <Column title="In Progress" columnId="inProgress" />
      <Column title="Done" columnId="done" />
    </div>
  );
};

export default Board;
