export interface Task {
  id: string;
  title: string;
  status: "pending" | "completed";
  dueDate: string | null;
  createdAt: string;
}

export type TaskFilter = "all" | "pending" | "completed";
