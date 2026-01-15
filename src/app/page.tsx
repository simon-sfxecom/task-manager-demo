"use client";

import { useState, useCallback, useMemo } from "react";
import { Task, TaskFilter as FilterType } from "@/types/task";
import { TaskList, AddTaskForm, TaskFilter } from "@/components";

const STORAGE_KEY = "task-manager-tasks";

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<FilterType>("all");

  const addTask = useCallback((title: string, dueDate: string | null) => {
    const newTask: Task = {
      id: generateId(),
      title,
      status: "pending",
      dueDate,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => {
      const updated = [newTask, ...prev];
      saveTasks(updated);
      return updated;
    });
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) => {
      const updated: Task[] = prev.map((task) => {
        if (task.id !== id) return task;
        const newStatus: Task["status"] = task.status === "completed" ? "pending" : "completed";
        return { ...task, status: newStatus };
      });
      saveTasks(updated);
      return updated;
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => {
      const updated = prev.filter((task) => task.id !== id);
      saveTasks(updated);
      return updated;
    });
  }, []);

  const counts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }), [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Task Manager</h1>
          <p className="text-zinc-400">Keep track of your tasks and stay organized</p>
        </header>

        <div className="space-y-6">
          <AddTaskForm onAddTask={addTask} />
          
          <div className="flex items-center justify-between">
            <TaskFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              counts={counts}
            />
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
          />
        </div>
      </div>
    </main>
  );
}
