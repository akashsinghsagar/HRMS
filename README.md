# HRMS Lite - Human Resource Management System

A professional, production-ready HRMS web application built with React, Express.js, and Render Postgres. Designed to manage employees and attendance with a clean, corporate UI inspired by DarwinBox.

## 🚀 Features

### Employee Management
- ✅ Add, View, Edit, and Delete employees
- ✅ Unique Employee ID validation
- ✅ Email validation and duplicate prevention
- ✅ Department assignment (IT, HR, Finance, Operations, Sales, Marketing, Customer Support)
- ✅ Search and filter employees
- ✅ Professional employee table with sortable columns

### Attendance Management
- ✅ Mark attendance (Present/Absent/Leave)
- ✅ View attendance records per employee
- ✅ Filter by employee and date
- ✅ Real-time attendance statistics (Today's summary)
- ✅ Attendance history tracking

### Dashboard
- 📊 KPI cards showing total employees, present, absent, and leave count
- 📈 Department distribution visualization
- 📋 Recent attendance records
- 🎯 Overall attendance statistics

## 🛠️ Tech Stack

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: Render Postgres
- **Validation**: express-validator
- **API**: RESTful with proper HTTP status codes

### Frontend
- **Framework**: React 18 with Functional Components
- **HTTP Client**: Axios
- **Styling**: Custom CSS with professional design
- **State Management**: React Hooks (useState, useEffect)

## 📋 Project Structure

```
HRMS/
├── backend/
│   ├── config/
│   │   └── database.js          # Postgres client
│   ├── routes/
│   │   ├── employees.js         # Employee API routes
│   │   └── attendance.js        # Attendance API routes
│   ├── database/
│   │   └── schema.sql            # Postgres schema
│   ├── server.js                # Main server file
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Modal.js         # Modal component
│   │   │   ├── Alert.js         # Alert messages
│   │   │   └── LoadingSpinner.js
│   │   ├── services/
│   │   │   └── api.js           # API client
│   │   ├── pages/
│   │   │   ├── Dashboard.js     # Dashboard page
│   │   │   ├── Employees.js     # Employee management
│   │   │   └── Attendance.js    # Attendance management
│   │   ├── App.js               # Main app component
│   │   ├── index.js
│   │   ├── index.css            # Global styles
│   │   └── App.css
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── README.md
```

## 📝 API Endpoints

### Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get single employee |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendance` | Get all attendance records |
| GET | `/api/attendance/employee/:employeeId` | Get employee's attendance |
| POST | `/api/attendance` | Record new attendance |
| PUT | `/api/attendance/:id` | Update attendance |
| DELETE | `/api/attendance/:id` | Delete attendance |
| GET | `/api/attendance/summary/:employeeId` | Get attendance summary |

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Render Postgres database
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create/Edit `.env` file:
   ```env
   DATABASE_URL=your_render_postgres_url
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   npm start
   # or for development with auto-reload
   npm install -g nodemon
   npm run dev
   ```

   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create/Edit `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   Frontend runs on `http://localhost:3000`

## 🗄️ Database Setup (Render Postgres)

1. Create a Postgres database at [Render](https://render.com)
2. Copy the External Database URL
3. Run the schema:
   - backend/database/schema.sql
4. Update `.env` with the DATABASE_URL

## 🚀 Deployment

### Backend Deployment (Using Render.com)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/hrms-lite.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [Render.com](https://render.com)
   - Connect your GitHub repository
   - Create New > Web Service
   - Select the `backend` directory
   - Set Build Command: `npm install`
   - Set Start Command: `npm start`
   - Add Environment Variables:
      ```
      DATABASE_URL=your_render_postgres_url
      NODE_ENV=production
      PORT=5000
      ```
   - Deploy

3. **Get Backend URL**
   - After deployment, copy your service URL (e.g., `https://hrms-lite-backend.onrender.com`)

### Frontend Deployment (Using Vercel)

1. **Push to GitHub**
   - Same as above

2. **Deploy on Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `frontend` directory
   - Set environment variables:
     ```
     REACT_APP_API_URL=https://hrms-lite-backend.onrender.com/api
     ```
   - Deploy

3. **Alternative: Netlify**
   - Go to [Netlify](https://netlify.com)
   - Import repository and select `frontend` directory
   - Build command: `npm run build`
   - Publish directory: `build`
   - Add environment variables and deploy

## 🔧 Validation & Error Handling

### Backend Validations
- ✅ Required field validation
- ✅ Email format validation (RFC compliant)
- ✅ Unique Employee ID constraint
- ✅ Unique email constraint
- ✅ Department enum validation
- ✅ Graceful error messages

### Frontend Validations
- ✅ Real-time form validation
- ✅ Email format checking
- ✅ Required field checking
- ✅ API error handling with user-friendly messages
- ✅ Loading states for async operations

## 🎨 UI/UX Features

- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🎨 **Professional Color Scheme**: Blue accent (#2563eb) with clean whites
- ✨ **Smooth Animations**: Subtle transitions and fade effects
- 📊 **Data Visualization**: Charts, stats cards, and tables
- 🔔 **Alert System**: Success, error, warning, and info notifications
- 🎯 **Empty States**: User-friendly messages for empty data
- ⌛ **Loading States**: Spinner while fetching data
- ♿ **Accessibility**: Semantic HTML and keyboard navigation

## 📱 User Guide

### Adding an Employee
1. Click "Employees" in sidebar
2. Click "➕ Add Employee" button
3. Fill in the form with:
   - Employee ID (unique)
   - Full Name
   - Email Address
   - Department
4. Click "Add Employee"

### Marking Attendance
1. Click "Attendance" in sidebar
2. Click "➕ Mark Attendance" button
3. Select employee, date, and status
4. Add optional remarks
5. Click "Record Attendance"

### Viewing Dashboard
1. Click "Dashboard" in sidebar
2. See KPIs and statistics
3. View department distribution
4. Check recent attendance records

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure the Render database is active
- Check `.env` file for correct `DATABASE_URL`

### CORS Errors
- Ensure backend is running on correct port
- Check `REACT_APP_API_URL` in frontend `.env`

### Port Already in Use
- Change port in backend `.env`
- For frontend, use: `PORT=3001 npm start`

### Module Not Found
- Run `npm install` in both frontend and backend directories
- Delete `node_modules` and `package-lock.json`, then reinstall

## 📄 Environment Variables Reference

**Backend (.env)**
```env
DATABASE_URL=your_render_postgres_url
PORT=5000
NODE_ENV=development
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔒 Security Notes

- Backend uses environment variables for sensitive data
- Input validation on both client and server
- No authentication required (as per requirements - single admin)
- CORS enabled to allow frontend requests
- Proper HTTP status codes and error handling

## 📈 Future Enhancements

- User authentication and role-based access
- Advanced reporting and analytics
- Bulk attendance import (CSV)
- Leave management module
- Salary management
- Performance reviews
- Email notifications
- Dark mode support

## 📞 Support & Documentation

- API documentation available at `/api/health` endpoint
- Check console logs for debugging
- Review validation error messages for form issues

## 📄 License

This project is created for demonstration purposes.

---

**Built with ❤️ for HR Management**
