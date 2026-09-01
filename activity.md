# AI Code Debugger - Project Activity & Development Log

## Overview
The AI Code Debugger is a premium developer tool built to analyze, debug, and provide learning insights on broken code. It utilizes a MERN stack (MongoDB, Express, React, Node.js) combined with an AI integration to provide intelligent, contextual, and actionable fixes.

## Key Features Developed

### 1. Secure Authentication & Global State
- Implemented `AuthContext` to manage global user state.
- Integrated a secure JWT-based login and registration flow linked directly to the Node backend.
- Protected frontend routes to ensure only authenticated users can access the dashboard and debugging workspace.

### 2. Intelligent Code Debugger Workspace
- Interactive code editor component built for users to input their broken code.
- Seamless integration with the backend `analyzeService` via the Groq SDK to fetch detailed, AI-generated insights.
- The AI Assistant breaks down the error into three main parts: **Summary**, **Root Cause**, and **Explanation**.

### 3. Comprehensive Project Management (CRUD)
- Built a native Projects dashboard allowing users to organize debugging sessions by project context.
- Full Create, Read, Update, and Delete logic implemented in both the frontend React app and backend Express routes.
- Includes a sophisticated `ProjectModal` for intuitive creation and a `ConfirmDialog` to prevent accidental deletion.

### 4. Dynamic Dashboard & History Tracking
- **Debug History View:** Automatically tracks and maps users' past AI analyses, identifying languages, resolution statuses, and timestamps.
- **Data-Driven Dashboard:** Calculates and displays real-time statistics including Total Projects, Total Analyses, Bugs Fixed, and Resolution Rates based strictly on live backend data.

### 5. Premium UI / UX Design
- Designed utilizing a flat, modern SaaS aesthetic centered around a precise `#2563EB` primary brand blue.
- Refined component styling using Tailwind CSS v4, focusing on a clean visual hierarchy, perfect spacing, and removing heavy glassmorphism and distracting neon effects.
- Implemented a unified Global Toast System (using `framer-motion`) to provide smooth notifications for all API success and error events.

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React, Framer Motion.
- **Backend:** Node.js, Express, Mongoose, Groq SDK.
- **Database:** MongoDB Atlas.
