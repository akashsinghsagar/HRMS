# API Documentation - HRMS Lite

Complete REST API documentation for HRMS Lite Backend.

## Base URL
```
http://localhost:5000/api
```

## Health Check
```
GET /health
```

### Response
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Employee Endpoints

### Get All Employees
```
GET /employees
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "_id": "63f7d8c9e5c1a2b3c4d5e6f7",
      "employeeId": "EMP001",
      "fullName": "John Doe",
      "email": "john@company.com",
      "department": "IT",
      "joinDate": "2024-02-07T10:30:00.000Z",
      "createdAt": "2024-02-07T10:30:00.000Z",
      "updatedAt": "2024-02-07T10:30:00.000Z"
    }
  ]
}
```

---

### Get Single Employee
```
GET /employees/:id
```

**Parameters**
- `id` (string, required): Postgres UUID of the employee

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "_id": "63f7d8c9e5c1a2b3c4d5e6f7",
    "employeeId": "EMP001",
    "fullName": "John Doe",
    "email": "john@company.com",
    "department": "IT",
    "joinDate": "2024-02-07T10:30:00.000Z"
  }
}
```

**Response (404 Not Found)**
```json
{
  "success": false,
  "message": "Employee not found"
}
```

---

### Create Employee
```
POST /employees
```

**Request Body**
```json
{
  "employeeId": "EMP001",
  "fullName": "John Doe",
  "email": "john@company.com",
  "department": "IT"
}
```

**Validation Rules**
- `employeeId`: Required, min 3 characters, must be unique
- `fullName`: Required, min 2 characters
- `email`: Required, valid email format, must be unique
- `department`: Required, must be one of: IT, HR, Finance, Operations, Sales, Marketing, Customer Support

**Response (201 Created)**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "_id": "63f7d8c9e5c1a2b3c4d5e6f7",
    "employeeId": "EMP001",
    "fullName": "John Doe",
    "email": "john@company.com",
    "department": "IT",
    "joinDate": "2024-02-07T10:30:00.000Z"
  }
}
```

**Response (400 Bad Request)**
```json
{
  "success": false,
  "message": "Employee ID \"EMP001\" already exists"
}
```

**Response (400 Bad Request - Validation Error)**
```json
{
  "success": false,
  "errors": [
    "Employee ID is required",
    "Valid email is required"
  ]
}
```

---

### Update Employee
```
PUT /employees/:id
```

**Parameters**
- `id` (string, required): Postgres UUID of the employee

**Request Body**
```json
{
  "employeeId": "EMP001",
  "fullName": "John Doe Updated",
  "email": "john.updated@company.com",
  "department": "HR"
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "_id": "63f7d8c9e5c1a2b3c4d5e6f7",
    "employeeId": "EMP001",
    "fullName": "John Doe Updated",
    "email": "john.updated@company.com",
    "department": "HR"
  }
}
```

---

### Delete Employee
```
DELETE /employees/:id
```

**Parameters**
- `id` (string, required): Postgres UUID of the employee

**Notes**
- Also deletes all attendance records for the employee
- Cannot be undone

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Employee deleted successfully",
  "data": {
    "_id": "63f7d8c9e5c1a2b3c4d5e6f7",
    "employeeId": "EMP001",
    "fullName": "John Doe",
    "email": "john@company.com",
    "department": "IT"
  }
}
```

---

## Attendance Endpoints

### Get All Attendance Records
```
GET /attendance
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "_id": "63f7d8c9e5c1a2b3c4d5e6f8",
      "employeeId": {
        "_id": "63f7d8c9e5c1a2b3c4d5e6f7",
        "employeeId": "EMP001",
        "fullName": "John Doe",
        "email": "john@company.com",
        "department": "IT"
      },
      "date": "2024-02-07T00:00:00.000Z",
      "status": "Present",
      "remarks": "Office presentation",
      "createdAt": "2024-02-07T10:30:00.000Z"
    }
  ]
}
```

---

### Get Employee Attendance
```
GET /attendance/employee/:employeeId
```

**Parameters**
- `employeeId` (string, required): Postgres UUID of the employee

**Response (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "_id": "63f7d8c9e5c1a2b3c4d5e6f8",
      "employeeId": {
        "_id": "63f7d8c9e5c1a2b3c4d5e6f7",
        "employeeId": "EMP001",
        "fullName": "John Doe",
        "email": "john@company.com",
        "department": "IT"
      },
      "date": "2024-02-07T00:00:00.000Z",
      "status": "Present",
      "remarks": "Office presentation"
    }
  ]
}
```

---

### Record Attendance
```
POST /attendance
```

**Request Body**
```json
{
  "employeeId": "63f7d8c9e5c1a2b3c4d5e6f7",
  "date": "2024-02-07",
  "status": "Present",
  "remarks": "Office presentation"
}
```

**Validation Rules**
- `employeeId`: Required, must be valid ObjectId, employee must exist
- `date`: Required, valid ISO8601 date
- `status`: Required, must be one of: Present, Absent, Leave
- `remarks`: Optional, string
- Cannot have duplicate attendance for same employee on same date

**Response (201 Created)**
```json
{
  "success": true,
  "message": "Attendance recorded successfully",
  "data": {
    "_id": "63f7d8c9e5c1a2b3c4d5e6f8",
    "employeeId": {
      "_id": "63f7d8c9e5c1a2b3c4d5e6f7",
      "employeeId": "EMP001",
      "fullName": "John Doe"
    },
    "date": "2024-02-07T00:00:00.000Z",
    "status": "Present",
    "remarks": "Office presentation"
  }
}
```

**Response (400 Bad Request - Duplicate)**
```json
{
  "success": false,
  "message": "Attendance record already exists for this date"
}
```

---

### Update Attendance
```
PUT /attendance/:id
```

**Parameters**
- `id` (string, required): Postgres UUID of the attendance record

**Request Body**
```json
{
  "employeeId": "63f7d8c9e5c1a2b3c4d5e6f7",
  "date": "2024-02-07",
  "status": "Absent",
  "remarks": "Emergency leave"
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Attendance updated successfully",
  "data": {
    "_id": "63f7d8c9e5c1a2b3c4d5e6f8",
    "employeeId": {
      "_id": "63f7d8c9e5c1a2b3c4d5e6f7",
      "employeeId": "EMP001",
      "fullName": "John Doe"
    },
    "date": "2024-02-07T00:00:00.000Z",
    "status": "Absent",
    "remarks": "Emergency leave"
  }
}
```

---

### Delete Attendance
```
DELETE /attendance/:id
```

**Parameters**
- `id` (string, required): Postgres UUID of the attendance record

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Attendance record deleted successfully",
  "data": {
    "_id": "63f7d8c9e5c1a2b3c4d5e6f8",
    "employeeId": "63f7d8c9e5c1a2b3c4d5e6f7",
    "date": "2024-02-07T00:00:00.000Z",
    "status": "Present"
  }
}
```

---

### Get Attendance Summary
```
GET /attendance/summary/:employeeId
```

**Parameters**
- `employeeId` (string, required): Postgres UUID of the employee

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "employee": {
      "_id": "63f7d8c9e5c1a2b3c4d5e6f7",
      "employeeId": "EMP001",
      "fullName": "John Doe",
      "email": "john@company.com",
      "department": "IT"
    },
    "totalPresent": 15,
    "totalAbsent": 2,
    "totalLeave": 1,
    "totalRecords": 18
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "errors": ["Error message 1", "Error message 2"]
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Detailed error message (only in development)"
}
```

---

## Status Codes Reference

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or validation error |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server error |

---

## Example cURL Commands

### List Employees
```bash
curl http://localhost:5000/api/employees
```

### Create Employee
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP001",
    "fullName": "John Doe",
    "email": "john@company.com",
    "department": "IT"
  }'
```

### Record Attendance
```bash
curl -X POST http://localhost:5000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "63f7d8c9e5c1a2b3c4d5e6f7",
    "date": "2024-02-07",
    "status": "Present",
    "remarks": "Regular day"
  }'
```

---

## Rate Limiting

No rate limiting implemented (suitable for single-admin use).

For production, consider implementing:
- Rate limiting middleware
- API key authentication
- Request throttling
