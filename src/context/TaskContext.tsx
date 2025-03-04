import React, { createContext, useContext, useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  column: string;
}

interface TaskContextType {
  tasks: Task[];
  moveTask: (taskId: number, newColumn: string) => void;
  addTask: (title: string) => void;
  updateTask: (taskId: number, newTitle: string) => void;
  deleteTask: (taskId: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const moveTask = (taskId: number, newColumn: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, column: newColumn } : task
      )
    );
  };

  const addTask = (title: string) => {
    const newTask = {
      id: Date.now(),
      title,
      column: "todo",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (taskId: number, newTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, moveTask, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
