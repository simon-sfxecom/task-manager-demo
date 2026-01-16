export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "completed";
  dueDate: string | null;
  createdAt: string;
}

export type TaskFilter = "all" | "pending" | "completed";
