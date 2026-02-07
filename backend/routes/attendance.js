const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../config/database');

const mapEmployee = (row) => {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    employeeId: row.employee_id,
    fullName: row.full_name,
    email: row.email,
    department: row.department,
  };
};

const mapAttendance = (row) => {
  if (!row) return null;
  return {
    _id: row.attendance_id || row.id,
    id: row.attendance_id || row.id,
    employeeId: row.employee_id
      ? mapEmployee({
          id: row.employee_id,
          employee_id: row.employee_code,
          full_name: row.employee_name,
          email: row.employee_email,
          department: row.employee_department,
        })
      : null,
    date: row.date,
    status: row.status,
    remarks: row.remarks,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

// Validation middleware
const validateAttendance = [
  body('employeeId').notEmpty().withMessage('Employee ID is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('status').isIn(['Present', 'Absent', 'Leave']).withMessage('Status must be Present, Absent, or Leave'),
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(e => e.msg),
    });
  }
  next();
};

// GET all attendance records
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `select
         a.id as attendance_id,
         a.date,
         a.status,
         a.remarks,
         a.created_at,
         a.updated_at,
         e.id as employee_id,
         e.employee_id as employee_code,
         e.full_name as employee_name,
         e.email as employee_email,
         e.department as employee_department
       from attendance a
       left join employees e on e.id = a.employee_id
       order by a.date desc`
    );

    res.json({ success: true, data: result.rows.map(mapAttendance) });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance records',
      error: error.message,
    });
  }
});

// GET attendance by employee
router.get('/employee/:employeeId', async (req, res) => {
  try {
    const result = await db.query(
      `select
         a.id as attendance_id,
         a.date,
         a.status,
         a.remarks,
         a.created_at,
         a.updated_at,
         e.id as employee_id,
         e.employee_id as employee_code,
         e.full_name as employee_name,
         e.email as employee_email,
         e.department as employee_department
       from attendance a
       left join employees e on e.id = a.employee_id
       where a.employee_id = $1
       order by a.date desc`,
      [req.params.employeeId]
    );

    res.json({ success: true, data: result.rows.map(mapAttendance) });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance records',
      error: error.message,
    });
  }
});

// CREATE attendance record
router.post('/', validateAttendance, handleValidationErrors, async (req, res) => {
  try {
    const { employeeId, date, status, remarks } = req.body;

    const employee = await db.query('select id from employees where id = $1', [
      employeeId,
    ]);

    if (employee.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    const existingRecord = await db.query(
      'select id from attendance where employee_id = $1 and date = $2 limit 1',
      [employeeId, date]
    );

    if (existingRecord.rowCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Attendance record already exists for this date',
      });
    }

    const insertResult = await db.query(
      'insert into attendance (employee_id, date, status, remarks) values ($1, $2, $3, $4) returning *',
      [employeeId, date, status, remarks || '']
    );

    const employeeResult = await db.query(
      'select id, employee_id, full_name, email, department from employees where id = $1',
      [employeeId]
    );

    const responseRow = {
      attendance_id: insertResult.rows[0].id,
      date: insertResult.rows[0].date,
      status: insertResult.rows[0].status,
      remarks: insertResult.rows[0].remarks,
      created_at: insertResult.rows[0].created_at,
      updated_at: insertResult.rows[0].updated_at,
      employee_id: employeeResult.rows[0].id,
      employee_code: employeeResult.rows[0].employee_id,
      employee_name: employeeResult.rows[0].full_name,
      employee_email: employeeResult.rows[0].email,
      employee_department: employeeResult.rows[0].department,
    };

    res.status(201).json({
      success: true,
      message: 'Attendance recorded successfully',
      data: mapAttendance(responseRow),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error recording attendance',
      error: error.message,
    });
  }
});

// UPDATE attendance record
router.put('/:id', validateAttendance, handleValidationErrors, async (req, res) => {
  try {
    const { employeeId, date, status, remarks } = req.body;

    const employee = await db.query('select id from employees where id = $1', [
      employeeId,
    ]);

    if (employee.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    const duplicateRecord = await db.query(
      'select id from attendance where employee_id = $1 and date = $2 and id <> $3 limit 1',
      [employeeId, date, req.params.id]
    );

    if (duplicateRecord.rowCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Attendance record already exists for this date',
      });
    }

    const updateResult = await db.query(
      'update attendance set employee_id = $1, date = $2, status = $3, remarks = $4, updated_at = $5 where id = $6 returning *',
      [employeeId, date, status, remarks || '', new Date().toISOString(), req.params.id]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }

    const employeeResult = await db.query(
      'select id, employee_id, full_name, email, department from employees where id = $1',
      [employeeId]
    );

    const responseRow = {
      attendance_id: updateResult.rows[0].id,
      date: updateResult.rows[0].date,
      status: updateResult.rows[0].status,
      remarks: updateResult.rows[0].remarks,
      created_at: updateResult.rows[0].created_at,
      updated_at: updateResult.rows[0].updated_at,
      employee_id: employeeResult.rows[0].id,
      employee_code: employeeResult.rows[0].employee_id,
      employee_name: employeeResult.rows[0].full_name,
      employee_email: employeeResult.rows[0].email,
      employee_department: employeeResult.rows[0].department,
    };

    res.json({
      success: true,
      message: 'Attendance updated successfully',
      data: mapAttendance(responseRow),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating attendance',
      error: error.message,
    });
  }
});

// DELETE attendance record
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.query(
      `delete from attendance a
       using employees e
       where a.id = $1 and a.employee_id = e.id
       returning
         a.id as attendance_id,
         a.date,
         a.status,
         a.remarks,
         a.created_at,
         a.updated_at,
         e.id as employee_id,
         e.employee_id as employee_code,
         e.full_name as employee_name,
         e.email as employee_email,
         e.department as employee_department`,
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }

    res.json({
      success: true,
      message: 'Attendance record deleted successfully',
      data: mapAttendance(result.rows[0]),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting attendance record',
      error: error.message,
    });
  }
});

// GET attendance summary per employee
router.get('/summary/:employeeId', async (req, res) => {
  try {
    const employeeResult = await db.query(
      'select id, employee_id, full_name, email, department from employees where id = $1',
      [req.params.employeeId]
    );

    if (employeeResult.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    const attendanceResult = await db.query(
      `select
         count(*) filter (where status = 'Present') as present_count,
         count(*) filter (where status = 'Absent') as absent_count,
         count(*) filter (where status = 'Leave') as leave_count,
         count(*) as total_count
       from attendance
       where employee_id = $1`,
      [req.params.employeeId]
    );

    const counts = attendanceResult.rows[0];

    const employee = employeeResult.rows[0];

    const summary = {
      employee: mapEmployee(employee),
      totalPresent: Number(counts.present_count || 0),
      totalAbsent: Number(counts.absent_count || 0),
      totalLeave: Number(counts.leave_count || 0),
      totalRecords: Number(counts.total_count || 0),
    };

    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance summary',
      error: error.message,
    });
  }
});

module.exports = router;
