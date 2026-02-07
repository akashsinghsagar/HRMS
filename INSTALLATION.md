# Installation & Setup Guide - HRMS Lite

Step-by-step guide to install and run HRMS Lite on your system.

## 📋 Prerequisites

Before you start, ensure you have:
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** v6+ (comes with Node.js)
- **Render Postgres** database
- **Git** (For version control)
- **Code Editor** (VS Code recommended)

**Verify Installation:**
```bash
node --version
npm --version
Render Postgres ready
```

## 🗄️ Step 1: Set Up Render Postgres

1. Create a Postgres database at https://render.com
2. Copy the External Database URL
3. Run the schema from:
   - backend/database/schema.sql

## 📦 Step 2: Backend Setup

### 2.1 Install Dependencies

**Windows/Mac/Linux:**
```bash
cd backend
npm install
```

This will install:
- express
- cors
- dotenv
- express-validator

### 2.2 Configure Environment Variables

Edit or create `backend/.env`:

```env
DATABASE_URL=your_render_postgres_url
PORT=5000
NODE_ENV=development
```

### 2.3 Start Backend Server

```bash
npm start
```

**Expected Output:**
```
HRMS Lite Backend running on port 5000
Environment: development
```

✅ **Backend is running!** Visit: http://localhost:5000/api/health

You should see:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## 🎨 Step 3: Frontend Setup

### 3.1 Open a New Terminal

Keep the backend running in the first terminal, open a second terminal.

### 3.2 Install Dependencies

```bash
cd frontend
npm install
```

This will install:
- react
- axios
- react-scripts

### 3.3 Configure Environment Variables

Edit or create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3.4 Start Frontend Development Server

```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view hrms-lite-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ **Frontend is running!** Browser opens automatically at: http://localhost:3000

---

## ✅ Step 4: Verify Everything Works

### 4.1 Test in Browser

1. Open http://localhost:3000
2. You should see the HRMS Lite application
3. Sidebar with Dashboard, Employees, Attendance

### 4.2 Create Test Employee

1. Click **Employees** in sidebar
2. Click **"➕ Add Employee"** button
3. Fill in the form:
   ```
   Employee ID: EMP001
   Full Name: John Doe
   Email: john.doe@company.com
   Department: IT
   ```
4. Click **"Add Employee"**
5. ✅ You should see success message
6. ✅ Employee appears in table

### 4.3 Mark Test Attendance

1. Click **Attendance** in sidebar
2. Click **"➕ Mark Attendance"** button
3. Select the employee you just created
4. Select today's date
5. Set status to **"Present"**
6. Click **"Record Attendance"**
7. ✅ You should see success message
8. ✅ Record appears in table

### 4.4 View Dashboard

1. Click **Dashboard** in sidebar
2. ✅ You should see KPI cards with statistics
3. ✅ Department distribution shows "IT: 1"
4. ✅ Recent attendance shows your record

---

## 🔧 Troubleshooting

### Backend Issues

**Problem: "Port 5000 already in use"**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

**Problem: Database Connection Error**
1. Check DATABASE_URL in `.env`
2. Ensure the Render database is active
3. Verify the schema is applied (backend/database/schema.sql)

**Problem: Module not found errors**
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Frontend Issues

**Problem: "Cannot find module" errors**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

**Problem: Blank page or 404**
1. Check backend is running (`npm start` in backend folder)
2. Check REACT_APP_API_URL in `.env`
3. Open browser DevTools > Console for errors

**Problem: Port 3000 already in use**
```bash
# Use different port
PORT=3001 npm start
```

**Problem: API calls failing (404 errors)**
1. Check backend server is running
2. Verify API URL matches backend address
3. Check network tab in DevTools
4. Look at backend console for errors

---

## 🚀 Next Steps

### Option 1: Continue Development

```bash
# Keep both servers running in separate terminals
# Backend: npm start (in backend folder)
# Frontend: npm start (in frontend folder)

# Make changes, they auto-reload
# Test your changes
# Commit to git
```

### Option 2: Deploy to Production

See **README.md** for deployment instructions:
- Deploy backend to Render.com
- Deploy frontend to Vercel
- Connect them with live URLs

### Option 3: Explore the Code

1. Review structure in [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. Read development guide: [DEVELOPMENT.md](DEVELOPMENT.md)
3. Check API documentation: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
4. Follow testing guide: [TESTING_GUIDE.md](TESTING_GUIDE.md)

---

## 📝 Files Reference

### Backend File Structure
```
backend/
├── config/database.js       # Postgres client
├── database/
│   └── schema.sql           # Postgres schema
├── routes/
│   ├── employees.js
│   └── attendance.js
├── server.js               # Main file
├── package.json
├── .env                    # Environment variables
└── .gitignore
```

### Frontend File Structure
```
frontend/
├── public/index.html
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── services/api.js     # API client
│   ├── App.js              # Main component
│   └── index.js            # Entry point
├── package.json
├── .env                    # Environment variables
└── .gitignore
```

---

## 💻 Development Workflow

### 1. Start Development Session

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 2. Make Changes

- Edit backend files → auto-reload (if using nodemon)
- Edit frontend files → auto-reload instantly

### 3. Test Changes

1. Use browser DevTools
2. Check console for errors
3. Test API in Postman if needed
4. Verify in UI

### 4. Commit Changes

```bash
git add .
git commit -m "Add feature description"
git push origin main
```

---

## 📊 Database Inspection (Render Postgres)

1. Open your Render database dashboard
2. Use the provided connection info with any SQL client
3. View `employees` and `attendance` tables

---

## ⚙️ Advanced Configuration

### Enable Auto-Reload for Backend

```bash
npm install -g nodemon
npm run dev
```

Or add to `package.json`:
```json
"scripts": {
  "dev": "nodemon server.js"
}
```

### Change Default Ports

**Backend:** Edit `backend/.env`
```env
PORT=8000
```

**Frontend:** Use environment variable
```bash
PORT=3001 npm start
```

### Use Production Database

Edit `backend/.env`
```env
NODE_ENV=production
DATABASE_URL=your_render_postgres_url
```

---

## ✨ Tips & Best Practices

1. **Always keep `.env` files out of version control**
   - Already in `.gitignore`
   - Never commit sensitive data

2. **Use meaningful commit messages**
   ```bash
   git commit -m "Add employee delete functionality"
   ```

3. **Test before committing**
   - Add employee successfully
   - Mark attendance
   - Verify in dashboard

4. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

5. **Monitor console for errors**
   - Backend: Terminal console
   - Frontend: Browser DevTools

6. **Use consistent formatting**
   - VSCode extensions: Prettier, ESLint
   - Format on save

---

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs:**
   - Backend console messages
   - Browser DevTools console
   - Network tab

2. **Review documentation:**
   - README.md - Main documentation
   - API_DOCUMENTATION.md - API reference
   - DEVELOPMENT.md - Developer guide

3. **Common solutions:**
   - Restart both servers
   - Clear browser cache (Ctrl+Shift+Delete)
   - Check database connection
   - Verify `.env` files

4. **Search online:**
   - Postgres errors
   - Express.js issues
   - React problems

---

## ✅ Installation Checklist

- [ ] Node.js and npm installed
- [ ] Render Postgres created
- [ ] Schema applied
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] Can create employee in UI
- [ ] Can mark attendance in UI
- [ ] Can view dashboard
- [ ] No console errors

✅ **All done!** Your HRMS Lite is ready to use.

---

## 🎯 What to Do Next

1. **Explore the application** - Try all features
2. **Review the code** - Understand the architecture
3. **Test thoroughly** - Use TESTING_GUIDE.md
4. **Customize** - Add your logo, colors, fields
5. **Deploy** - Share with others (see README.md)
6. **Extend** - Add new features (see DEVELOPMENT.md)

---

**Enjoy building with HRMS Lite!** 🎉

For questions, refer to the comprehensive documentation provided with the project.
