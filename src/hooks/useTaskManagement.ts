import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export const useTaskManagement = () => {
  const { addTask } = useTasks();
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [taskColumn, setTaskColumn] = useState("todo");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === "") {
      setTaskTitle("");
      setError(true);
      setTimeout(() => setError(false), 4000);
      return;
    }
    addTask(taskTitle, taskColumn, priority);
    setTaskTitle("");
    setTaskColumn("todo");
    setError(false);
  };

  return {
    taskTitle,
    setTaskTitle,
    priority,
    setPriority,
    taskColumn,
    setTaskColumn,
    handleSubmit,
    error,
    setError,
  };
};
