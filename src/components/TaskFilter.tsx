"use client";

import { TaskFilter as FilterType } from "@/types/task";

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export function TaskFilter({
  currentFilter,
  onFilterChange,
  counts,
}: TaskFilterProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => {
        const count = counts[filter.value];
        const isActive = currentFilter === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-zinc-700 text-zinc-100"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            }`}
          >
            {filter.label}
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                isActive ? "bg-zinc-600" : "bg-zinc-700"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
