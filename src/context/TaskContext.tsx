import React, { createContext, useContext, useState } from "react";

interface Task {
  id: number;
  title: string;
  column: string;
}

interface TaskContextType {
  tasks: Task[];
  moveTask: (taskId: number, newColumn: string) => void;
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
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Task 1", column: "todo" },
    { id: 2, title: "Task 2", column: "todo" },
    { id: 3, title: "Task 3", column: "inProgress" },
  ]);

  const moveTask = (taskId: number, newColumn: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, column: newColumn } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};
