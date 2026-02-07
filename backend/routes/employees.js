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
    joinDate: row.join_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

// Validation middleware
const validateEmployee = [
  body('employeeId').trim().notEmpty().withMessage('Employee ID is required'),
  body('fullName').trim().notEmpty().withMessage('Full Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('department').notEmpty().withMessage('Department is required'),
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array().map(e => e.msg) });
  }
  next();
};

// GET all employees
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'select * from employees order by created_at desc'
    );

    res.json({ success: true, data: result.rows.map(mapEmployee) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching employees', error: error.message });
  }
});

// GET single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('select * from employees where id = $1', [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.json({ success: true, data: mapEmployee(result.rows[0]) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching employee', error: error.message });
  }
});

// CREATE new employee
router.post('/', validateEmployee, handleValidationErrors, async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    const existingId = await db.query(
      'select id from employees where employee_id = $1 limit 1',
      [employeeId]
    );

    if (existingId.rowCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Employee ID "${employeeId}" already exists`,
      });
    }

    const existingEmail = await db.query(
      'select id from employees where email = $1 limit 1',
      [email]
    );

    if (existingEmail.rowCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Email "${email}" is already registered`,
      });
    }

    const insertResult = await db.query(
      'insert into employees (employee_id, full_name, email, department, join_date) values ($1, $2, $3, $4, $5) returning *',
      [employeeId, fullName, email, department, new Date().toISOString().split('T')[0]]
    );

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: mapEmployee(insertResult.rows[0]),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating employee',
      error: error.message,
    });
  }
});

// UPDATE employee
router.put('/:id', validateEmployee, handleValidationErrors, async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    const currentEmployeeResult = await db.query(
      'select * from employees where id = $1',
      [req.params.id]
    );

    if (currentEmployeeResult.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    const currentEmployee = currentEmployeeResult.rows[0];

    if (employeeId !== currentEmployee.employee_id) {
      const existingEmployee = await db.query(
        'select id from employees where employee_id = $1 and id <> $2 limit 1',
        [employeeId, req.params.id]
      );

      if (existingEmployee.rowCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Employee ID "${employeeId}" already exists`,
        });
      }
    }

    if (email !== currentEmployee.email) {
      const existingEmail = await db.query(
        'select id from employees where email = $1 and id <> $2 limit 1',
        [email, req.params.id]
      );

      if (existingEmail.rowCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Email "${email}" is already registered`,
        });
      }
    }

    const updatedEmployeeResult = await db.query(
      'update employees set employee_id = $1, full_name = $2, email = $3, department = $4, updated_at = $5 where id = $6 returning *',
      [employeeId, fullName, email, department, new Date().toISOString(), req.params.id]
    );

    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: mapEmployee(updatedEmployeeResult.rows[0]),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating employee',
      error: error.message,
    });
  }
});

// DELETE employee
router.delete('/:id', async (req, res) => {
  try {
    await db.query('delete from attendance where employee_id = $1', [
      req.params.id,
    ]);

    const result = await db.query(
      'delete from employees where id = $1 returning *',
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.json({
      success: true,
      message: 'Employee deleted successfully',
      data: mapEmployee(result.rows[0]),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting employee',
      error: error.message,
    });
  }
});

module.exports = router;
