import type { Task } from "./task";

export interface TaskContextType {
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

export type { Task }