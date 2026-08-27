# WorkspaceHub

WorkspaceHub is a full-stack MERN application built with TypeScript on both the client and server. It supports multi-tenant organizations, role-based access control, project and task management, interactive task comments, booking schedules, and per-organization feature flags.

**Live Demo:** [https://ai-se-project-workspacehub-client-two.vercel.app](https://ai-se-project-workspacehub-client-two.vercel.app)

## Features

- **Multi-Tenant Organizations:** Isolated data, workspaces, and role-based permissions (Owner, Admin, Member).
- **Task Comments:** Real-time collaboration allowing members to add and manage comments on individual tasks.
- **Project & Task Management:** Create, update, assign, and track project status and task deadlines across workspaces.
- **Resource Bookings:** Interactive booking system with backend overlap prevention.
- **Feature Flags:** Per-organization feature flags to toggle optional functionality (e.g., Scheduling, Advanced Reports, Custom Branding).
- **JWT Authentication:** Secure user registration, authentication, and session management.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Context API
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB, Mongoose
- **Deployment:** Vercel
- **Authentication:** JWT (JSON Web Tokens)

## Project Structure

```text
workspacehub/
  client/
  server/
  
