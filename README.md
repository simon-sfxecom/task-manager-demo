# Task Manager Demo

A simple, clean task management web app built with Next.js and Tailwind CSS.

## Features

- Task list view with title, status, and due date
- Add new tasks with optional due dates
- Mark tasks as complete/pending with visual feedback
- Filter tasks by status (All, Pending, Completed)
- Modern dark theme UI
- Local storage persistence

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Tailwind imports
│   ├── layout.tsx       # Root layout with dark theme
│   └── page.tsx         # Main task manager page
├── components/
│   ├── AddTaskForm.tsx  # Form to add new tasks
│   ├── TaskFilter.tsx   # Status filter buttons
│   ├── TaskItem.tsx     # Individual task row
│   ├── TaskList.tsx     # Task list container
│   └── index.ts         # Component exports
└── types/
    └── task.ts          # TypeScript interfaces
```
