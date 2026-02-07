# Development Guide - HRMS Lite

Guide for extending and customizing HRMS Lite.

## 🏗️ Architecture Overview

### Backend Architecture
```
Express Server
    ↓
Routes (Employees, Attendance)
    ↓
Controllers/Business Logic
  ↓
PostgreSQL (Render)
```

### Frontend Architecture
```
React App
    ↓
Pages (Dashboard, Employees, Attendance)
    ↓
Components (Modal, Alert, etc.)
    ↓
API Service
    ↓
Backend APIs
```

## 🔧 Backend Development

### Adding a New Table (PostgreSQL)

**Example: Salary Management**

1. Add a new table in `backend/database/schema.sql`:
```sql
create table if not exists public.salary (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  base_salary numeric not null,
  month text not null,
  deductions numeric default 0,
  bonus numeric default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Adding New Routes

**Example: Salary API Routes**

1. Create `backend/routes/salary.js`:
```javascript
const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Get salary for employee
router.get('/employee/:employeeId', async (req, res) => {
  try {
    const result = await db.query(
      'select id, base_salary, month, deductions, bonus, employee_id from salary where employee_id = $1 order by month desc',
      [req.params.employeeId]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Record salary
router.post('/', async (req, res) => {
  try {
    const result = await db.query(
      'insert into salary (employee_id, base_salary, month, deductions, bonus) values ($1, $2, $3, $4, $5) returning *',
      [
        req.body.employee_id,
        req.body.base_salary,
        req.body.month,
        req.body.deductions || 0,
        req.body.bonus || 0,
      ]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

2. In `backend/server.js`, add the route:
```javascript
app.use('/api/salary', require('./routes/salary'));
```

## 🎨 Frontend Development

### Adding a New Page

**Example: Salary Management Page**

1. Create `frontend/src/pages/Salary.js`:
```javascript
import React, { useState, useEffect } from 'react';
import { getEmployees } from '../services/api';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import './Salary.css';

function Salary() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Salary Management</div>
      </div>
      {/* Content here */}
    </div>
  );
}

export default Salary;
```

2. Add to `frontend/src/App.js`:
```javascript
import Salary from './pages/Salary';

// In the navigation
<div
  className={`nav-item ${currentPage === 'salary' ? 'active' : ''}`}
  onClick={() => setCurrentPage('salary')}
>
  <span className="nav-icon">💰</span>
  Salary
</div>

// In the renderPage function
case 'salary':
  return <Salary />;
```

### Adding a New Component

**Example: Confirmation Dialog**

1. Create `frontend/src/components/ConfirmDialog.js`:
```javascript
import React from 'react';

function ConfirmDialog({ title, message, onConfirm, onCancel, show }) {
  if (!show) return null;

  return (
    <>
      <div className="modal-overlay active" onClick={onCancel} />
      <div className="modal-overlay active" style={{ display: 'flex' }}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <button className="modal-close" onClick={onCancel}>✕</button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmDialog;
```

### Adding API Service Methods

In `frontend/src/services/api.js`, add:
```javascript
// Salary APIs
export const getSalary = (employeeId) => 
  apiClient.get(`/salary/employee/${employeeId}`);

export const recordSalary = (data) => 
  apiClient.post('/salary', data);
```

## 📚 Database Schema Extension

### Adding Fields to Employee Table

Edit `backend/database/schema.sql` (or run SQL in your Render Postgres database):
```sql
alter table public.employees
  add column if not exists phone_number text,
  add column if not exists address jsonb,
  add column if not exists manager_id uuid references public.employees(id);
```

## 🎨 Styling Guide

### Color Variables (Available in CSS)
```css
--primary-color: #2563eb
--primary-dark: #1e40af
--secondary-color: #64748b
--success-color: #16a34a
--danger-color: #dc2626
--warning-color: #ea580c
--background-color: #f8fafc
--surface-color: #ffffff
--border-color: #e2e8f0
--text-primary: #1e293b
--text-secondary: #64748b
```

### Adding Custom Page Styles

Create `frontend/src/pages/CustomPage.css`:
```css
.custom-container {
  max-width: 1200px;
  margin: 0 auto;
}

.custom-card {
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 24px;
  box-shadow: var(--shadow-md);
}
```

## 🔐 Adding Authentication

For future multi-user support:

1. **Backend**: Add JWT middleware
```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

app.use('/api/protected', authenticateToken);
```

2. **Frontend**: Add auth context
```javascript
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setToken(data.token);
    localStorage.setItem('token', data.token);
  };
  
  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## 📊 Adding Charts & Analytics

Using Chart.js:

1. Install: `npm install chart.js react-chartjs-2`

2. Example chart component:
```javascript
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function AttendanceChart({ data }) {
  const chartData = {
    labels: ['Present', 'Absent', 'Leave'],
    datasets: [{
      data: [data.present, data.absent, data.leave],
      backgroundColor: ['#16a34a', '#dc2626', '#ea580c'],
    }],
  };

  return <Pie data={chartData} />;
}

export default AttendanceChart;
```

## 🧪 Testing

### Backend Testing with Jest

1. Install: `npm install --save-dev jest supertest`

2. Create `backend/routes/__tests__/employees.test.js`:
```javascript
const request = require('supertest');
const app = require('../../server');

describe('Employee Routes', () => {
  test('GET /api/employees should return employees', async () => {
    const res = await request(app).get('/api/employees');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
```

Run: `npm test`

## 🚀 Performance Optimization

### Backend
- Add database indexing for frequent queries:
```sql
create index if not exists idx_employees_employee_id on public.employees(employee_id);
create index if not exists idx_employees_email on public.employees(email);
create index if not exists idx_attendance_employee_date on public.attendance(employee_id, date);
```

- Implement pagination:
```javascript
router.get('/employees', async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const result = await db.query(
    'select * from employees order by created_at desc limit $1 offset $2',
    [limit, from]
  );

  res.json({ success: true, data: result.rows });
});
```

### Frontend
- Code splitting:
```javascript
const Salary = React.lazy(() => import('./pages/Salary'));

<Suspense fallback={<LoadingSpinner />}>
  <Salary />
</Suspense>
```

- Memoization:
```javascript
const MemoizedEmployeeList = React.memo(EmployeeList);
```

## 🔍 Debugging

### Backend Debugging
```javascript
// Add debug logs
console.log('Employee created:', employee);

// Use debugger
debugger;

// Run with debugging: node --inspect server.js
```

### Frontend Debugging
- Use React Developer Tools browser extension
- Chrome DevTools console for API calls
- Network tab to see request/response

## 📈 Deployment Checklist

- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] API endpoints validated
- [ ] Frontend build tested
- [ ] CORS configured properly
- [ ] Error handling complete
- [ ] Security headers added
- [ ] Performance optimized
- [ ] Testing completed
- [ ] Documentation updated

## 🔗 Useful Resources

- Express.js: https://expressjs.com
- React: https://react.dev
- Render Postgres: https://render.com/docs
- PostgreSQL: https://www.postgresql.org/docs/
- Axios: https://axios-http.com

---

For questions or issues, refer to the main README.md
