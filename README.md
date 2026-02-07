# HRMS - Human Resource Management System

A modern, full-stack HR management application for managing employees and tracking attendance with real-time analytics.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## 🚀 Live Demo

**Frontend:** [https://hrms-official.vercel.app](https://hrms-official.vercel.app)  
**Backend API:** [https://hrms-zln1.onrender.com](https://hrms-zln1.onrender.com)

## ✨ Features

### 🎨 Beautiful Landing Page
- Animated iridescence background with WebGL
- Modern glass-morphism design
- Responsive layout for all devices
- Call-to-action buttons and feature showcase

### 📊 Interactive Dashboard
- Real-time KPI cards (Total Employees, Present, Absent, Leave)
- 4 Interactive Charts:
  - **Attendance Trends** - Line chart showing last 7 days
  - **Status Distribution** - Doughnut chart of overall breakdown
  - **Department Distribution** - Pie chart of employees by department
  - **Attendance Rate by Department** - Bar chart with percentages
- Animated gradient background
- Recent attendance records table

### 👥 Employee Management
- Add, edit, and delete employees
- Employee details: ID, Name, Email, Department, Join Date
- 7 Departments: IT, HR, Finance, Operations, Sales, Marketing, Customer Support
- Unique employee ID and email validation
- Search and filter functionality

### 📅 Attendance Tracking
- Mark attendance with three statuses: Present, Absent, Leave
- Date-based attendance records
- Filter by employee and date range
- Add optional remarks for each record
- Attendance summary and statistics
- Duplicate date prevention per employee

### 🎯 Additional Features
- Professional UI with Tailwind CSS
- Form validation on all inputs
- Loading states and error handling
- Responsive design (mobile, tablet, desktop)
- Toast notifications for user actions
- Modal dialogs for confirmations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS 3** - Utility-first CSS framework
- **Chart.js** with **react-chartjs-2** - Data visualization
- **OGL** - WebGL library for animated backgrounds
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js
- **express-validator** - Input validation middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Deployment & Hosting
- **Frontend:** Vercel (Automatic deployments from GitHub)
- **Backend:** Render.com (Free tier)
- **Database:** Render PostgreSQL (Free tier)

## 📁 Project Structure

```
HRMS/
├── backend/
│   ├── config/
│   │   └── database.js          # PostgreSQL connection pool
│   ├── database/
│   │   └── schema.sql            # Database schema
│   ├── routes/
│   │   ├── employees.js          # Employee CRUD endpoints
│   │   └── attendance.js         # Attendance CRUD endpoints
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server setup
│   ├── setup-db.js               # Database initialization script
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.js          # Alert notifications
│   │   │   ├── Iridescence.js    # WebGL background animation
│   │   │   ├── Layout.js         # Main app layout with sidebar
│   │   │   ├── LoadingSpinner.js # Loading indicator
│   │   │   └── Modal.js          # Confirmation dialogs
│   │   ├── pages/
│   │   │   ├── Landing.js        # Landing page
│   │   │   ├── Dashboard.js      # Analytics dashboard
│   │   │   ├── Employees.js      # Employee management
│   │   │   └── Attendance.js     # Attendance tracking
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.js                # Main app component
│   │   ├── App.css               # App styles
│   │   └── index.css             # Global styles + Tailwind
│   ├── .env.production           # Production environment vars
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── postcss.config.js         # PostCSS configuration
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/akashsinghsagar/HRMS.git
cd HRMS
```

**2. Setup Backend**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@host:port/database
```

Run the database setup script:
```bash
node setup-db.js
```

Start the backend server:
```bash
npm start
```
Backend will run on `http://localhost:5000`

**3. Setup Frontend**
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory (optional for local development):
```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm start
```
Frontend will open at `http://localhost:3000`

## 📡 API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/employee/:employeeId` - Get attendance by employee
- `GET /api/attendance/summary` - Get attendance summary stats
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance record
- `DELETE /api/attendance/:id` - Delete attendance record

## 🗄️ Database Schema

### Employees Table
```sql
- id (UUID, Primary Key)
- employee_id (Text, Unique)
- full_name (Text)
- email (Text, Unique)
- department (Text)
- join_date (Date)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Attendance Table
```sql
- id (UUID, Primary Key)
- employee_id (UUID, Foreign Key → employees.id)
- date (Date)
- status (Text: Present/Absent/Leave)
- remarks (Text)
- created_at (Timestamp)
- updated_at (Timestamp)
- UNIQUE constraint on (employee_id, date)
```

## 🌐 Deployment

### Deploy Backend to Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NODE_ENV` - `production`
   - `PORT` - `5000`

### Deploy Frontend to Vercel
1. Import project from GitHub
2. Set Root Directory: `frontend`
3. Framework Preset: Create React App
4. Add environment variable:
   - `REACT_APP_API_URL` - Your Render backend URL
5. Deploy

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## 🐛 Troubleshooting

**Backend won't start:**
- Check if `DATABASE_URL` is set correctly
- Verify PostgreSQL database is running
- Ensure port 5000 is not in use

**Frontend API errors:**
- Check if backend is running and accessible
- Verify `REACT_APP_API_URL` is set correctly
- Check browser console for CORS errors

**Database connection issues:**
- Ensure SSL is enabled for remote connections
- Verify database credentials
- Check if database accepts external connections

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Akash Singh Sagar**
- GitHub: [@akashsinghsagar](https://github.com/akashsinghsagar)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

Built with ❤️ using React, Express, PostgreSQL, and Tailwind CSS
