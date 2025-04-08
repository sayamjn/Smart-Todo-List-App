# Smart Todo List App

A dynamic, full-stack todo list application with time-based task management that automatically categorizes tasks based on deadlines.

Smart Todo List App

## Features

- **Manual Task Management**
  - Create and delete tasks
  - Mark tasks as complete
  - Set deadlines for tasks

- **Automatic Task Categorization**
  - **Ongoing**: Tasks with future deadlines
  - **Success**: Tasks manually marked as complete before the deadline

- **Dynamic UI**
  - Real-time countdown for ongoing tasks
  - Responsive design for mobile and desktop
  - Interactive task cards with status-based styling

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- REST API for CRUD operations
- Node-cron for scheduled task status updates

### Frontend
- Next.js (React framework)
- Tailwind CSS for styling
- TypeScript for type safety
- Custom React hooks for state management

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas cloud instance)

### Installation

1. Clone the repository
```bash
git clone https://github.com/sayamjn/Smart-Todo-List-App.git
cd Smart-Todo-List-App
```

2. Set up the backend
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/smart-todo-app
```

4. Set up the frontend
```bash
cd frontend
npm install
```

5. Create a `.env.local` file in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. In a separate terminal, start the frontend development server
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/status/:status` - Get tasks by status (ongoing, success, failure)
- `GET /api/tasks/:id` - Get a single task by ID
- `POST /api/tasks` - Create a new task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/counts/all` - Get counts of tasks by status

## Project Structure

```
smart-todo-app/
├── backend/             # Node.js + Express backend
│   ├── src/
│   │   ├── models/      # Database models
│   │   ├── routes/      # API endpoints
│   │   ├── controllers/ # Business logic
│   │   ├── services/    # Utility services
│   ├── package.json
│   └── .env
└── frontend/            # Next.js frontend
    ├── src/
    │   ├── components/  # UI components
    │   ├── pages/       # Page components
    │   ├── hooks/       # Custom React hooks
    │   └── utils/       # Utility functions
    ├── package.json
    └── .env.local
```