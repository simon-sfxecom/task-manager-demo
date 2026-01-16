"use client";

import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  const isCompleted = task.status === "completed";
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
        isCompleted
          ? "bg-zinc-50/50 border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800"
          : "bg-zinc-50 border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-600"
      }`}
    >
      <button
        onClick={() => onToggleComplete(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isCompleted
            ? "bg-green-600 border-green-600"
            : "border-zinc-400 hover:border-green-500 dark:border-zinc-500"
        }`}
        aria-label={isCompleted ? "Mark as pending" : "Mark as complete"}
      >
        {isCompleted && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`font-medium truncate ${
            isCompleted ? "text-zinc-400 line-through dark:text-zinc-500" : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {task.title}
        </p>
        {task.dueDate && (
          <p
            className={`text-sm mt-1 ${
              isCompleted ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            Due: {formatDate(task.dueDate)}
          </p>
        )}
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        aria-label="Delete task"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
