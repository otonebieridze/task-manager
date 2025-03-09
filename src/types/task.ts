export interface Task {
  id: string;
  title: string;
  column: string;
  priority: "High" | "Medium" | "Low";
}