import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  column: string;
  priority: "High" | "Medium" | "Low";
}

interface TaskContextType {
  tasks: Task[];
  moveTask: (taskId: string, newColumn: string) => void;
  addTask: (
    title: string,
    column: string,
    priority: "High" | "Medium" | "Low"
  ) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (
    taskId: string,
    newTitle: string,
    priority: "High" | "Medium" | "Low"
  ) => void;
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
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      setTasks(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task))
      );
    };
    fetchTasks();
  }, []);

  const moveTask = async (taskId: string, newColumn: string) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, column: newColumn } : task
        )
      );
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { column: newColumn });
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  const addTask = async (
    title: string,
    column: string,
    priority: "High" | "Medium" | "Low"
  ) => {
    const docRef = await addDoc(collection(db, "tasks"), {
      title,
      column,
      priority,
    });
    setTasks([...tasks, { id: docRef.id, title, column, priority }]);

    toast.success("Task added successfully!");
  };

  const updateTask = async (
    taskId: string,
    newTitle: string,
    newPriority: "High" | "Medium" | "Low"
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, title: newTitle, priority: newPriority }
          : task
      )
    );
    toast("Task updated!", { icon: "✏️", style: { background: "#FFA500" } });

    await updateDoc(doc(db, "tasks", taskId), {
      title: newTitle,
      priority: newPriority,
    });
  };

  const deleteTask = async (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.error("Task deleted!");

    await deleteDoc(doc(db, "tasks", taskId));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, moveTask, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
