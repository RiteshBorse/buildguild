# BuildGuild - Construction Management System

## Overview

**BuildGuild** is a full-featured **Construction Management System** designed to streamline the tracking and management of construction projects. It includes modules for project tracking, financials, materials, and administration, providing real-time data visualization, secure authentication, and a responsive, intuitive UI. This documentation provides an in-depth look at the code structure, functionality, and expected future features.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Core Functionalities](#core-functionalities)
   - Project Tracking
   - User Authentication
   - Dashboard and Real-Time Status
   - File Uploads and Attachments
   - Data Visualization
4. [Installation and Setup](#installation-and-setup)
5. [API Endpoints](#api-endpoints)
6. [State Management](#state-management)
7. [Known Issues](#known-issues)
8. [Future Functionalities](#future-functionalities)
9. [Contributing](#contributing)
10. [License](#license)

---

## Tech Stack

### Frontend
- **Framework**: Vite + React (Fast development with a focus on modularity and performance)
- **CSS**: TailwindCSS for utility-first CSS and responsive design
- **State Management**: Zustand for simple and scalable global state management
- **Routing**: React Router for page navigation
- **Form Validation**: Zod for schema-based form validation
- **Animations**: Radix UI for accessible components and TailwindCSS animations

### Backend
- **Backend Framework**: Express (to be integrated)
- **Database**: MongoDB for project data storage and retrieval (to be integrated)
- **File Storage**: Cloudinary for storing and managing project-related files and media
- **API Requests**: Axios for secure HTTP requests with credentials handling

---

## Core Functionalities

### 1. Project Management & Tracking
- **Create Projects**: Users can create new construction projects, providing a project name, location, and other details.
- **View Projects**: Users can view a list of their projects, with options to filter by status, type, or other attributes.
- **Dashboard**: Each project has a dashboard that shows key metrics such as financials, material usage, and project progress.
  
### 2. User Authentication
- **Login/Signup**: User authentication is handled through a secure session management system using **Zustand**. Users can sign up, log in, and log out, with support for session cookies.
- **Forgot Password**: A forgot password flow that allows users to reset their password via email verification.

### 3. Real-Time Status Updates & Network Monitoring
- **Network Status**: The app monitors network status, providing feedback to users if they go offline or come back online.
- **Real-Time Notifications**: Toast notifications inform users of important events (e.g., successful logins, project creation, or errors).

### 4. File Uploads and Attachments
- **File Management**: Users can upload and attach files (such as blueprints, permits, contracts) to their projects.
- **Cloud Storage**: Uploaded files are stored on **Cloudinary** for easy access and management.

### 5. Data Visualization & Analytics
- **Project Data Visualization**: Use of **Recharts** for data visualization (e.g., financial progress, material usage charts).
- **Real-Time Data**: Project dashboards update in real-time, providing up-to-date information on construction progress.

---

## Installation and Setup

### Prerequisites:
- **Node.js** (>=14.0.0) and npm installed on your machine.

### Steps to Set Up the Project:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/RiteshBorse/buildguild.git
   cd frontend
   cd backend
   npm install
   npm run dev
