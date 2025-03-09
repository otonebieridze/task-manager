import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export const useTaskManagement = () => {
  const { addTask } = useTasks();
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [taskColumn, setTaskColumn] = useState("todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === "") {
      setTaskTitle("");
      return;
    }
    addTask(taskTitle, taskColumn, priority);
    setTaskTitle("");
    setTaskColumn("todo");
  };

  return {
    taskTitle,
    setTaskTitle,
    priority,
    setPriority,
    taskColumn,
    setTaskColumn,
    handleSubmit,
  };
};
