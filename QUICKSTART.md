# Quick Start Guide - HRMS Lite

## 🚀 Getting Started in 5 Minutes

### Step 1: Set Up Render Postgres

1. Create a Postgres database at https://render.com
2. Copy the External Database URL
3. Run the schema from:
   - backend/database/schema.sql

### Step 2: Start Backend

```bash
cd backend
npm install
npm start
```

✅ Backend running at `http://localhost:5000`

### Step 3: Start Frontend (in new terminal)

```bash
cd frontend
npm install
npm start
```

✅ Frontend opens at `http://localhost:3000`

## 🎯 First Steps in the App

1. **Go to Employees page** (Left sidebar)
2. **Add your first employee**
   - Click "➕ Add Employee"
   - Fill in details:
     - Employee ID: `EMP001`
     - Name: `John Doe`
     - Email: `john@company.com`
     - Department: `IT`
3. **Mark Attendance** (Attendance page)
   - Click "➕ Mark Attendance"
   - Select employee and date
   - Set status: Present
4. **View Dashboard** to see statistics

## 🔧 Configuration

### Backend Environment (.env)

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_render_postgres_url
```

### Frontend Environment (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📋 Test Data

### Sample Employee
```
Employee ID: EMP001
Full Name: John Doe
Email: john@company.com
Department: IT
```

### Sample Employee
```
Employee ID: EMP002
Full Name: Jane Smith
Email: jane@company.com
Department: HR
```

## ✅ Verification Checklist

- [ ] Render Postgres created
- [ ] Schema applied in database
- [ ] DATABASE_URL set
- [ ] Backend server started (port 5000)
- [ ] Frontend app started (port 3000)
- [ ] Can add employee without errors
- [ ] Can view employee in table
- [ ] Can mark attendance
- [ ] Can view attendance records
- [ ] Dashboard shows statistics

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection error | Check DATABASE_URL |
| Port 5000 already in use | Change PORT in .env or kill process using port 5000 |
| Port 3000 already in use | Use `PORT=3001 npm start` for frontend |
| CORS error | Check REACT_APP_API_URL matches backend URL |
| Module not found | Run `npm install` in both folders |
| Blank page | Check browser console for errors, ensure API is running |

## 📚 Useful Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm start           # Start server
npm run dev         # Start with auto-reload (requires nodemon)

# Frontend
cd frontend
npm install         # Install dependencies
npm start          # Start dev server
npm run build      # Build for production

# Database
# Use Render or any SQL client to inspect tables
```

## 🌐 Deployment Preview

Once deployed:
- **Backend URL**: `https://hrms-lite-backend.onrender.com`
- **Frontend URL**: `https://hrms-lite.vercel.app`

## 📖 API Endpoints Reference

```
GET  /api/employees              - List all employees
POST /api/employees              - Create employee
DELETE /api/employees/:id        - Delete employee

GET  /api/attendance             - List all attendance
POST /api/attendance             - Record attendance
GET  /api/attendance/employee/:id - Employee attendance
```

## 💡 Tips

- Use the search feature to quickly find employees
- Filter attendance by date and employee
- Check attendance summary in statistics
- Monitor present/absent/leave count in dashboard

---

Need help? Check the main README.md for detailed documentation.
