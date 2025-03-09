import styles from "../styles/TaskCard.module.css";
import {
  FaExclamationCircle,
  FaExclamationTriangle,
  FaCircle,
} from "react-icons/fa";

const priorityIcons = {
  High: <FaExclamationCircle className={styles.high} />,
  Medium: <FaExclamationTriangle className={styles.medium} />,
  Low: <FaCircle className={styles.low} />,
};

export const PriorityIcon: React.FC<{
  priority: "High" | "Medium" | "Low";
}> = ({ priority }) => {
  return <span>{priorityIcons[priority]}</span>;
};
